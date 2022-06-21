import path from "path";
import Canvas from "./canvas";
import createQRCode from "./qrcode";

async function autoCreate(index: number) {
  const canvas = new Canvas({
    width: 2000,
    height: 3000,
  });

  try {
    const res = await canvas.run(
      {
        src: path.join(__dirname, "../public/assets/bg-transparent.png"),
        x: 0,
        y: 0,
        width: 2000,
        height: 3000,
      },
      {
        // src: path.join(__dirname, "../public/assets/qrcode.svg"),
        src: new createQRCode(
          `https://metafame.realtime.tw/nft/viewer/${index}/3d`
        ).image,
        x: 1500,
        y: 2500,
        width: 500,
        height: 500,
      }
    );
    console.log("downloading", index);
    canvas.download(index);
  } catch (error) {
    console.log(error);
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

const ImagesMissions = async (start: number, end: number) =>
  await Promise.all(
    CreateAllMissions(start, end).map(({ fn, index }) => fn(index))
  );

const autoComplate = async () => {
  await ImagesMissions(1, 100);
};

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
