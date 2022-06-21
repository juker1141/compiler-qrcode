"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QRCode = require("qrcode");
class createQRCode {
    constructor(targetUrl) {
        this.targetUrl = targetUrl;
        QRCode.toString(targetUrl, { type: "svg", errorCorrectionLevel: "H" }, (err, url) => {
            this.image = `data:image/svg+xml;base64,${Buffer.from(url).toString("base64")}`;
            // console.log(this.image);
        });
    }
}
exports.default = createQRCode;
