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
        const canvas = new canvas_1.default({
            width: 2000,
            height: 3000,
        });
        try {
            const res = yield canvas.run({
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
            console.log("downloading", index);
            canvas.download(index);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function CreateAllMissions(rangeStart, rangeEnd) {
    const missions = [];
    for (let i = rangeStart; i < rangeEnd + 1; i++) {
        const mission = { fn: autoCreate, index: i };
        missions.push(mission);
    }
    return missions;
}
const ImagesMissions = (start, end) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Promise.all(CreateAllMissions(start, end).map(({ fn, index }) => fn(index)));
});
const autoComplate = () => __awaiter(void 0, void 0, void 0, function* () {
    yield ImagesMissions(1, 100);
});
autoComplate();
// const resultCanvas = new Canvas({
//   width: 2000,
//   height: 3000,
// });
// resultCanvas
//   .run(
//     {
//       src: path.join(__dirname, "../public/assets/nft-template.png"),
//       x: 0,
//       y: 0,
//       width: 2000,
//       height: 3000,
//     },
//     {
//       src: path.join(__dirname, "../public/results/qrcode1.png"),
//       x: 0,
//       y: 0,
//       width: 2000,
//       height: 3000,
//     }
//   )
//   .then(() => {
//     resultCanvas.download(2);
//   });
