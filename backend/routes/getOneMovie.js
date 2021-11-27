var express = require('express');
var router = express.Router();
const axios = require('axios')


/* GET movie listing. */
router.get('/:id',async function(req, res, next) {
    let movieDetails=await axios.get(`https://www.omdbapi.com/?apikey=`+process.env.APIKEY+`&i=`+req.params.id)
    if(movieDetails.data.Response==="True")
        res.send(movieDetails.data)
  });

module.exports = router;
