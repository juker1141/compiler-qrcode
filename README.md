# QRcode 產圖腳本

node-version: 14.18.0

```sh
npm install

npm run build
```

```js
// 1. 決定要產出的 QRcode 位置
new createQRCode(`https://metafame.com/nft/viewer/${index}/3d`).image;

// 2. 在index.ts 設定產出的 range & maxValue

// 建議使用 CREATE_RANGE = 50 ~ 100
// 看使用者的電腦效能決定
let CREATE_RANGE = 50; // 一輪的分批
let MAX_VALUE = 100; //最大值

// 3. 更改 index.ts 內的
pollingSearch(1); mint 為 1
pollingSearch(200001); makeover 為 200001 須看正式上線時的 NFT ID
// 為起始id = 1;
```
