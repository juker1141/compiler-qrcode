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
const canvas_1 = require("canvas");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Canvas {
    constructor(config) {
        this.config = config;
        this.bgWidth = config.width;
        this.bgHeight = config.height;
        this.canvas = (0, canvas_1.createCanvas)(config.width, config.height);
        this.ctx = this.canvas.getContext("2d");
    }
    run(imageBase, imageChild) {
        return __awaiter(this, void 0, void 0, function* () {
            // const image = await loadImage(config.src);
            // this.ctx.drawImage(image, config.x, config.y, config.width, config.height);
            const images = [imageBase, imageChild];
            const imgSrcs = images.map(({ src }) => (0, canvas_1.loadImage)(src));
            const imgFiles = yield Promise.all(imgSrcs);
            imgFiles.map((file, i) => {
                if (file) {
                    const { x = 0, y = 0, width = 0, height = 0 } = images[i];
                    this.ctx.drawImage(file, x, y, width, height);
                }
            });
        });
    }
    download(i) {
        console.log(i);
        const buffer = this.canvas.toBuffer("image/png");
        fs_1.default.writeFileSync(path_1.default.join(__dirname, `../../public/results/qrcode${i}.png`), buffer);
    }
}
exports.default = Canvas;
