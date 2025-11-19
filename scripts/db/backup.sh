#!/bin/bash

# Database Backup Script - Viña Santa Cruz
# Usage: ./scripts/db/backup.sh [environment]
# Example: ./scripts/db/backup.sh production

set -e

# Configuration
ENVIRONMENT="${1:-staging}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="./backups/db"
RETENTION_DAYS=30

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting database backup for ${ENVIRONMENT} environment...${NC}"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

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

# Extract database connection details from DATABASE_URL
# Format: postgresql://user:password@host:port/dbname
DB_USER=$(echo "$DATABASE_URL" | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')
DB_PASSWORD=$(echo "$DATABASE_URL" | sed -n 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p')
DB_HOST=$(echo "$DATABASE_URL" | sed -n 's/.*@\([^:]*\):.*/\1/p')
DB_PORT=$(echo "$DATABASE_URL" | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
DB_NAME=$(echo "$DATABASE_URL" | sed -n 's/.*\/\([^?]*\).*/\1/p')

# Backup filename
BACKUP_FILE="${BACKUP_DIR}/${ENVIRONMENT}_${DB_NAME}_${TIMESTAMP}.sql.gz"

echo -e "${YELLOW}Backing up database: ${DB_NAME} on ${DB_HOST}${NC}"

# Perform backup using pg_dump
export PGPASSWORD="$DB_PASSWORD"
pg_dump -h "$DB_HOST" \
        -p "$DB_PORT" \
        -U "$DB_USER" \
        -d "$DB_NAME" \
        --no-owner \
        --no-acl \
        --clean \
        --if-exists \
        | gzip > "$BACKUP_FILE"

unset PGPASSWORD

# Verify backup was created
if [ -f "$BACKUP_FILE" ]; then
    BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo -e "${GREEN}✓ Backup successful: ${BACKUP_FILE} (${BACKUP_SIZE})${NC}"

    # Upload to S3 if configured
    if [ -n "$BACKUP_STORAGE_URL" ]; then
        echo -e "${YELLOW}Uploading backup to S3...${NC}"
        aws s3 cp "$BACKUP_FILE" "${BACKUP_STORAGE_URL}/${ENVIRONMENT}/"
        echo -e "${GREEN}✓ Backup uploaded to S3${NC}"
    fi

    # Clean up old backups
    echo -e "${YELLOW}Cleaning up backups older than ${RETENTION_DAYS} days...${NC}"
    find "$BACKUP_DIR" -name "${ENVIRONMENT}_*.sql.gz" -mtime +${RETENTION_DAYS} -delete

    echo -e "${GREEN}✓ Backup process completed successfully${NC}"
else
    echo -e "${RED}Error: Backup file was not created${NC}"
    exit 1
fi

# Create backup metadata
cat > "${BACKUP_FILE}.meta" <<EOF
{
  "environment": "${ENVIRONMENT}",
  "database": "${DB_NAME}",
  "timestamp": "${TIMESTAMP}",
  "size": "$(stat -f%z "$BACKUP_FILE" 2>/dev/null || stat -c%s "$BACKUP_FILE" 2>/dev/null)",
  "created_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF

echo -e "${GREEN}Backup metadata saved${NC}"
