const getDB = require('../services/db')



async exports.create = (request, response) => {
    const db = await getDB();
    
    response.sendStatus(201)
}
