const https = require('https');
const config = require('./configSegment');

function createReverseEtlModel(modelConfig, sourceId) {
  const data = JSON.stringify({
    sourceId: sourceId,
    name: modelConfig.name,
    description: modelConfig.description,
    enabled: modelConfig.enabled,
    query: modelConfig.query,
    queryIdentifierColumn: modelConfig.queryIdentifierColumn
  });

  const options = {
    method: 'POST',
    hostname: 'api.segmentapis.com',
    path: '/reverse-etl-models',
    headers: {
      'Authorization': `Bearer ${config.SEGMENT_API_TOKEN}`,
      'Content-Type': 'application/vnd.segment.v1alpha+json',
      'Content-Length': data.length
    }
  };

  return makeRequest(options, data);
}

function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        console.log('Reverse ETL model created successfully:', responseData);
        resolve(JSON.parse(responseData));
      });
    });

    req.on('error', (error) => {
      console.error('Error creating Reverse ETL model:', error.message);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

async function createAllReverseEtlModels(sourceId, models) {
  const results = {
    successes: [],
    failures: []
  };

  for (const model of models) {
    try {
      await createReverseEtlModel(model, sourceId);
      results.successes.push(model.name);
    } catch (error) {
      console.error(`Failed to create Reverse ETL model ${model.name}:`, error.message);
      results.failures.push(model.name);
    }
  }

  // Summary of operations
  console.log('\nReverse ETL model creation summary:');
  if (results.successes.length > 0) {
    console.log('Successfully created:', results.successes.join(', '));
  }
  if (results.failures.length > 0) {
    console.log('Failed to create:', results.failures.join(', '));
  }
}

module.exports = { createAllReverseEtlModels }; 