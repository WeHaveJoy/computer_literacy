
const supertest = require('supertest');
const PgPromise = require("pg-promise")
const express = require('express');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config()
const API = require('../server/api');
const { default: axios } = require('axios');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const DATABASE_URL = process.env.DATABASE_URL;
const pgp = PgPromise({});
const db = pgp(DATABASE_URL);
API(app, db);
describe('As part of the computer literacy', () => {
    before(async function () {
        this.timeout(5000);
        // await db.none(`delete from user_answers`);
        // await db.none(`delete from answers`);
        // await db.none(`delete from questions`);
        // await db.none(`delete from assessment`);
        // await db.none(`delete from courses_advanced`);
        // await db.none(`delete from users`);
        // const commandText = fs.readFileSync('./sql/data.sql', 'utf-8');
        //  await db.none(commandText)
    });
    it('should have a test method', async () => {
        const response = await supertest(app)
            .get('/api/test')
            .expect(200);
        assert.deepStrictEqual({ name: 'joe' }, response.body);
    });
    it('should be able to signup a new user', async () => {
        const response = await supertest(app)
            .post('/api/signUp')
            .send({
                first_name: 'zizo',
                last_name: 'beda',
                username: 'zizobeda',
                password: 'password',
                role: 'learner',
                school: 'camps bay'
            })
            .expect(200);
        const users = response.body.data;
        const signup = response.body.message;
        assert.deepStrictEqual('User created!', signup);
    });
    it('should be able to throw an error when the user already exists', async () => {
        const response = await supertest(app)
            .post('/api/signUp')
            .send({
                first_name: 'zinzi',
                last_name: 'mandela',
                username: 'mandela',
                password: 'password',
                role: 'learner',
                school: 'Khulani High School'
            })
            .expect(200);


            const res = await supertest(app)
            .post('/api/signUp')
            .send({
                first_name: 'zinzi',
                last_name: 'mandela',
                username: 'mandela',
                password: 'password',
                role: 'learner',
                school: 'Khulani High School'
            })
            .expect(500);


        // const users = response.body.data;
        // const signup = response.body.error;
        const sign = response.body.error;
        assert.deepStrictEqual('User already exists!', sign);
    });
    it('should be able to login an existing user', async () => {
        const response = await supertest(app)
            .post('/api/logIn')
            .send({
                username: 'zizobeda',
                password: 'password',
            })
            .expect(200);
        const users = response.body.data;
        const login = response.body.message;
        assert.deepStrictEqual('You are loged in', login);
    });
    it('should throw an error when the user does  not exist', async () => {
        const response = await supertest(app)
            .post('/api/logIn')
            .send({
                username: 'hlomaeeeeeeeeeeeeeee',
                password: 'pass'
            })
            .expect(500);
        const login = response.body.error;
        assert.deepStrictEqual("The user does not exists", login);
    });
    it('should be able to get all the beginner courses level 1', async () => {
        const response = await supertest(app)
            .get('/api/beginner_level1')
            .expect(200);
        const courses = response.body.course;
        const courseLength = courses.length
        assert.equal(24, courseLength);
    });
    it('should be able to get all the beginner courses level 3', async () => {
        const response = await supertest(app)
            .get('/api/beginner_level3')
            .expect(200);
        const courses = response.body.course3;
        const courseLength = courses.length
        assert.equal(3, courseLength);
    });
    // it('should be able to get the user answers', async () => {
    //     const response = await supertest(app)

    //         .get('/api/addUserAnswers/')
    //         .expect(200);
    //     // const answers = response.body.message;
    //     const userAnswer = response.body.answer
    //     log(userAnswer + "tttttttttttttttttttt")
    //     assert.equal('You have selected all the answers', userAnswer);
    // });


    it('should be able to get all the intermidiate courses level 1', async () => {
        const response = await supertest(app)
            .get('/api/intermidiate_level1')
            .expect(200);
        const courses = response.body.interOne;
        const courseLength = courses.length
        assert.equal(4, courseLength);
    });


    it('should be able to get learners for school', async () => {
        const response = await supertest(app)

            .post('/api/signUp')
            .send({
                first_name: 'zibonele',
                last_name: 'fm',
                username: 'zibo',
                password: 'password',
                role: 'learner',
                school: 'Isilimela Comprehensive High School'
            })
            .expect(200)

        const res = await supertest(app)
            .get('/api/getLearnersBySchoolName/Isilimela Comprehensive High School')
            .expect(200);

        const learnerForSchool = res.body.learners;
        

        assert.deepStrictEqual([{"first_name": "zibonele","last_name": "fm"}]
      
            , learnerForSchool);
    });
    after(async () => {
        db.$pool.end();
    });
}).timeout(5000);




