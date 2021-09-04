const { expect } = require('chai');
const request = require('supertest');
const getDB = require('../src/services/db');
const app = require('../src/app');

describe('update artist', () => {
    let db;
    let artists;
    beforeEach(async () => {
        db = await getDB();
        await Promise.all([
            db.query('INSERT INTO Artist (name, genre) VALUES (?,?)', [
              'Tame Impala',
              'rock',  
            ]),
            db.query('INSERT INTO Artist (name, genre) VALUES (?,?)', [
                'Kylie Minogue',
                'pop',
            ]),
            db.query('INSERT INTO Artist(name, genre) VALUES (?,?)', [
                'Dave Brubeck',
                'jazz',
            ]),
        ]);
[artists] = await db.query('SELECT * FROM Artist');
    });
afterEach(async () => {
    await db.query('DELETE FROM Artist')
    await db.close()
});
describe('/artist')
})