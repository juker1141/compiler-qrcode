import path from "path";
import Canvas from "./canvas";
import createQRCode from "./qrcode";

const canvas = new Canvas({
  width: 2000,
  height: 3000,
});

canvas
  .run(
    {
      src: path.join(__dirname, "../public/assets/bg-transparent.png"),
      x: 0,
      y: 0,
      width: 2000,
      height: 3000,
    },
    {
      src: new createQRCode("https://metafame.com").image,
      x: 1500,
      y: 2500,
      width: 500,
      height: 500,
    }
  )
  .then(() => {
    canvas.download(1);
  });

const resultCanvas = new Canvas({
  width: 2000,
  height: 3000,
});

resultCanvas
  .run(
    {
      src: path.join(__dirname, "../public/assets/nft-template.png"),
      x: 0,
      y: 0,
      width: 2000,
      height: 3000,
    },
    {
      src: path.join(__dirname, "../public/results/qrcode1.png"),
      x: 0,
      y: 0,
      width: 2000,
      height: 3000,
    }
  )
  .then(() => {
    resultCanvas.download(2);
  });
