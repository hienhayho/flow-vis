# Scripts

## Generate Manifest

This script automatically scans the `public/` folder for JSON files and generates the `samples-manifest.json` file.

### Usage

```bash
npm run generate-manifest
```

### How it works

1. Scans all files in the `public/` directory
2. Filters for `.json` files (excluding `samples-manifest.json` itself)
3. Sorts them alphabetically
4. Generates `public/samples-manifest.json` with the list

### Workflow

When you want to add new sample JSON files:

1. Copy your JSON files to the `public/` folder
2. Run `npm run generate-manifest`
3. The app will automatically detect and list all JSON files in the dropdown

That's it! No manual editing of the manifest required.
