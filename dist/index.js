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
const path_1 = __importDefault(require("path"));
const canvas_1 = __importDefault(require("./canvas"));
const qrcode_1 = __importDefault(require("./qrcode"));
function autoCreate(index) {
    return __awaiter(this, void 0, void 0, function* () {
        let canvas = new canvas_1.default({
            width: 2000,
            height: 3000,
        });
        try {
            yield canvas.run({
                src: path_1.default.join(__dirname, "../public/assets/bg-transparent.png"),
                x: 0,
                y: 0,
                width: 2000,
                height: 3000,
            }, {
                // src: path.join(__dirname, "../public/assets/qrcode.svg"),
                src: new qrcode_1.default(`https://metafame.realtime.tw/nft/viewer/${index}/3d`).image,
                x: 1500,
                y: 2500,
                width: 500,
                height: 500,
            });
            canvas.download(index);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            canvas = null;
        }
    });
}
function CreateAllMissions(rangeStart, rangeEnd) {
    const missions = [];
    for (let i = rangeStart; i < rangeEnd + 1; i++) {
        const mission = { fn: autoCreate2, index: i };
        missions.push(mission);
    }
    return missions;
}
const ImagesMissions = (start, end) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(CreateAllMissions(start, end).map(({ fn, index }) => fn(index)));
});
let CREATE_RANGE = 50;
let MAX_VALUE = 10000;
const createTimes = Math.ceil(MAX_VALUE / CREATE_RANGE); // 10
const pollingArray = Array.from(Array(createTimes).keys()); // [0, 1, 2, 3 ...];
const pollingSearch = (startWith) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < pollingArray.length; i++) {
        const rangeStart = startWith + CREATE_RANGE * pollingArray[i];
        const rangeEnd = startWith + CREATE_RANGE * (pollingArray[i] + 1) - 1;
        console.log(rangeStart, rangeEnd);
        yield ImagesMissions(rangeStart, rangeEnd);
    }
});
// pollingSearch(200001);
function autoCreate2(index) {
    return __awaiter(this, void 0, void 0, function* () {
        let canvas = new canvas_1.default({
            width: 2000,
            height: 3000,
        });
        try {
            yield canvas.run({
                src: path_1.default.join(__dirname, `../public/bg2/${index}.png`),
                x: 0,
                y: 0,
                width: 2000,
                height: 3000,
            }, {
                // src: path.join(__dirname, "../public/assets/qrcode.svg"),
                src: path_1.default.join(__dirname, `../public/qrcode/qrcode${index}.png`),
                x: 0,
                y: 0,
                width: 2000,
                height: 3000,
            });
            canvas.download(index);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            canvas = null;
        }
    });
}
ImagesMissions(200001, 200020);
