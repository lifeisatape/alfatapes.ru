# alfatapes.ru source contour

This folder is the restored editable source for the live static site in the repository root.

## Work loop

```bash
cd _source/site
npm install
npm run check
npm run build
```

The root of the repository is still the GitHub Pages static deploy surface.
After content/source changes, copy the build output from `_source/site/dist/` to the repository root and keep `CNAME` if needed.

```bash
cd _source/site
npm run deploy:root
```

Then commit both source changes and generated root static changes.
