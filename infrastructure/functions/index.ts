import * as XLSX from 'xlsx';


import { newFunctionToJson, MutationQueryFunction } from './helper/helper';


const readExcelFile: any = process.env['EXCEL_FILE_NAME']

// Reading our test file
const excelFile = XLSX.readFile(readExcelFile)

//Read The Sheet Data
var ws = excelFile.Sheets["Tenant Configurations"]

//Get Current Sheet value in Json
var data = XLSX.utils.sheet_to_json(ws)

//Get Ceil Headers Name
let getHeadersFromCeil = get_header_row(ws)

//Function to get all column header values
function get_header_row(sheet: any) {
  var headers = [];
  var range = XLSX.utils.decode_range(sheet['!ref']);
  var C, R = range.s.r; /* start in the first row */
  /* walk every column in the range */
  for (C = range.s.c; C <= range.e.c; ++C) {
    var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
    //var hdr = ""; // <-- replace with your desired default 
    var hdr = "";
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
    headers.push(hdr);
  }
  return headers;
}

//Give's Index Value Of configurationJson
var configurationJsonResult = [];
let configurationJsonData = data.map(function (record: any) {
  var net = record.ConfigurationJson
  return net
});
for (var key in configurationJsonData) {
  if (configurationJsonData.hasOwnProperty(key)) {
    let removeUnWantedData = configurationJsonData[key].replace(/\{|\}/gi, '').replace(/ /g, '').replace(/,/g, "")
    if (removeUnWantedData.substring(0, removeUnWantedData.indexOf(":"))) {
      removeUnWantedData = removeUnWantedData.substring(0, removeUnWantedData.indexOf(":"));
    } else {
      removeUnWantedData = removeUnWantedData
    }
    if (removeUnWantedData != "") {
      configurationJsonResult.push(removeUnWantedData)
    }
  }
}

var result = [];
//Pass the ceil header value and give json output of newFunctionToJson
for (let index = 0; index < getHeadersFromCeil.length; index++) {
  const element = getHeadersFromCeil[index + 1]?.toString() || '';
  if (element != "" && element != undefined) {
    let rowHeaderName = data.map(function (record: any) {
      var net = record[element]
      return net
    });
    for (let index = 0; index < rowHeaderName.length; index++) {
      if (rowHeaderName.hasOwnProperty(index) && rowHeaderName[index] != undefined) {
        let data = newFunctionToJson(rowHeaderName, element, configurationJsonResult)
        result.push(data)
        break
      }
    }
  }
}

MutationQueryFunction(result);