"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const googleapis_1 = require("googleapis");
const KEYFILEPATH = path_1.default.join(__dirname, "../../.local/serviceAccount.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];
function createAndUploadFile(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const auth = new googleapis_1.google.auth.GoogleAuth({
            keyFile: KEYFILEPATH,
            scopes: SCOPES,
        });
        const driveService = googleapis_1.google.drive({ version: "v3", auth });
        let fileMetaData = {
            name: `${fileName}.png`,
            parents: [{ id: "1n8sjRbQlqorVaVFG58qGTFQAVWke0kXp" }],
        };
        let media = {
            mimeType: "image/png",
            body: fs_1.default.createReadStream(`${path_1.default.join(__dirname, `../../public/results/${fileName}.png`)}`),
        };
        try {
            const response = yield driveService.files.create({
                resource: {
                    name: `${fileName}.png`,
                    parents: [{ id: "1n8sjRbQlqorVaVFG58qGTFQAVWke0kXp" }],
                },
                media: media,
                fields: "id",
            });
            console.log("response: ", response.data.id);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = createAndUploadFile;
