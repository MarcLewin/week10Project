require("dotenv").config();
var keys = require("./keys.js");




  var request = require('request')
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
  var client = new Twitter(keys.twitter);

//var movie = "";

var action = process.argv[2];
var item3 = process.argv;
var totalInput = "";

// var movie= process.argv[2];
//only works after "npm install request" command is entered
// in the same directory as this file in the terminal
// if (item3 === " " && action === "movie-this") {
//   item3 += "Mr. Nobody"
// }


for(var i =3; i<item3.length;  i++ ){
totalInput= totalInput + " " + item3[i];
}
//console.log(totalInput)

//put + in blank spaces for movie title
//.split then .join


function movieCall() {
  request("http://www.omdbapi.com/?t=" + "mr." +"+nobody" + "&apikey=trilogy&", function (error, response, body) {

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
}

//start twitter calls!!!!!!!!!!!!!!!!!!!
// TWITTER_CONSUMER_KEY=wS6EUkLuUrKQljRbw7eyhzd32
// TWITTER_CONSUMER_SECRET=Ln98b9fbzhxmsaOkhtXpFPzi5SUglRuhtOB0t2SJqtnwk0mpJx
// TWITTER_ACCESS_TOKEN_KEY=260717376-POOf9tjvTKfFHV3yrLdrXKhJe31xvCMsHvbTjb8A
// TWITTER_ACCESS_TOKEN_SECRET=IHXFBn9a7PMbPGvyMvhMAysRGWc7vnb11JGHQ8Dl4LRTY



// var client = new Twitter({
//   consumer_key: 'wS6EUkLuUrKQljRbw7eyhzd32',
//   consumer_secret: 'Ln98b9fbzhxmsaOkhtXpFPzi5SUglRuhtOB0t2SJqtnwk0mpJx',
//   access_token_key: '260717376-POOf9tjvTKfFHV3yrLdrXKhJe31xvCMsHvbTjb8A',
//   access_token_secret: 'IHXFBn9a7PMbPGvyMvhMAysRGWc7vnb11JGHQ8Dl4LRTY'
// });
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
};

//start spotify
//"%20"to add empy spaces ina string  + does not work

// var spotify = new Spotify({
//   id: "88fc858dfea84f33b264f33ad3d44d13",
//   secret: "891100a230b849c590bb90ba90c387f0"
// });
function spotifyCall() {
  spotify.search({ type: 'track', query: totalInput }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
    console.log("Title: " + data.tracks.items[0].name);
    console.log("A preview link: " + data.tracks.items[0].preview_url);
    console.log("Album: " + data.tracks.items[0].album.name);

  });
}


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
}