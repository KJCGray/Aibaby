var express = require('express');
var router = express.Router();

app.use(express.json()); // 解析 JSON 請求體

app.post('/register', (req, res) => {
    const { username, password, age, gender, language, personality, interests } = req.body;
    if (!username || !password || !age || !gender || !language || !personality || !interests) {
        return res.status(400).send({ status: 'error', message: 'Invalid input data', errorCode: 'REG001' });
    }

    // 模擬成功響應
    res.send({ status: 'success', message: 'User registered successfully', userId: '12345', token: 'jwt-token' });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
