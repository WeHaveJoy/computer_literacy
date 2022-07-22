const jwt = require(`jsonwebtoken`);
const bcrypt = require("bcrypt");

module.exports = (app, db) => {

    app.get("/test", async (req, res) =>
        res.json(await db.manyOrNone("select * from users"))
    );

    app.post("/api/signUp", async (req, res) => {
        const { first_name, last_name, username, password, role } = req.body;

        try {
            console.log(req.body);
            const findUser = await db.oneOrNone(
                `SELECT * FROM users WHERE username= $1`,
                [username]
            );

            if (findUser != null) {
                throw Error(`User already exists!`);
            }

            const pass = await bcrypt.hash(password, 10);

            await db.none(
                `INSERT INTO users (first_name, last_name, username, password, role) VALUES ($1,$2,$3,$4,$5)`,
                [first_name, last_name, username, pass, role]
            );

            res.status(200).json({
                message: "User created!",
            });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                error: error.message,
            });
        }
    });

    app.post("/api/logIn", async (req, res) => {
        try {
            const { username, password } = req.body;

            const findUser = await db.oneOrNone(
                `SELECT * FROM users WHERE username = $1`,
                [username]
            );

            if (!findUser) {

                throw Error(`The user doesn't exist`);
            }
            const isValid = await bcrypt.compare(password, findUser.password);
            if (!isValid) {
                throw Error(`The user doesn't exist`);
            }

            let token = jwt.sign(findUser, `secretKey`, { expiresIn: `24h` });

            res.status(200).json({
                message: "You are loged in",
                token,
                user: findUser,
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
            });
        }
    });

    app.get("/api/beginner_level1", async (req, res) => {

        app.get("/test1", async (req, res) =>
            res.json(await db.manyOrNone("SELECT * FROM courses_beginners"))
        );

        try {
            const { level } = req.res;

            const display_course = await db.manyOrNone(`SELECT description, img FROM courses_beginners where level=1`, [level]);

            res.status(200).json({
                message: "Beginner course level 1!",
                course: display_course
            });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                error: error.message,
            });
        }

    })

    app.get("/api/courses_beginner", async (req, res) => {

        app.get("/test", async (req, res) =>
        res.json(await db.manyOrNone("select * from questions"))
    );

        try {
            const { assessment_id, id, course_id } = req.body;

            const quest = await db.manyOrNone(`SELECT * FROM questions`);

            const assess = await db.oneOrNone(`SELECT assessment_id FROM questions INNER JOIN assessment ON questions.assessment_id = assessment.id`, [assessment_id, id]);

            const quiz = await db.oneOrNone(`SELECT course_id FROM assessment INNER JOIN courses_beginners ON assessment.course_id = courses_beginners.id`, [course_id, id]);

            const ans = await db.manyOrNone(`SELECT * FROM answers`);

            res.status(200).json({
                question: quest,ans,assess,quiz
                // answer:ans
            });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                error: error.message,
            });
        }
    })

}