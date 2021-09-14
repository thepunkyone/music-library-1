const getDB = require('../services/db')

exports.create = async (request, response) => {
    const db = await getDB()
    const { name, year } = request.body;
    const { artistId } = request.params;
    console.log(artistId)
    console.log(request.body)
    const Artistid = Number(artistId);
    console.log(Artistid)
    try { 
        await db.query(`INSERT INTO Album (name, year, Artistid) VALUES (?,?,?)`, [
            name,
            year,
            Artistid
        ])
        response.sendStatus(201)}
    
    catch(err) {
        console.log(err)
        response.sendStatus(500).json(err)
    }
    db.close()
}