import path from "path";
import Canvas from "./canvas";
import createQRCode from "./qrcode";

async function autoCreate(index: number) {
  let canvas: Canvas | null = new Canvas({
    width: 2000,
    height: 3000,
  });

  try {
    await canvas.run(
      {
        src: path.join(__dirname, "../public/assets/bg-transparent.png"),
        x: 0,
        y: 0,
        width: 2000,
        height: 3000,
      },
      {
        // src: path.join(__dirname, "../public/assets/qrcode.svg"),
        src: new createQRCode(`https://metafame.com/nft/viewer/${index}/3d`)
          .image,
        x: 1500,
        y: 2500,
        width: 500,
        height: 500,
      }
    );
    canvas.download(index, "qrcode");
  } catch (error) {
    console.log(error);
  } finally {
    canvas = null;
  }
}

function CreateAllMissions(rangeStart: number, rangeEnd: number) {
  const missions = [];
  for (let i = rangeStart; i < rangeEnd + 1; i++) {
    const mission = { fn: autoCreate, index: i };
    missions.push(mission);
  }
  return missions;
}

const ImagesMissions = async (start: number, end: number) => {
  await Promise.all(
    CreateAllMissions(start, end).map(({ fn, index }) => fn(index))
  );
};

let CREATE_RANGE = 50; // 一輪的分批
let MAX_VALUE = 100; //最大值
const createTimes = Math.ceil(MAX_VALUE / CREATE_RANGE); // 10
const pollingArray = Array.from(Array(createTimes).keys()); // [0, 1, 2, 3 ...];
const pollingSearch = async (startWith: number) => {
  for (let i = 0; i < pollingArray.length; i++) {
    const rangeStart = startWith + CREATE_RANGE * pollingArray[i];
    const rangeEnd = startWith + CREATE_RANGE * (pollingArray[i] + 1) - 1;
    console.log(rangeStart, rangeEnd);
    await ImagesMissions(rangeStart, rangeEnd);
  }
};
pollingSearch(1); // 會從該數字跑到最大值 MAX_VALUE
// pollingSearch(200001);

// async function autoCreate2(index: number) {
//   let canvas: Canvas | null = new Canvas({
//     width: 2000,
//     height: 3000,
//   });

//   try {
//     await canvas.run(
//       {
//         src: path.join(__dirname, `../public/bg2/${index}.png`),
//         x: 0,
//         y: 0,
//         width: 2000,
//         height: 3000,
//       },
//       {
//         // src: path.join(__dirname, "../public/assets/qrcode.svg"),
//         src: path.join(__dirname, `../public/qrcode/qrcode${index}.png`),
//         x: 0,
//         y: 0,
//         width: 2000,
//         height: 3000,
//       }
//     );
//     canvas.download(index);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     canvas = null;
//   }
// }
// ImagesMissions(200001, 200020);
