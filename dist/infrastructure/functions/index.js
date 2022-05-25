"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const XLSX = __importStar(require("xlsx"));
const helper_1 = require("./helper/helper");
const readExcelFile = process.env['EXCEL_FILE_NAME'];
// Reading our test file
const excelFile = XLSX.readFile(readExcelFile);
//Read The Sheet Data
var ws = excelFile.Sheets["Tenant Configurations"];
//Get Current Sheet value in Json
var data = XLSX.utils.sheet_to_json(ws);
//Get Ceil Headers Name
let getHeadersFromCeil = get_header_row(ws);
//Function to get all column header values
function get_header_row(sheet) {
    var headers = [];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    var C, R = range.s.r; /* start in the first row */
    /* walk every column in the range */
    for (C = range.s.c; C <= range.e.c; ++C) {
        var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]; /* find the cell in the first row */
        //var hdr = ""; // <-- replace with your desired default 
        var hdr = "";
        if (cell && cell.t)
            hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
    }
    return headers;
}
//Give's Index Value Of configurationJson
var configurationJsonResult = [];
let configurationJsonData = data.map(function (record) {
    var net = record.ConfigurationJson;
    return net;
});
for (var key in configurationJsonData) {
    if (configurationJsonData.hasOwnProperty(key)) {
        let removeUnWantedData = configurationJsonData[key].replace(/\{|\}/gi, '').replace(/ /g, '').replace(/,/g, "");
        if (removeUnWantedData.substring(0, removeUnWantedData.indexOf(":"))) {
            removeUnWantedData = removeUnWantedData.substring(0, removeUnWantedData.indexOf(":"));
        }
        else {
            removeUnWantedData = removeUnWantedData;
        }
        if (removeUnWantedData != "") {
            configurationJsonResult.push(removeUnWantedData);
        }
    }
}
var result = [];
//Pass the ceil header value and give json output of newFunctionToJson
for (let index = 0; index < getHeadersFromCeil.length; index++) {
    const element = ((_a = getHeadersFromCeil[index + 1]) === null || _a === void 0 ? void 0 : _a.toString()) || '';
    if (element != "" && element != undefined) {
        let rowHeaderName = data.map(function (record) {
            var net = record[element];
            return net;
        });
        for (let index = 0; index < rowHeaderName.length; index++) {
            if (rowHeaderName.hasOwnProperty(index) && rowHeaderName[index] != undefined) {
                let data = (0, helper_1.newFunctionToJson)(rowHeaderName, element, configurationJsonResult);
                result.push(data);
                break;
            }
        }
    }
}
(0, helper_1.MutationQueryFunction)(result);
//# sourceMappingURL=index.js.map