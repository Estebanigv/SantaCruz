#!/usr/bin/env node

/**
 * Backup Verification Script
 * Verifies that database backups exist and are recent
 */

const fs = require('fs')
const path = require('path')

const BACKUP_DIR = path.join(__dirname, '../../backups/db')
const MAX_AGE_HOURS = 24 // Maximum age for latest backup

function verifyBackups() {
  console.log('🔍 Verifying database backups...\n')

  // Check if backup directory exists
  if (!fs.existsSync(BACKUP_DIR)) {
    console.error('❌ Backup directory does not exist:', BACKUP_DIR)
    console.error('💡 Create it with: mkdir -p backups/db\n')
    process.exit(1)
  }

  // Get all backup files
  const files = fs
    .readdirSync(BACKUP_DIR)
    .filter((file) => file.endsWith('.sql.gz'))
    .map((file) => ({
      name: file,
      path: path.join(BACKUP_DIR, file),
      stats: fs.statSync(path.join(BACKUP_DIR, file)),
    }))
    .sort((a, b) => b.stats.mtime - a.stats.mtime)

  if (files.length === 0) {
    console.error('❌ No backup files found in:', BACKUP_DIR)
    console.error('💡 Run: npm run db:backup\n')
    process.exit(1)
  }

  console.log(`📦 Found ${files.length} backup file(s)\n`)

  // Check latest backup
  const latest = files[0]
  const ageMs = Date.now() - latest.stats.mtime
  const ageHours = (ageMs / (1000 * 60 * 60)).toFixed(1)
  const sizeMB = (latest.stats.size / (1024 * 1024)).toFixed(2)

  console.log('📊 Latest Backup:')
  console.log(`   File: ${latest.name}`)
  console.log(`   Size: ${sizeMB} MB`)
  console.log(`   Created: ${latest.stats.mtime.toLocaleString()}`)
  console.log(`   Age: ${ageHours} hours`)

  if (ageHours > MAX_AGE_HOURS) {
    console.warn(`\n⚠️  Warning: Latest backup is older than ${MAX_AGE_HOURS} hours`)
    console.warn('💡 Consider running: npm run db:backup\n')
  } else {
    console.log('\n✅ Latest backup is recent')
  }

  // List all backups
  console.log('\n📋 All Backups:')
  files.forEach((file, index) => {
    const age = ((Date.now() - file.stats.mtime) / (1000 * 60 * 60)).toFixed(1)
    const size = (file.stats.size / (1024 * 1024)).toFixed(2)
    console.log(`   ${index + 1}. ${file.name} (${size} MB, ${age}h old)`)
  })

  console.log('\n🎉 Backup verification complete!\n')
}

verifyBackups()
