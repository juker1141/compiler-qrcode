"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const canvas_1 = __importDefault(require("./canvas"));
const qrcode_1 = __importDefault(require("./qrcode"));
const canvas = new canvas_1.default({
    width: 2000,
    height: 3000,
});
canvas
    .run({
    src: path_1.default.join(__dirname, "../public/assets/bg-transparent.png"),
    x: 0,
    y: 0,
    width: 2000,
    height: 3000,
}, {
    src: new qrcode_1.default("https://metafame.com").image,
    x: 1500,
    y: 2500,
    width: 500,
    height: 500,
})
    .then(() => {
    canvas.download(1);
});
const resultCanvas = new canvas_1.default({
    width: 2000,
    height: 3000,
});
resultCanvas
    .run({
    src: path_1.default.join(__dirname, "../public/assets/nft-template.png"),
    x: 0,
    y: 0,
    width: 2000,
    height: 3000,
}, {
    src: path_1.default.join(__dirname, "../public/results/qrcode1.png"),
    x: 0,
    y: 0,
    width: 2000,
    height: 3000,
})
    .then(() => {
    resultCanvas.download(2);
});
