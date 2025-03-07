module.exports = {
  website: {
    enabled: false,
    slug: '{enter slug here}',
    settings: {
      websiteUrl: "{URL here}"
    }
  },
  azureWarehouse: {
    enabled: true,
    slug: '{brand_id} - Azure Warehouse',
    settings: {
      database: "",
      hostname: "",
      password: "",
      username: "",
      port: ""
    }
  },
  httpApi: {
    enabled: true,
    slug: '{brand_id} - Warehouse Events [Dev]',
    settings: {} // No additional settings required for HTTP API
  }
}; 