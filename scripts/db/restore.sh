#!/bin/bash

# Database Restore Script - Viña Santa Cruz
# Usage: ./scripts/db/restore.sh [environment] [backup_file]
# Example: ./scripts/db/restore.sh staging backups/db/staging_vina_santa_cruz_20240115_120000.sql.gz

set -e

# Configuration
ENVIRONMENT="${1:-staging}"
BACKUP_FILE="${2}"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Database Restore Script${NC}"
echo -e "${YELLOW}Environment: ${ENVIRONMENT}${NC}"

# Safety check for production
if [ "$ENVIRONMENT" == "production" ]; then
    echo -e "${RED}WARNING: You are about to restore PRODUCTION database!${NC}"
    read -p "Are you absolutely sure? Type 'YES' to continue: " confirmation
    if [ "$confirmation" != "YES" ]; then
        echo -e "${YELLOW}Restore cancelled${NC}"
        exit 0
    fi
fi

# Validate backup file
if [ -z "$BACKUP_FILE" ]; then
    echo -e "${RED}Error: Backup file not specified${NC}"
    echo -e "Usage: $0 [environment] [backup_file]"
    exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
    echo -e "${RED}Error: Backup file not found: ${BACKUP_FILE}${NC}"
    exit 1
fi

# Load environment variables
if [ -f ".env.${ENVIRONMENT}" ]; then
    export $(cat ".env.${ENVIRONMENT}" | grep -v '^#' | xargs)
else
    echo -e "${RED}Error: .env.${ENVIRONMENT} file not found${NC}"
    exit 1
fi

# Validate DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}Error: DATABASE_URL not set${NC}"
    exit 1
fi

# Extract database connection details
DB_USER=$(echo "$DATABASE_URL" | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')
DB_PASSWORD=$(echo "$DATABASE_URL" | sed -n 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p')
DB_HOST=$(echo "$DATABASE_URL" | sed -n 's/.*@\([^:]*\):.*/\1/p')
DB_PORT=$(echo "$DATABASE_URL" | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
DB_NAME=$(echo "$DATABASE_URL" | sed -n 's/.*\/\([^?]*\).*/\1/p')

echo -e "${YELLOW}Restoring to database: ${DB_NAME} on ${DB_HOST}${NC}"
echo -e "${YELLOW}From backup: ${BACKUP_FILE}${NC}"

# Create a safety backup before restore
SAFETY_BACKUP="./backups/db/pre-restore_${DB_NAME}_$(date +"%Y%m%d_%H%M%S").sql.gz"
echo -e "${YELLOW}Creating safety backup first...${NC}"

export PGPASSWORD="$DB_PASSWORD"
pg_dump -h "$DB_HOST" \
        -p "$DB_PORT" \
        -U "$DB_USER" \
        -d "$DB_NAME" \
        --no-owner \
        --no-acl \
        | gzip > "$SAFETY_BACKUP"

echo -e "${GREEN}✓ Safety backup created: ${SAFETY_BACKUP}${NC}"

# Restore from backup
echo -e "${YELLOW}Restoring database from backup...${NC}"

gunzip -c "$BACKUP_FILE" | psql -h "$DB_HOST" \
                                 -p "$DB_PORT" \
                                 -U "$DB_USER" \
                                 -d "$DB_NAME" \
                                 --quiet

unset PGPASSWORD

echo -e "${GREEN}✓ Database restored successfully${NC}"

# Verify restore
echo -e "${YELLOW}Verifying restore...${NC}"
export PGPASSWORD="$DB_PASSWORD"
TABLE_COUNT=$(psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';")
unset PGPASSWORD

echo -e "${GREEN}✓ Database contains ${TABLE_COUNT} tables${NC}"
echo -e "${GREEN}✓ Restore completed successfully${NC}"
echo -e "${YELLOW}Safety backup available at: ${SAFETY_BACKUP}${NC}"
