const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: 'https://43544647aa5f49d9aed45a2cb1250b9f.southamerica-east1.gcp.elastic-cloud.com:443',
  auth: {
    username: 'elastic',
    password: '0IXMT9rcuBHG4Zthwzzfsxof'
  }
});

client.info()
  .then(response => {
    console.log('Connected to Elasticsearch:');
  })
  .catch(error => {
    console.error('Connection error:', error);
  });

module.exports = client;
