var express = require('express');
var router = express.Router();
var nodeMovieOjb = require('node-movie');
var Movie = require('../models/movie');

router.route("/movies")

/* GET movies listing. */
.get(function(req, res) {
  Movie.find(function(err, allMovies){
    res.send(allMovies);
  });
})

//post movies in database
.post(function(req, res) {
  console.log(req.body.Title);
 nodeMovieOjb(req.body.Title, function (err, data) {
    if(data)
    {
      var movie = new Movie(data);
      /*movie.Title = data.Title;
      movie.Year =  data.Year;
      movie.Rated = data.Rated;
      movie.Released = data.Released;
      movie.Runtime = data.Runtime;
      movie.Genre = data.Genre;
      movie.Director = data.Director;
      movie.Writer = data.Writer;
      movie.Actors = data.Actors;
      movie.Plot = data.Plot;
      movie.Language = data.Language;
      movie.Country = data.Country;
      movie.Awards = data.Awards;
      movie.Poster = data.Poster;
      movie.Metascore = data.Metascore;
      movie.imdbRating = data.imdbRating;
      movie.imdbVotes = data.imdbVotes;
      movie.imdbID = data.imdbID;
      movie.Type = data.Type;
      movie.Response = data.Response;*/
      movie.save(function(err){
      if(err)
      {
        res.send(err);
      }
      else
      {
        res.send("Movie inserted");
      }

      });

    }
    else
    {
      res.send("Movie not found");
    }

  });

});

router.route('/movies/:movie_id')

.get(function(req, res){
  Movie.findById(req.params.movie_id, function(err, moviebyid){
  if(err)
  {
    res.send(err);
  }
  else
  {
    res.send(moviebyid);
  }
  });
})

.put(function(req, res){
  Movie.findById(req.params.movie_id, function(err, updateMovieById){
  if(err)
  {
    res.send(err);
  }
  else
  {
    var title = req.body.Title;
    updateMovieById.Title = title
    updateMovieById.save(function(err){
      if(err)
      {
        res.send(err);
      }
      else
      {
        res.send("movie updated")
      }

    });
  }
  });
})

.delete(function(req, res){
  Movie.remove({_id: req.params.movie_id}, function(err, deletedMovieById){
    res.send("Movie deleted");

  });
});

module.exports = router;
