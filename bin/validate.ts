#!/usr/bin/env node
import 'source-map-support/register';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigValidator } from '../lib/config/validator';

async function main() {
  const configDir = path.join(__dirname, '..', 'config');
  const validator = new ConfigValidator();
  let hasErrors = false;
  
  // Get all YAML files in the config directory
  const files = fs.readdirSync(configDir)
    .filter(file => file.endsWith('.yaml') || file.endsWith('.yml'));
  
  console.log(`Validating ${files.length} service configuration files...`);
  
  for (const file of files) {
    const filePath = path.join(configDir, file);
    try {
      const result = await validator.validate(filePath);
      if (result.valid) {
        console.log(`✅ ${file} - Valid configuration`);
      } else {
        console.error(`❌ ${file} - Invalid configuration:`);
        result.errors.forEach(error => console.error(`   - ${error}`));
        hasErrors = true;
      }
    } catch (error) {
      console.error(`❌ ${file} - Error during validation:`, error);
      hasErrors = true;
    }
  }
  
  if (hasErrors) {
    console.error('Validation failed. Please fix the errors and try again.');
    process.exit(1);
  } else {
    console.log('All configurations are valid!');
  }
}

main().catch(error => {
  console.error('Validation failed:', error);
  process.exit(1);
});