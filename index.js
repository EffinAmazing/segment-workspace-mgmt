const { createWebsiteSource } = require('./segment-website-source');
const { createAzureWarehouseSource } = require('./segment-azure-source');
const { createHttpApiSource } = require('./segment-http-api-source');
const { createAllReverseEtlModels } = require('./segment-reverse-etl');
const sourceConfigs = require('./configSources');
const reverseEtlConfigs = require('./configReverseEtl');

async function createSources() {
  const results = {
    successes: [],
    failures: []
  };

  if (sourceConfigs.website.enabled) {
    try {
      await createWebsiteSource(sourceConfigs.website.settings, sourceConfigs.website.slug);
      console.log('Website source creation completed');
      results.successes.push('website');
    } catch (error) {
      console.error('Failed to create website source:', error.message);
      results.failures.push('website');
    }
  }

  if (sourceConfigs.azureWarehouse.enabled) {
    try {
      const response = await createAzureWarehouseSource(sourceConfigs.azureWarehouse.settings, sourceConfigs.azureWarehouse.slug);
      console.log('Azure Warehouse source creation completed');
      results.successes.push('azureWarehouse');

      // Create Reverse ETL models after successful Azure source creation
      const sourceId = response.data.source.id;
      console.log('Creating Reverse ETL models for Azure source...');
      await createAllReverseEtlModels(sourceId, reverseEtlConfigs.models);
    } catch (error) {
      console.error('Failed to create Azure Warehouse source:', error.message);
      results.failures.push('azureWarehouse');
    }
  }

  if (sourceConfigs.httpApi.enabled) {
    try {
      await createHttpApiSource(sourceConfigs.httpApi.settings, sourceConfigs.httpApi.slug);
      console.log('HTTP API source creation completed');
      results.successes.push('httpApi');
    } catch (error) {
      console.error('Failed to create HTTP API source:', error.message);
      results.failures.push('httpApi');
    }
  }

  // Summary of all operations
  console.log('\nSource creation summary:');
  if (results.successes.length > 0) {
    console.log('Successfully created:', results.successes.join(', '));
  }
  if (results.failures.length > 0) {
    console.log('Failed to create:', results.failures.join(', '));
  }
}

createSources(); 