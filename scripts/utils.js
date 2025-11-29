const fs = require("fs");

const outputFiles = "./scripts/output";
const mapFiles = "./scripts/map-files";

const ladyEvelynRiver = {
  layoutPdf: `${mapFiles}/LadyEvelyn_Layout_20251123_th.pdf`,
  geoPdf: `${mapFiles}/Geo_Lady_Evelyn_20251123_th.pdf`,
  dbf: `${mapFiles}/Lady_evelyn_20251123.dbf`,
  gpkg: `${mapFiles}/gpkg/Geo_Lady_Evelyn_20251123_th.gpkg`,
};

function outputJson(data, outputFileName) {
  const dataJsonStr = JSON.stringify(data);

  fs.writeFile(`${outputFiles}/${outputFileName}.json`, dataJsonStr, (err) => {
    if (err) {
      console.log(`Error writing ${outputFileName} file: `, err);
    } else {
      console.log(`Successfully wrote ${outputFileName} file!`);
    }
  });
}

module.exports = {
  outputFiles,
  mapFiles,
  ladyEvelynRiver,
  outputJson,
};
