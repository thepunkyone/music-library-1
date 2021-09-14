const getDB = require('../services/db')

exports.create = async (request, response) => {
    const db = await getDB()
    const { name, year } = request.body;
    const { artistId } = request.params;
    const Artistid = Number(artistId);
    
    try { 
        await db.query(`INSERT INTO Album (name, year, Artistid) VALUES (?,?,?)`, [
            name,
            year,
            Artistid
        ])
        response.sendStatus(201)}
    
    catch(err) {
        
        response.sendStatus(500).json(err)
    }
    db.close()
}

