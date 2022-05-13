const express = require('express');
const router = express.Router();
const pool = require('../database');

router
  .get('/', async (req, res) => {
    try {
      //get the last ten items of the database
      const itemsArray = await pool.query(
        'SELECT * FROM searches ORDER BY search_id DESC LIMIT 10'
      );

      // console.log(itemsArray.rows);

      //send to client
      return res.status(200).json(itemsArray.rows);
    } catch (error) {
      console.error('Exception ' + error);
    }
  })
  .post('/', async (req, res) => {
    try {
      //get req.body from client, looks like {searchedTerm: "location"}
      const { searchedTerm } = req.body;

      //lets get the time too
      // const curTime = new Date();
      // console.log(
      //   new Intl.DateTimeFormat('en-US', {
      //     month: 'numeric',
      //     day: 'numeric',
      //     hour: 'numeric',
      //     minute: 'numeric',
      //   }).format(curTime)
      // );
      const curTime = Date.now().toString();

      //enter data into database
      const newEntry = await pool.query(
        'INSERT INTO searches (search_term, exact_time) VALUES ($1, $2)',
        [searchedTerm, curTime]
      );

      //tell client it worked i guess
      return res.status(200).json(true);
    } catch (error) {
      console.error('Exception ' + error);
    }
  });

module.exports = router;
