window.onload = () => {
  const geoPackageDeps = () => {
    if (window.GeoPackage) {
      window.GeoPackage.setSqljsWasmLocateFile(
        (file) => "geopackage/dist/" + file
      );
      return window.GeoPackage;
    } else {
      console.log("GeoPackage object not loaded.");
      return null;
    }
  };

  document.getElementById("fileInput").addEventListener(
    "change",
    function () {
      const file = this.files[0];
      const fileReader = new FileReader();
      fileReader.onload = function () {
        loadByteArray(new Uint8Array(fileReader.result));
      };
      fileReader.readAsArrayBuffer(file);
    },
    false
  );

  function loadByteArray(array) {
    const {
      GeoPackageManager,
      Canvas,
      TileUtils,
      GeoPackageTileRetriever,
      FeatureTiles,
      FeatureIndexManager,
      BoundingBox,
      GeoPackageAPI,
    } = geoPackageDeps();

    GeoPackageAPI.open(array)
      .then(async (geoPackage) => {
        console.log(geoPackage);
        // get the tile table names
        const tileTables = geoPackage.getTileTables();

        for (let i = 0; i < tileTables.length; i++) {
          const table = tileTables[i];
          // get tile dao
          const tileDao = geoPackage.getTileDao(table);

          // get table info
          const tableInfo = geoPackage.getInfoForTable(tileDao);

          // Get a GeoPackageTile and then draw it into a canvas.
          const canvas = Canvas.create(
            TileUtils?.TILE_PIXELS_DEFAULT ?? 32,
            TileUtils?.TILE_PIXELS_DEFAULT ?? 32
          );
          const context = canvas.getContext("2d");
          const gpr = new GeoPackageTileRetriever(tileDao);
          console.log("gpr", gpr);

          const x = 0;
          const y = 0;
          const zoom = 0;

          // Get the GeoPackageTile for a particular web mercator tile
          const geoPackageTile = await gpr.getTile(x, y, zoom);
          console.log("geoPackageTile", geoPackageTile);

          // get the tile data as a Buffer
          let tileData = geoPackageTile?.getData();
          // Get the GeoPackageImage from the GeoPackageTile
          const geoPackageImage = await geoPackageTile?.getGeoPackageImage();
          // draw the tile and use the canvas to get the Data URL
          context.drawImage(geoPackageImage?.getImage(), 0, 0);
          const base64String = canvas.toDataURL("image/png");

          // In node.js, users must dispose of any GeoPackageImage and Canvas created to prevent memory leaks
          Canvas.disposeImage(geoPackageImage);
          Canvas.disposeCanvas(canvas);

          // Query tile table directly.
          const tileRow = tileDao.queryForTile(x, y, zoom);
          tileData = tileRow.getTileData(); // the raw bytes from the GeoPackage
        }

        // get the feature table names
        const featureTables = geoPackage.getFeatureTables();

        for (let i = 0; i < featureTables.length; i++) {
          const table = featureTables[i];
          // get the feature dao
          const featureDao = geoPackage.getFeatureDao(table);

          // get the info for the table
          const tableInfo = geoPackage.getInfoForTable(featureDao);

          // draw tiles using features
          const canvas = Canvas.create(
            TileUtils.TILE_PIXELS_DEFAULT,
            TileUtils.TILE_PIXELS_DEFAULT
          );
          const context = canvas.getContext("2d");
          const ft = new FeatureTiles(geoPackage, featureDao);
          var x = 0;
          var y = 0;
          var zoom = 0;
          const geoPackageImage = await ft.drawTile(x, y, zoom);
          context.drawImage(geoPackageImage.getImage(), 0, 0);
          const base64String = canvas.toDataURL("image/png");
          Canvas.disposeImage(geoPackageImage);
          Canvas.disposeCanvas(canvas);

          // iterate over indexed features that intersect the bounding box
          const featureIndexManager = new FeatureIndexManager(
            geoPackage,
            table
          );
          const resultSet = featureIndexManager.query();
          for (const featureRow of resultSet) {
            // ...
          }
          resultSet.close();

          // iterate over all features in a table in the geojson format
          const geoJSONResultSet = geoPackage.queryForGeoJSONFeatures(table);
          for (const feature of geoJSONResultSet) {
            // ...
          }
          geoJSONResultSet.close();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }
};
