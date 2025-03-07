# Segment Workspace Management

This repository contains scripts for managing Segment workspace configurations, including creating sources and Reverse ETL models.

## Overview

The scripts in this repository help automate the creation of:
- Website Analytics Source (analytics.js)
- Azure Warehouse Source
- HTTP API Source
- Reverse ETL Models

## Configuration Files

- `configSegment.js` - Contains Segment API credentials and endpoints
- `configSources.js` - Contains source configurations (Website, Azure Warehouse, HTTP API)
- `configReverseEtl.js` - Contains Reverse ETL model configurations

## Scripts

### Main Source Creation
```bash
node index.js
```
This script creates all enabled sources defined in `configSources.js`. For the Azure Warehouse source, it will attempt to create associated Reverse ETL models.

### Standalone Reverse ETL Model Creation
```bash
node create-retl-models.js <sourceId>
```
This script creates Reverse ETL models for a specific source. You must provide the source ID as an argument.

Example:
```bash
node create-retl-models.js 9btKuCR4Wq674VajpuLDNV
```

## Source Types

### Website Source (analytics.js)
- Type: JavaScript Website
- Purpose: Track website analytics
- Configuration: Website URL

### Azure Warehouse Source
- Type: Data Warehouse
- Purpose: Sync data from Azure SQL Database
- Configuration: Database credentials and connection details

### HTTP API Source
- Type: HTTP API
- Purpose: Receive server-side events
- Configuration: Basic source configuration only

## Reverse ETL Models

The following example models are configured for the Azure Warehouse source:
1. {brand_id} - Booking Created/Updated
2. {brand_id} - B2C Entity Created/Updated
3. {brand_id} - B2B Entity Created/Updated
4. {brand_id} - Extra Created/Updated

## Setup

1. Clone this repository
2. Update the configuration files with your credentials and settings
3. Run the desired script

## Requirements

- Node.js
- Segment workspace access with appropriate permissions
- Valid Segment API token

## Security Notes

- Never commit API tokens or sensitive credentials to the repository
- Store sensitive information in environment variables or secure configuration management systems 