const { expect } = require('chai');
const getDb = require('../src/services/db');
const request = require('supertest');
const app = require('../src/app');
// const { response } = require('../src/app');

describe('create album', () => {
    let db;
    let artistId;
    beforeEach(async () => {
        db = await getDb()
       const [result] = await db.query (`INSERT INTO Artist (name,genre) 
    VALUES(? , ?)`, [
        'test',
        'genre'
    ]);
   
        artistId = result.insertId
        })
    
    
    ;

    afterEach(async () => {
        await db.query('DELETE FROM Album');
        await db.query('DELETE FROM Artist')
        await db.close()
    });

    describe('/artist/1/album', () => {
        describe('POST', () => {
            it('creates a new album in the database associated to an artist', async () => {
         
                const response = await request(app).post(`/artist/${artistId}/album`).send({
                    name: 'Better',
                    year: '2018',
                    
                });
                expect(response.status).to.equal(201);
                const [[albumEntries]] = await db.query(
                 `SELECT * FROM Album WHERE Artistid = ${artistId}`
                    
                );
               console.log(albumEntries)
                expect(albumEntries.name).to.equal('Better')
                expect(albumEntries.year).to.equal(2018)
                expect(albumEntries.Artistid).to.equal(artistId)
            });
        });
    });
});