const express = require('express');
const app = express();
const port = 3000;

// 生成隨機整數的輔助函數
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// 生成地圖的API
app.get('/generate-map', (req, res) => {
    const { width, height, objectTypes, objectSizes, maxObjects } = req.query;

    // 檢查是否有足夠的參數傳入
    if (!width || !height || !objectTypes || !objectSizes || !maxObjects) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    // 將物件種類和大小轉換為陣列 (以逗號分隔)
    const types = objectTypes.split(',');  
    const sizes = objectSizes.split(',').map(size => {
        const [width, height] = size.split('x').map(Number);
        return { width, height };
    });  
    const maxObj = parseInt(maxObjects, 10); // 限制物件數量

    // 確認物件種類和大小的長度匹配
    if (types.length !== sizes.length) {
        return res.status(400).json({ error: 'Object types and sizes must match in length' });
    }

    // 將大小轉換為物件寬和高
    const parsedSizes = sizes.map(size => {
        const [w, h] = size.split('x').map(Number);
        return { width: w, height: h };
    });

    // 初始化地圖（寬度和高度）
    const mapWidth = parseInt(width, 10);
    const mapHeight = parseInt(height, 10);
    const map = Array.from({ length: mapHeight }, () => Array(mapWidth).fill(null));

    // 儲存生成的物件信息
    const placedObjects = [];

    // 隨機擺放物件
    for (let i = 0; i < maxObj; i++) {
        const objIndex = getRandomInt(0, types.length - 1); // 隨機選擇物件
        const objType = types[objIndex];
        const { width: objWidth, height: objHeight } = parsedSizes[objIndex];

        // 確保物件可以放進地圖內
        const x = getRandomInt(0, mapWidth - objWidth);
        const y = getRandomInt(0, mapHeight - objHeight);

        // 在地圖中填充物件 (假設物件是矩形區域)
        for (let dx = 0; dx < objWidth; dx++) {
            for (let dy = 0; dy < objHeight; dy++) {
                if (x + dx < mapWidth && y + dy < mapHeight) {
                    map[y + dy][x + dx] = objType;
                }
            }
        }

        // 記錄物件的位址
        placedObjects.push({
            type: objType,
            position: { x, y },
            size: { width: objWidth, height: objHeight }
        });
    }

    // 回傳地圖和物件數據
    res.json({
        map: map,
        placedObjects: placedObjects,
        totalObjects: placedObjects.length
    });
});

// 啟動伺服器
app.listen(port, () => {
    console.log(`Running at http://localhost:3000`);
});
