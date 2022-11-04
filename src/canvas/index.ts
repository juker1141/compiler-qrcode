import { createCanvas, loadImage } from "canvas";
import fs from "fs";
import path from "path";

type Config = {
  width: number;
  height: number;
};

type ImageConfig = {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export default class Canvas {
  bgWidth: number;
  bgHeight: number;
  ctx;
  canvas;

  constructor(public config: Config) {
    this.bgWidth = config.width;
    this.bgHeight = config.height;
    this.canvas = createCanvas(config.width, config.height);
    this.ctx = this.canvas.getContext("2d");
  }

  async run(imageBase: ImageConfig, imageChild: ImageConfig) {
    const images = [imageBase, imageChild];
    const imgSrcs = images.map(({ src }) => loadImage(src));
    const imgFiles = await Promise.all(imgSrcs);
    imgFiles.map((file, i) => {
      if (file) {
        const { x = 0, y = 0, width = 0, height = 0 } = images[i];
        this.ctx.drawImage(file, x, y, width, height);
        this.ctx.imageSmoothingEnabled = false;
      }
    });
  }

  download(i: number, targetDir: string) {
    const buffer = this.canvas.toBuffer("image/png");
    fs.writeFileSync(
      path.join(__dirname, `../../public/${targetDir}/${i}.png`),
      buffer
    );
  }
}
