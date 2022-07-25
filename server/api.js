const jwt = require(`jsonwebtoken`);
const bcrypt = require("bcrypt");

module.exports = (app, db) => {
    const verifyToken = (req, res, next) => {
        const bearerHeader = req.headers['authorization']
        const token = bearerHeader && bearerHeader.split(' ')[1]
        console.log(token + "76767676");
        console.log(bearerHeader + "000000000");

        if (token == null) return res.sendStatus(401)
        jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, (err, user) => {
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        })
    }

    // addAnswersToQuestion(questionId, answerId) 

    const getQuestionsById = async (id) => {

        const quest = await db.oneOrNone(`select * from questions where id= $1`, [id]);
        return quest;
    }

    const getQuestionAnswersById = async (questionId) => {

        const ans = await db.manyOrNone(`select * from answers where question_id = $1;`, [questionId])
        return ans;
    }

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
            console.log('logIn .....', req.body);

            const findUser = await db.oneOrNone(
                `SELECT * FROM users WHERE username = $1`,
                [username]
            );

            if (!findUser) {

                throw Error(`The user doesn't exist`);
            }
            const isValid = await bcrypt.compare(password, findUser.password);
            if (!isValid) {

                throw Error(`Please enter the correct password`);
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

    app.get("/api/beginner_level1", verifyToken, async (req, res) => {

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

    app.get("/api/beginner_level3", async (req, res) => {

        app.get("/test1", async (req, res) =>
            res.json(await db.manyOrNone("SELECT * FROM courses_beginners"))
        );

        try {
            const { level } = req.res;

            const display_course = await db.manyOrNone(`SELECT description, img FROM courses_beginners where level=3`, [level]);

            res.status(200).json({
                message: "Beginner course level 3!",
                course3: display_course
            });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                error: error.message,
            });
        }

    })



    app.get("/api/courses_beginner", async (req, res) => {

       
    app.get("/api/addAnswersToQuestionBeginner", async (req, res) => {

        try {

            const questAns = await db.oneOrNone(`select * from answers`);

            res.status(200).json({
                qna: questAns
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                error: error.message
            })
        }
    })

    app.get("/api/courses_beginner/:question_id", async (req, res) => {


        try {
             const {question_id } = req.params;

            const dbQuestions = await getQuestionsById(question_id)
            const answers = await getQuestionAnswersById(question_id);
            console.log(question_id);
            const questions =  {
                    ...dbQuestions,
                    answers
                }
            // {
            //     id: 1,
            //     question: 'one plus one',
            //     answers: []
            // }

            // const quest = await db.manyOrNone(`SELECT * FROM questions where question = $1`, [question]);
            // const test = await db.manyOrNone(`select answer, question from answers join questions on question_id = answers.question_id where question_id  =1;`)
            // const assess = await db.manyOrNone(`SELECT question FROM questions INNER JOIN assessment ON questions.assessment_id = assessment.id`, [assessment_id, id]);

            // const quiz = await db.manyOrNone(`SELECT * FROM assessment INNER JOIN courses_beginners ON assessment.course_id = courses_beginners.id`, [course_id, id]);

            // const ans = await db.manyOrNone(`SELECT answer FROM answers INNER JOIN questions ON answers.question_id = questions.id;`, [question_id, id]);

            //  const quiz_ans = await db.manyOrNone(`SELECT * FROM answers where question_id = $1`, [question_id]);

            res.status(200).json({

               questions
               
            });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                error: error.message
            });
        }
    })

}