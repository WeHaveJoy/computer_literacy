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
          const { username, password} = req.body;
    
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
}