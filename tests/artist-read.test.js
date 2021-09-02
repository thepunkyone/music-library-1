const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('read artist', () => {
    let db;
    let artists;

    beforeEach(async () => {
        db = await getDb();
        await Promise.all([
            db.query('INSERT INTO Artist (name, genre) VALUES (?,?)', [
                'Tame Impala',
                'rock',
            ]),
            db.query('INSERT INTO Artist (name genre) VALUES (?,?)', [
                'Kylie Minogue',
                'Pop',
            ]),
            db.query('INSERT INTO Artist (name, genre) VALUES (?,?)', [
                'Dave Brubeck',
                'jazz',
            ]),
        ]);
[artists] = await db.query('SELECT * FROM Artist')

    });
    afterEach(async () => {
        await db.query('DELETE FROM Artist');
        await db.close()
    });
    describe('/artist', () => {
        describe('GET', () => {
            it('returns all artist records in the database', async () => {
                const response = await (await request(app).get('/artist')).send();
                
                expect(response.status).to.equal(200);
                expect(response.body.length).to.equal(3);

                response.body.forEach((artistRecord) => {
                    const expected = artists.find((a) => a.id === artistRecord.id);

                    expect(artistRecord).to.deep.equal(expected);
                });
            });
        });
    });
});