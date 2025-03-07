const https = require('https');
const config = require('./configSegment');

function createAzureWarehouseSource(settings, slug) {
  const data = JSON.stringify({
    slug: slug,
    enabled: true,
    metadataId: 'xNpohElkX2',
    settings: settings
  });

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.SEGMENT_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  };

  return makeRequest(options, data);
}

function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(config.SEGMENT_API_URL, options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        try {
          console.log('Raw response:', responseData);
          const parsedResponse = JSON.parse(responseData);
          console.log('Parsed response:', JSON.stringify(parsedResponse, null, 2));
          resolve(parsedResponse);
        } catch (error) {
          console.error('Error parsing response:', responseData);
          reject(new Error('Failed to parse response'));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Error creating source:', error.message);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

module.exports = { createAzureWarehouseSource }; 