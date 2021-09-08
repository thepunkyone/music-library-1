const getDB = require('../services/db')

exports.create = async (request, response) => {
    const db = await getDB()
    const { name, year } = request.body;
    const { artistId } = request.params;
    try {
        await db.query(`INSERT INTO Album (name, year) VALUES (?,?) WHERE id = ?`, [
            name,
            year,
            artistId
        ])
        response.status(201)
    }
    catch(err) {
        response.sendStatus(500).json(err)
    }
}