const fs = require("fs");
const { PDFExtract } = require("pdf.js-extract");
const { PDFParse } = require("pdf-parse");
const { Dbf } = require("dbf-reader");

const outputFiles = "./scripts/output";
const mapFiles = "./scripts/map-files";

const ladyEvelynRiver = {
  layoutPdf: `${mapFiles}/LadyEvelyn_Layout_20251123_th.pdf`,
  geoPdf: `${mapFiles}/Geo_Lady_Evelyn_20251123_th.pdf`,
  dbf: `${mapFiles}/Lady_evelyn_20251123.dbf`,
};

function output(data, outputFileName) {
  fs.writeFile(`${outputFiles}/${outputFileName}.json`, data, (err) => {
    if (err) {
      console.log(`Error writing ${outputFileName} file: `, err);
    } else {
      console.log(`Successfully wrote ${outputFileName} file!`);
    }
  });
}

async function _parsePdf(url) {
  const parser = new PDFParse({ url });

  const info = await parser.getInfo({ parsePageInfo: true });
  const text = await parser.getText();
  const table = await parser.getTable();
  const image = await parser.getImage();
  const screenshot = await parser.getScreenshot();
  const result = { info, text, table, image, screenshot };

  await parser.destroy();
  return Promise.resolve(JSON.stringify(result));
}

async function parsePdf(url) {
  const options = {};
  const pdfExtract = new PDFExtract();
  const result = await pdfExtract.extract(url, options);

  return Promise.resolve(JSON.stringify(result));
}

async function parseDbf(url) {
  const buffer = fs.readFileSync(url);
  const result = Dbf.read(buffer);

  return Promise.resolve(JSON.stringify(result));
}

async function parseMapFiles() {
  const geoPdf = await parsePdf(ladyEvelynRiver.geoPdf);
  output(geoPdf, "geoPdf");

  const layoutPdf = await parsePdf(ladyEvelynRiver.layoutPdf);
  output(layoutPdf, "layoutPdf");

  const dbf = await parseDbf(ladyEvelynRiver.dbf);
  output(dbf, "dbf");
}

module.exports = {
  parseMapFiles,
};
