const PgPromise = require("pg-promise")
const express = require("express");
const assert = require("assert");
const fs = require("fs");
require('dotenv').config()
var supertest = require("supertest")
var koa = require('koa');
var app = module.exports = new koa();
var app = require('../api');
const pg = require("pg");
const Pool = pg.Pool;

// module.exports = (app, db) => {

// import api from "./api"
// let app = express();
// const app = express();

describe('As part of the computer literacy', () => {

    const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:sino123@localhost:5432/computer_literacy";

    const pgp = PgPromise({});
    const db = pgp(DATABASE_URL);


    before(async function () {
        this.timeout(5000);
        await db.none(`delete from users`);
        // const commandText = fs.readFileSync('./sql/data.sql', 'utf-8');
        // await db.none(commandText)
    });

    it('should be able to signup a new user', async () => {
        const response = await supertest(app)
            .post('/api/signUp')
            .send({
                name: 'Zandile',
                surname: 'Bakaqana',
                username: 'zan13',
                password: 'password',
                role: 'learner'
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
                name: 'Zandile',
                surname: 'Bakaqana',
                username: 'zan13',
                password: 'password',
                role: 'learner'
            });

        const responseUsers = await supertest(app)
            .get('/api/users')
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
                username: 'zan13',
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
            .get('/api/users')
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
// };