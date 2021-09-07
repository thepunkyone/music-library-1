const getDB = require('../services/db')

exports.create = async => (request, response) {
    const db = await getDB()
    const { name, year } = request.body;
    const { artistId } = request.params;
    try {
        await db.query(`INSERT INTO Album (name, year) VALUES (?,?) WHERE artist.Id = ?`, [
            name,
            year,
            artistId
        ])
        response.status(200)
    }
    catch(err) {
        response.sendStatus(500).json(err)
    }
}