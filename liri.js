require("dotenv").config();
var keys = require("./keys.js");
var request = require('request')
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var item3 = process.argv;
var totalInput = "";

// var movie= process.argv[2];
//only works after "npm install request" command is entered
// in the same directory as this file in the terminal



for (var i = 3; i < item3.length; i++) {
  totalInput = totalInput + " " + item3[i];
}
//console.log(totalInput)

//put + in blank spaces for movie title
//.split then .join


var split = totalInput.split(" ")
if (item3[3] === undefined && action === "movie-this") {

  split.push("Mr. Nobody")
  //console.log(split)
}
  //console.log(item3[3])
 //console.log(split)

function movieCall() {
  request("http://www.omdbapi.com/?t=" + split + "&apikey=trilogy&", function (error, response, body) {

    if (!error && response.statusCode === 200) {
      //in case you need to view the body
      //console.log((JSON.parse(body)))
      console.log("Title: " + (JSON.parse(body).Title)) //Title of the movie. done
      console.log("Released: " + (JSON.parse(body).Released))//* Year the movie came out. done
      console.log("IMBD Rating: " + (JSON.parse(body).imdbRating)) //* IMDB Rating of the movie.done
      console.log((JSON.parse(body).Ratings[1]))// Rotten Tomatoes Rating of the movie. almost
      console.log("Country: " + (JSON.parse(body).Country))//* Country where the movie was produced.
      console.log("Languages: " + (JSON.parse(body).Language))// * Language of the movie.
      console.log("Plot: " + (JSON.parse(body).Plot))// * Plot of the movie.
      console.log("Actors: " + (JSON.parse(body).Actors)) //* Actors in the movie.

    }
  });

  var logTxt = action + split;
//console.log(logTxt)
fs.writeFile("random.txt", logTxt, function (err) {
  if (err) throw err;
});
}


function twitterCall() {
  var params = { screen_name: 'borzo6699' };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {

      for (var i = 0; i < 20; i++) {
        var lastTwenty = tweets[i].text + " Created at: " + tweets[i].created_at;
        console.log(lastTwenty)
      }

    }

  });
  var logTxt = action + split;
//console.log(logTxt)
fs.writeFile("random.txt", logTxt, function (err) {
  if (err) throw err;
});
};

//start spotify
//"%20"to add empy spaces ina string  + does not work


if (item3[3] === undefined && action === "spotify-this-song") {

  split.push("The%20Sign%20Ace%20of%20Base")
  //console.log(split)
};

function spotifyCall() {    //split needs to be after query like:    query: split for it to work on the regular  function call
  spotify.search({ type: 'track', query: split }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    };

    console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
    console.log("Title: " + data.tracks.items[0].name);
    console.log("A preview link: " + data.tracks.items[0].preview_url);
    console.log("Album: " + data.tracks.items[0].album.name);

  });
  var logTxt = action + split;
  //console.log(logTxt)
  fs.writeFile("random.txt", logTxt, function (err) {
    if (err) throw err;
  });
}


// *********************** Do-What-It-Says **************************
// Read random.txt file and use the data to perform an action 
// function doIt() {
//   fs.readFile("random.txt", "utf8", function (err, data) {
//       if (err) {
//           var logDoIt = ("\n************************** Do-What-It-Says *****************************\nThere was a problem reading the random.txt file. Please try again.\n********************************************************************************");
//           return console.log(logDoIt);
//           fs.appendFile("log.txt", logDoIt, function (err) {
//               if (err) {
//                   return console.log("do-what-it-says data was not appended to the log.txt file.");
//               };
//           });
//       };

//       var output = data.split(",");
//       action = output[0];
//       process.argv[3] = output[1];
//       title = process.argv[3];

//       if (action === 'spotify-this-song') {
//           spotifyTitle();
//       };
//   });


function doWhatItSays(){

  fs.readFile("random.txt", "utf8", function(error, data) {

    //console.log(data);
    var output = data.split(",");
      action = output[0];
      process.argv[3] = output[1];
      split = process.argv[3];
      //console.log(action)

      if (action === 'spotify-this-song') {
          spotifyCall();
          var logTxt = action + split;
          //console.log(logTxt)
          fs.writeFile("random.txt", logTxt, function (err) {
            if (err) throw err;
          });
      }
      if(action === 'movie-this'){
        movieCall();
        var logTxt = action + split;
        //console.log(logTxt)
        fs.writeFile("random.txt", logTxt, function (err) {
          if (err) throw err;
        });
      }
      if(action === 'my-tweets'){
        twitterCall();
        var logTxt = action + split;
        //console.log(logTxt)
        fs.writeFile("random.txt", logTxt, function (err) {
          if (err) throw err;
        });
      }
  });
}

// var logTxt = action + split;
// //console.log(logTxt)
// fs.writeFile("random.txt", logTxt, function (err) {
//   if (err) throw err;
// });

// The switch-case will direct which function gets run.
switch (action) {
  case "my-tweets":
    twitterCall();
    break;

  case "movie-this":
    movieCall();
    break;

  case "spotify-this-song":
    spotifyCall();
    break;

    case "do-what-it-says":
    doWhatItSays();
    break;
}