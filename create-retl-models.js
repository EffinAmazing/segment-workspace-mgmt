const { createAllReverseEtlModels } = require('./segment-reverse-etl');
const reverseEtlConfigs = require('./configReverseEtl');

// The source ID should be provided when running the script
const sourceId = process.argv[2];

if (!sourceId) {
  console.error('Please provide a source ID as an argument.');
  console.error('Usage: node create-retl-models.js <sourceId>');
  process.exit(1);
}

async function createModels() {
  try {
    console.log(`Creating Reverse ETL models for source ID: ${sourceId}`);
    await createAllReverseEtlModels(sourceId, reverseEtlConfigs.models);
  } catch (error) {
    console.error('Failed to create Reverse ETL models:', error);
    process.exit(1);
  }
}

createModels(); 