var express = require('express');
var router = express.Router();
const axios = require('axios')


/* GET movie listing. */
router.get('/:text/:page',async function(req, res, next) {
  let movieDesc
  let moviesReq=await axios.get('https://www.omdbapi.com/?apikey=' + process.env.APIKEY + "&s="+req.params.text + "&page=" +req.params.page)
  if(moviesReq.data.Response==="True"){
      for(let i=0;i<moviesReq.data.Search.length;i++){
        movieDesc=await axios.get(`https://www.omdbapi.com/?apikey=`+process.env.APIKEY+`&i=`+moviesReq.data.Search[i].imdbID)
        Object.assign(moviesReq.data.Search[i], {"imdbRating": movieDesc.data.imdbRating},{"Plot":movieDesc.data.Plot})
      }
      Object.assign(moviesReq.data,{page:Number(req.params.page)},{searchInput:req.params.text})
      res.send(moviesReq.data)
  }
  });

module.exports = router;
