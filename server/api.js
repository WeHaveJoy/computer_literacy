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


    app.get('/api/test', function (req, res) {
        res.json({
            name: 'joe'
        });
    });

    // addAnswersToQuestion(questionId, answerId) 

    const getQuestionsById = async (id) => {

        const quest = await db.oneOrNone(`select * from questions where id= $1 order by id ASC`, [id]);
        return quest;
    }

    const getQuestionAnswersById = async (questionId) => {

        const ans = await db.manyOrNone(`select * from answers where question_id = $1 order by id ASC;`, [questionId])
        return ans;
    }

    const getCourseById = async (course_id) => {
        const course = await db.manyOrNone(`select * from courses_beginners`)
    }

    app.get('/api/courses', async (req, res) => {

        const results = await db.manyOrNone(`select * from courses_beginners`);

        const courseResults = results.map(async (course) => {

            const assessments = await db.manyOrNone(`select * from assessment where course_id = $1;`, [course.id])


            //     const questions = assessments.map(async (assessment) => {

            //         const { assessment_id } = req.body;

            //         const getQuestionsByAssessmentId = await db.manyOrNone(`select * from questions where assessment_id = $1`, [assessment_id])

            //         const assessmentQuestions = await getQuestionsByAssessmentId(assessment.id)

            return {
                ...course,
                assessments
            }

        })


        const courses = await Promise.all(courseResults)

        res.send({
            courses,

            // questions
        })


    })

    app.get("/test", async (req, res) =>
        res.json(await db.manyOrNone("select * from users"))
    );

    app.post("/api/signUp", async (req, res) => {
        const { first_name, last_name, username, password, role, school } = req.body;
        let errorMsg = ""
        try {
            // console.log(req.body);
            const findUser = await db.oneOrNone(
                `SELECT * FROM users WHERE username= $1`,
                [username]
            );

            if (findUser != null) {
                // errorMsg = `Invalid login details`

                throw Error(`User already exists!`);
            } else {

                const pass = await bcrypt.hash(password, 10);

                await db.none(
                    `INSERT INTO users (first_name, last_name, username, password, role,school) VALUES ($1,$2,$3,$4,$5,$6)`,
                    [first_name, last_name, username, pass, role, school]
                );
            }
            res.status(200).json({
                message: "User created!",
                errorMsg: "Invalid login details"
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
            // console.log('logIn .....', req.body);

            const findUser = await db.oneOrNone(
                `SELECT * FROM users WHERE username = $1`,
                [username]
            );
            console.log(findUser + "this is a logged user")
            if (!findUser) {
                // message = 'User not found'
                throw Error(`The user does not exists`);


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

    app.get("/api/beginner_level1", async (req, res) => {

        // app.get("/test1", async (req, res) =>
        //     res.json(await db.manyOrNone("SELECT * FROM courses_beginners"))
        // );

        try {
            const { level } = req.res;

            const display_course = await db.manyOrNone(`SELECT description, img FROM courses_beginners where level=1`, [level]);

            res.status(200).json({
                // message: "Beginner course level 1!",
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
                course3: display_course

            });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                error: error.message,
            });
        }

    })


    app.get("/api/intermidiate_level1", async (req, res) => {


        try {
            const { level } = req.res;

            const interOne = await db.manyOrNone(`SELECT description, img FROM courses_intermediate where level=1`, [level]);

            res.status(200).json({
                interOne: interOne

            });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                error: error.message,
            });
        }

    })
    app.get("/api/intermidiate_level2", async (req, res) => {


        try {
            const { level } = req.res;

            const interTwo = await db.manyOrNone(`SELECT description, img FROM courses_intermediate where level=2`, [level]);

            res.status(200).json({
                interTwo: interTwo

            });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                error: error.message,
            });
        }

    })



















    app.get("/api/addAnswersToQuestionBeginner", async (req, res) => {

        try {

            const questAns = await db.oneOrNone(`select * from answers`);

            res.status(200).json({
                qna: questAns,
                message: "You have selected all the answers"
            });
        } catch (error) {

            res.status(200).json({
                message: "You have selected all the answers"
            })
        }
    })



    app.post("/api/comment", async (req, res) => {
        const { comment, username } = req.body

        try {

            const comments = await db.none(`insert into feedback(comment) values ($1) where username = $2`, [comment, username]);
            console.log(comments)
            res.status(200).json({
                comments: comments
            });
        } catch (error) {

            res.status(500).json({
                error: error
            })
        }
    })
    app.get('/api/comments/:username', async (req, res) => {
        const { username } = req.params
        try {

            const comments = await db.none(`select * from feedback where username = $1`);
            console.log(comments)
            res.status(200).json({
                comments: comments
            });
        } catch (error) {

            res.status(500).json({
                error: error
            })
        }
    })
    app.get("/api/courses_beginner/:question_id", async (req, res) => {


        try {
            const { question_id } = req.params;

            const dbQuestions = await getQuestionsById(question_id)
            const answers = await getQuestionAnswersById(question_id);
            // console.log(question_id);
            const questions = {
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


    app.get("/api/getLearners", async (req, res) => {

        const results = await db.manyOrNone(`select * from school`);

        const schoolResults = results.map(async (learner) => {


            const schools = await db.manyOrNone(`select * from school where learner_id = $1;`, [learner.id])

            const learner_school = schools.map(async (school) => {


            })


            return {
                ...learner,
                schools
            }

        })
    })

}