// const PgPromise = require("pg-promise")
// const express = require("express");
// const assert = require("assert");
// const fs = require("fs");
// require('dotenv').config()
// var supertest = require("supertest")
// var koa = require('koa');
// var app = module.exports = new koa();
// module.exports = app;
// var API = require('../api');
// const pg = require("pg");
// const Pool = pg.Pool;
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
        await db.none(`delete from users`);
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

    // it('should be able to throw an error when the user already exists', async () => {
    //     const response = await supertest(app)
    //         .post('/api/signUp')
    //         .send({
    //             first_name: 'zizo',
    //             last_name: 'beda',
    //             username: 'zizobeda',
    //             password: 'password',
    //             role: 'learner',
    //             school: 'camps bay'
    //         })
    //         .expect(500);
    //     const users = response.body.data;
    //     const signup = response.body.message;
    //     assert.deepStrictEqual('The user already exists', users);

    // });


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

    // it('should throw an error when the user does  not exist', async () => {
    //     const response = await supertest(app)
    //         .post('/api/logIn')
    //         .send({
    //             username: 'hloma',
    //             password: 'pass'
    //         })
    //         .expect(200);
    //     const login = response.body.message;
    //     assert.deepStrictEqual('The user does not exists', login);
    // });



    it('should be able to get all the beginner courses level 1' , async () => {
        const response = await supertest(app)
            .get('/api/beginner_level1')
            .expect(200);




        const courses = response.body.message;
        const numCourses = courses.length

        assert.equal(12,numCourses);

    });

    it('should be able to get all the beginner courses level 3', async () => {
        const response = await supertest(app)
            .get('/api/beginner_level3')
            .expect(200);



            const courses = response.body.message;
            const numCourses = courses.length
    
            assert.equal(24,numCourses);

    });
    it('should be able to get all the answers', async () => {
        const response = await supertest(app)
            .get('/api/addAnswersToQuestionBeginner')
            .expect(200);


            const courses = response.body.message;
            const numCourses = courses.length
    
            assert.equal(33,numCourses);


    });
    after(async () => {
        db.$pool.end();
    });
}).timeout(5000);