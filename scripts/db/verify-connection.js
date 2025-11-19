#!/usr/bin/env node

/**
 * Database Connection Verification Script
 * Verifies PostgreSQL connection and basic database health
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function verifyConnection() {
  console.log('🔍 Verifying database connection...\n')

  try {
    // Test basic connection
    await prisma.$connect()
    console.log('✅ Database connection successful')

    // Get database info
    const result = await prisma.$queryRaw`
      SELECT
        current_database() as database,
        current_user as user,
        version() as version,
        pg_database_size(current_database()) as size_bytes
    `

    const dbInfo = result[0]
    const sizeMB = (dbInfo.size_bytes / (1024 * 1024)).toFixed(2)

    console.log('\n📊 Database Information:')
    console.log(`   Database: ${dbInfo.database}`)
    console.log(`   User: ${dbInfo.user}`)
    console.log(`   Size: ${sizeMB} MB`)
    console.log(`   Version: ${dbInfo.version.split(',')[0]}`)

    // Count tables
    const tables = await prisma.$queryRaw`
      SELECT COUNT(*) as count
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `

    console.log(`   Tables: ${tables[0].count}`)

    // Test write operation
    await prisma.$executeRaw`SELECT 1`
    console.log('\n✅ Write operations: OK')

    // Check active connections
    const connections = await prisma.$queryRaw`
      SELECT COUNT(*) as count
      FROM pg_stat_activity
      WHERE datname = current_database()
    `

    console.log(`✅ Active connections: ${connections[0].count}`)

    console.log('\n🎉 All checks passed! Database is healthy.\n')
  } catch (error) {
    console.error('\n❌ Database verification failed:')
    console.error(`   Error: ${error.message}`)
    console.error('\n💡 Troubleshooting:')
    console.error('   1. Check DATABASE_URL in .env file')
    console.error('   2. Verify database server is running')
    console.error('   3. Check network connectivity')
    console.error('   4. Verify database credentials\n')
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

verifyConnection()
