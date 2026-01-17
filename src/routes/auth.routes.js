const router = require("express").Router();
const bcrypt = require("bcrypt");
const { AppDataSource } = require("../config/db");
const { User } = require("../entities/User");
const { generateToken } = require("../utils/jwt");

const repo = () => AppDataSource.getRepository("User");

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 */
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    // Validation guard
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email, and password are required",
        });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = repo().create({ name, email, password: hashed });
    await repo().save(user);

    res.json({ token: generateToken(user.id) });
});



/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Validation guard
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required",
        });
    }

    const user = await repo().findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ token: generateToken(user.id) });
});

module.exports = router;
