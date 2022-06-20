var QRCode = require("qrcode");

export default class createQRCode {
  image: any;
  constructor(public targetUrl: string) {
    QRCode.toString(
      targetUrl,
      { type: "svg", errorCorrectionLevel: "H" },
      (err: any, url: any) => {
        this.image = `data:image/svg+xml;base64,${Buffer.from(url).toString(
          "base64"
        )}`;
        console.log(this.image);
      }
    );
  }
}
