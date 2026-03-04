# Canoe Routes Mapper

## Convert ArcGIS Export Data

Use [MyGeodata](https://mygeodata.cloud/) to read the SHP, DBF, and any other exported files and convert into a single, readable JSON which contains table data, and shape and line coordinates.

- Upload all available source files to get the full scope
- Export conversion using the GeoJSON format (.geojson)
- Select 'Yes' to write the Bbox property

## Run Locally

```bash
npm install
npm run dev
```

Once built, the app will be served at `http://localhost:5173/`.
