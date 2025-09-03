# Package Publishing Guide

## Preparation

1. **Ensure you have an npm account:**
   ```bash
   npm login
   ```

2. **Check that all files are ready:**
   ```bash
   npm run build
   ```

3. **Verify package.json:**
   - Ensure the `name` field is unique
   - Update `version` if needed
   - Check `homepage` and `repository` URLs

## Publishing

1. **First-time publishing:**
   ```bash
   npm publish
   ```

2. **Version updates:**
   ```bash
   npm version patch  # for bug fixes
   npm version minor  # for new features
   npm version major  # for breaking changes
   npm publish
   ```

## Installing in n8n

### Via npm (recommended):
```bash
npm install n8n-nodes-compo-pim-api
```

### Self-hosted n8n:
1. Install the package in your n8n directory:
   ```bash
   npm install n8n-nodes-compo-pim-api
   ```

2. Restart n8n:
   ```bash
   n8n start
   ```

### n8n Cloud:
- Package must be published to npm registry
- Refer to n8n Cloud documentation for installing community nodes

## Setting up Credentials in n8n

1. Go to **Settings > Credentials**
2. Click **Add credential**
3. Select **Compo PIM API**
4. Enter credentials:
   - **Login**: s.andrey
   - **Password**: KZh-4g2-YFx-Jgm
5. Save

## Using in Workflows

1. Add the **Compo PIM API** node to your workflow
2. Select the created credentials
3. Configure desired resource and operation
4. Execute the workflow

## Verification

After installation, the package should appear in the list of available nodes in n8n as "Compo PIM API".

## Package Updates

To update an already published package:

1. Make code changes
2. Update version: `npm version patch|minor|major`
3. Rebuild: `npm run build`
4. Publish: `npm publish`

## Troubleshooting

If the package doesn't appear in n8n:
1. Verify correct installation
2. Restart n8n
3. Check n8n logs for errors
4. Ensure file structure meets n8n requirements
