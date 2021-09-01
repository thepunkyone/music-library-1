const getDB = require('../services/db')



async create (request, response) {
    const db = await getDB();
    try {
    await db.query (`INSERT INTO Artist (name,genre) 
    VALUES('Tame Impala', 'rock')`)
    response.sendStatus(201)}
   
    catch (err) {
       response.sendStatus(500)
    }


    db.close()
}
