const https = require('https');
const config = require('./configSegment');

function createWebsiteSource(settings, slug) {
  const data = JSON.stringify({
    slug: slug,
    enabled: true,
    metadataId: 'IqDTy1TpoU',
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
        console.log('Source created successfully:', responseData);
        resolve(responseData);
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

module.exports = { createWebsiteSource }; 