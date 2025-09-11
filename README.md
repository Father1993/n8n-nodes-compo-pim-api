# n8n-nodes-compo-pim-api

[![NPM version](https://img.shields.io/npm/v/n8n-nodes-compo-pim-api.svg)](https://www.npmjs.com/package/n8n-nodes-compo-pim-api)
[![License](https://img.shields.io/npm/l/n8n-nodes-compo-pim-api.svg)](https://github.com/your-username/n8n-nodes-compo-pim-api/blob/master/LICENSE)

Community node for n8n providing integration with Compo PIM API - a comprehensive Product Information Management system designed for efficient management of product catalogs, templates, and channels.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation) • [Credentials](#credentials-setup) • [Resources & Operations](#available-resources) • [Usage](#usage-examples) • [Compatibility](#compatibility) • [Resources](#resources)

## Features

- Full API access to Compo PIM product information management system
- Manage product catalogs, templates, channels, and features
- Batch operations with comprehensive filtering capabilities
- Automatic authentication and token management
- Seamless integration with n8n workflows

## Installation

Follow these instructions to install this node for [n8n](https://n8n.io/):

```bash
npm install n8n-nodes-compo-pim-api
```

After installation, the node will be available in your n8n instance under the "Compo PIM API" name.

## Credentials Setup

1. In n8n, go to **Credentials**
2. Click **New** and select **Compo PIM API**
3. Enter your credentials:
   - **Login**: your Compo PIM system login
   - **Password**: your password
4. Save credentials

## Available Resources

### Catalog
- Get all categories
- Get category by ID
- Create category
- Update category
- Delete category

### Product
- Get product by ID
- Create product
- Update product
- Delete product
- Get product list (with scrolling)

### Template
- Get template by ID
- Create template
- Update template
- Delete template

### Channel
- Get all channels
- Get channel by ID
- Create channel
- Update channel
- Delete channel

### Feature
- Get all features
- Get feature by ID
- Create feature
- Update feature
- Delete feature

## Usage Examples

### Getting All Catalog Categories
1. Select resource: **Catalog**
2. Select operation: **Get All**

### Creating a New Product
1. Select resource: **Product**
2. Select operation: **Create**
3. In the **Data** field, provide product JSON data

### Getting Products with Filtering
1. Select resource: **Product**
2. Select operation: **Get List (scroll)**
3. Specify required filters:
   - Catalog ID
   - Brand ID
   - Number of days for date change filtering

## API Documentation

Full API documentation is available in the `API-COMPO-PIM.md` file in the project root.

## Base URL

```
https://demodata.compo-soft.ru/api/v1/
```

## Authentication

The node automatically obtains an access token using the `/sign-in/` method and uses it for all subsequent requests.

## Compatibility

- n8n version 0.174.0 and above
- Node.js 18.10.0 and above

## Resources

- **NPM Package**: [n8n-nodes-compo-pim-api](https://www.npmjs.com/package/n8n-nodes-compo-pim-api)
- **Developer Information**: For those interested in contributing or publishing updates, refer to the PUBLISH.md file in the repository which contains guidelines for maintaining and publishing this package.

## License

[MIT](LICENSE)
