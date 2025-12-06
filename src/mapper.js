const {
  GeoPackageManager,
  Canvas,
  TileUtils,
  GeoPackageTileRetriever,
  FeatureTiles,
  FeatureIndexManager,
  BoundingBox,
  setSqljsWasmLocateFile,
} = window.GeoPackage;

setSqljsWasmLocateFile((file) => "geopackage/dist/" + file);
