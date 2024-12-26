const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const crypto = require('crypto');

// 生成 JWT 密鑰
const jwtSecret = crypto.randomBytes(64).toString('hex');

// 資料庫連接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'mysql_project'
});

db.connect((err) => {
    if (err) {
        console.error('資料庫連接失敗: ' + err.stack);
        return;
    }
    console.log('資料庫連接成功');
});

// 註冊路由
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: 註冊新用戶
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *               language:
 *                 type: string
 *               personality:
 *                 type: string
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - username
 *               - password
 *               - age
 *               - gender
 *               - language
 *               - personality
 *               - interests
 *     responses:
 *       200:
 *         description: 用戶成功註冊
 *       400:
 *         description: 輸入數據無效
 *       500:
 *         description: 伺服器錯誤
 */
router.post('/register', (req, res) => {
    const { username, password, age, gender, language, personality, interests } = req.body;

    if (!username || !password || !age || !gender || !language || !personality || !interests) {
        return res.status(400).json({ status: 'error', message: 'Missing required fields' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Error hashing password' });
        }

        const query = 'INSERT INTO Users (username, password, age, gender, language, personality, interests) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [username, hashedPassword, age, gender, language, personality, JSON.stringify(interests)];

        db.query(query, values, (err, result) => {
            if (err) {
                return res.status(500).json({ status: 'error', message: 'Error saving user to database' });
            }

            const token = jwt.sign({ id: result.insertId }, jwtSecret, { expiresIn: '1h' });

            res.status(200).json({
                status: 'success',
                message: 'User registered successfully',
                userId: result.insertId,
                token: token
            });
        });
    });
});

// 登入路由
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: 用戶登入
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: 登入成功
 *       400:
 *         description: 輸入數據無效
 *       401:
 *         description: 未經授權
 */
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ status: 'error', message: 'Missing required fields' });
    }

    const query = 'SELECT id, password FROM Users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Error querying database' });
        }

        if (results.length === 0) {
            return res.status(400).json({ status: 'error', message: 'Invalid username or password' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ status: 'error', message: 'Error comparing passwords' });
            }

            if (!isMatch) {
                return res.status(400).json({ status: 'error', message: 'Invalid username or password' });
            }

            const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });

            res.status(200).json({
                status: 'success',
                message: 'Login successful',
                userId: user.id,
                token: token
            });
        });
    });
});

module.exports = router;
