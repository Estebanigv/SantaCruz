#!/bin/bash

# Database Migration Script - Viña Santa Cruz
# Usage: ./scripts/db/migrate.sh [command] [environment]
# Commands: dev, deploy, reset, status
# Example: ./scripts/db/migrate.sh deploy production

set -e

COMMAND="${1:-dev}"
ENVIRONMENT="${2:-development}"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Database Migration Tool - Viña Santa Cruz${NC}"
echo -e "${YELLOW}Command: ${COMMAND}${NC}"
echo -e "${YELLOW}Environment: ${ENVIRONMENT}${NC}"

# Load environment variables
if [ "$ENVIRONMENT" != "development" ]; then
    if [ -f ".env.${ENVIRONMENT}" ]; then
        export $(cat ".env.${ENVIRONMENT}" | grep -v '^#' | xargs)
    else
        echo -e "${RED}Error: .env.${ENVIRONMENT} file not found${NC}"
        exit 1
    fi
fi

# Safety check for production migrations
if [ "$ENVIRONMENT" == "production" ] && [ "$COMMAND" != "status" ]; then
    echo -e "${RED}WARNING: You are about to run migrations on PRODUCTION!${NC}"
    read -p "Type 'YES' to continue: " confirmation
    if [ "$confirmation" != "YES" ]; then
        echo -e "${YELLOW}Migration cancelled${NC}"
        exit 0
    fi

    # Create backup before production migration
    echo -e "${YELLOW}Creating backup before migration...${NC}"
    ./scripts/db/backup.sh production
fi

# Execute migration command
case $COMMAND in
    dev)
        echo -e "${YELLOW}Running development migrations...${NC}"
        npx prisma migrate dev
        echo -e "${GREEN}✓ Development migrations completed${NC}"
        ;;

    deploy)
        echo -e "${YELLOW}Deploying migrations...${NC}"
        npx prisma migrate deploy
        echo -e "${GREEN}✓ Migrations deployed successfully${NC}"
        ;;

    reset)
        echo -e "${RED}WARNING: This will reset the database and delete all data!${NC}"
        read -p "Type 'RESET' to continue: " confirmation
        if [ "$confirmation" != "RESET" ]; then
            echo -e "${YELLOW}Reset cancelled${NC}"
            exit 0
        fi
        npx prisma migrate reset --force
        echo -e "${GREEN}✓ Database reset completed${NC}"
        ;;

    status)
        echo -e "${YELLOW}Checking migration status...${NC}"
        npx prisma migrate status
        ;;

    create)
        MIGRATION_NAME="${3:-update}"
        echo -e "${YELLOW}Creating new migration: ${MIGRATION_NAME}${NC}"
        npx prisma migrate dev --name "$MIGRATION_NAME" --create-only
        echo -e "${GREEN}✓ Migration created. Review the migration file before applying.${NC}"
        ;;

    *)
        echo -e "${RED}Unknown command: ${COMMAND}${NC}"
        echo -e "Available commands:"
        echo -e "  dev     - Create and apply migrations in development"
        echo -e "  deploy  - Apply pending migrations to specified environment"
        echo -e "  reset   - Reset database (WARNING: deletes all data)"
        echo -e "  status  - Check migration status"
        echo -e "  create  - Create new migration without applying"
        exit 1
        ;;
esac

# Generate Prisma Client after migration
if [ "$COMMAND" != "status" ]; then
    echo -e "${YELLOW}Generating Prisma Client...${NC}"
    npx prisma generate
    echo -e "${GREEN}✓ Prisma Client generated${NC}"
fi

echo -e "${GREEN}✓ Migration process completed${NC}"
