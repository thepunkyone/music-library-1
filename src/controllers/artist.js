const { response, request } = require('express');
const getDB = require('../services/db')



exports.create = async (request, response) => {
    const db = await getDB();
    const { name, genre } = request.body;
    try {
    await db.query (`INSERT INTO Artist (name,genre) 
    VALUES(? , ?)`, [
        name,
        genre
    ]);
    response.sendStatus(201)}
   
    catch (err) {
       response.sendStatus(500).json(err)
    }


    db.close()
}


exports.read = async(_, response) => {
    const db = await getDB();
    try {
    const [artists] =  await db.query(`SELECT * FROM Artist` )
    response.status(200).json(artists)}
    
    catch (err) {
    response.status(500).json(err)
}
    db.close()
};

exports.readById = async (req, res) => {
    const db = await getDB();
    const { artistId } = req.params;
  
    const [[artist]] = await db.query('SELECT * FROM Artist WHERE id = ?', [
      artistId,
    ]);
  
    if (!artist) {
        res.sendStatus(404);
    } else {
        res.status(200).json(artist);
    }
  
    db.close();
  };

  exports.update = async (req, res) => {
    const db = await getDB();
    const data = req.body;
    const { artistId } = req.params;
  
    try {
      const [
        { affectedRows },
      ] = await db.query('UPDATE Artist SET ? WHERE id = ?', [data, artistId]);
  
      if (!affectedRows) {
        res.sendStatus(404);
      } else {
        res.status(200).send();
      }
    } catch (err) {
      res.sendStatus(500);
    }
  
    db.close();
  };

  exports.delete = async (req, res) => {
      const db = await getDB();
      const { artistId } = req.params;
try{ 
    const [{removeRow},] = await db.query('DELETE FROM Artist WHERE id = ?', [
              artistId,
          ]);
          if (!removeRow) {
            res.sendStatus(404);
          } else {
            res.status(200).send();
          }
        } 
catch (err) {
          res.sendStatus(500);
        }
      
        db.close();
      };
