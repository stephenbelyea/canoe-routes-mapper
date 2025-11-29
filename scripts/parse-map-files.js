const fs = require("fs");
const { PDFExtract } = require("pdf.js-extract");
const { Dbf } = require("dbf-reader");
const { outputJson, ladyEvelynRiver } = require("./utils");
const {
  GeoPackageAPI,
  GeoPackageTileRetriever,
} = require("@ngageoint/geopackage");

async function parsePdf(url) {
  const options = {};
  const pdfExtract = new PDFExtract();
  const result = await pdfExtract.extract(url, options);

  return Promise.resolve(result);
}

async function parseDbf(url) {
  const buffer = fs.readFileSync(url);
  const result = Dbf.read(buffer);

  return Promise.resolve(result);
}

async function parseGpkg(url) {
  const geoPackage = await GeoPackageAPI.open(url);
  const result = { tables: [] };

  const tileTables = geoPackage.getTileTables();
  tileTables.forEach(async (table) => {
    const tileDao = geoPackage.getTileDao(table);
    const tableInfo = geoPackage.getInfoForTable(tileDao);

    result.tables.push({
      name: tileDao.table_name,
      table: tileDao.table,
      info: tableInfo,
    });
  });

  return Promise.resolve(result);
}

async function parseMapFiles() {
  const files = [
    { name: "geoPdf", parser: parsePdf },
    { name: "layoutPdf", parser: parsePdf },
    { name: "dbf", parser: parseDbf },
    { name: "gpkg", parser: parseGpkg },
  ];

  files.forEach(async (file) => {
    const output = await file.parser(ladyEvelynRiver[file.name]);
    outputJson(output, file.name);
  });
}

module.exports = {
  parseMapFiles,
};
