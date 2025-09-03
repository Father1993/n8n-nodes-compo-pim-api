# n8n-nodes-compo-pim-api

n8n package for integration with Compo PIM API - a Product Information Management system.

## Installation

```bash
npm install n8n-nodes-compo-pim-api
```

## Credentials Setup

1. In n8n, go to **Credentials**
2. Click **New** and select **Compo PIM API**
3. Enter your credentials:
   - **Login**: your Compo PIM system login
   - **Password**: your password

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

## License

MIT
