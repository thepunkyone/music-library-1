const getDB = require('../services/db')

exports.create = async (request, response) => {
    const db = await getDB()
    const { name, year } = request.body;
    const { artistId } = request.params;
    const id = Number(artistId); // always use camelCase for variables in JavaScript, giving the new variable a different name
                                // is less confusing to the reader of code than changing case to come up with a new name

    try {
        await db.query(`INSERT INTO Album (name, year, Artistid) VALUES (?,?,?)`, [
            name,
            year,
            id
        ])
        response.sendStatus(201)}

    catch(err) {

        response.sendStatus(500).json(err)
    }
    db.close()
}

