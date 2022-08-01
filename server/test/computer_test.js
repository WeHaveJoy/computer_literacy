const supertest = require('supertest');
const PgPromise = require("pg-promise")
const express = require('express');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config()

const API = require('../api');
const { default: axios } = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const DATABASE_URL = process.env.DATABASE_URL;
const pgp = PgPromise({});
const db = pgp(DATABASE_URL);

API(app, db);


describe('As part of the computer literacy', () => {

    const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:sino123@localhost:5432/computer_literacy";


    before(async function () {
        this.timeout(5000);
        await db.none(`delete from users`);
        // const commandText = fs.readFileSync('./sql/data.sql', 'utf-8');
        //  await db.none(commandText)
    });

    it('should be able to signup a new user', async () => {
        const response = await supertest(app)
            .post('/api/signUp')
            .send({
                first_name: 'Sinovuyo',
                last_name: 'Dyantyi',
                username: 'sino10',
                password: 'password',
                role: 'learner',
                school: 'Langa High School'
            });

        const responseUsers = await supertest(app)
            .get('/api/users')
            .expect(200);

        console.log(responseUsers.body.data, 'after adding the new user');

        const users = response.body.data;
        const signup = response.body.message;
        assert.deepStrictEqual('user created', signup);

    });

    it('should be able to throw an error when the user already exists', async () => {
        const response = await supertest(app)
            .post('/api/signUp')
            .send({
                first_name: 'Sinovuyo',
                last_name: 'Dyantyi',
                username: 'sino10',
                password: 'password',
                role: 'learner',
                school: 'Langa High School'
            });

        const responseUsers = await supertest(app)
            .get('/api/signUp')
            .expect(200);

        console.log(responseUsers.body.data, 'after adding the new user');

        const users = response.body.data;
        const signup = response.body.message;
        assert.deepStrictEqual('The user already exists', signup);

    });


    it('should be able to login an existing user', async () => {
        const response = await supertest(app)
            .post('/api/logIn')
            .send({
                username: 'sino10',
                password: 'password'
            });

        const responseUsers = await supertest(app)
            .get('/api/users')
            .expect(200);

        console.log(responseUsers.body.data, 'after adding an existing user');

        const users = response.body.data;
        const login = response.body.message;
        assert.deepStrictEqual('The user already exists', login);

    });

    it('should be able to throw an error for a user that is not registered', async () => {
        const response = await supertest(app)
            .post('/api/logIn')
            .send({
                username: 'sino13',
                password: 'password'
            });

        const responseUsers = await supertest(app)
            .get('/api/logIn')
            .expect(200);

        console.log(responseUsers.body.data, 'after adding an existing user');

        const users = response.body.data;
        const login = response.body.message;
        assert.deepStrictEqual('The user does not exist', login);

    });

    after(async () => {
        db.$pool.end();
    });


}).timeout(5000);
