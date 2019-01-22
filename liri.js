var dotenv = require("dotenv").config();
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");


var arg2 = process.argv[2];
var search = "";

for (var i = 3; i < process.argv.length; i++) {
    search += process.argv[i] + "";
};

            if (arg2 = "spotify-song") {
                searchSpotify(search)
            } else if (arg2 = "concert-this") {
                concert(search)
            } else if (arg2 = "movie-this") {
                searchmovie(search)
            } else if (arg2 = "do-what-it-says") {
                randomSearch(search)
            } else if (arg2 = "") {
                console.log("You entered an invalid command. Please try one of the following commands");
            };

function searchSpotify(search) {
    
    if (search == "") {
        search = "The Sign Ace of Base";
    }
    
    let spotify = new Spotify(keys.spotify);
    
    spotify.search({
        type: "track",
        query: search,
        limit: 2
    }, function (err, response) {
        
        fs.appendFile("log.txt", "Spotify Log Entry Start Processed on:" + Date() +  "Terminal commands:" + process.argv);
        
        let songResp = response.tracks.items;
        
        for (var i = 0; i < songResp.length; i++) {
            console.log("Spotify Search Result");
            console.log(("Artist: " + songResp[i].artists[0].name));
            console.log(("Song title: " + songResp[i].name));
            console.log(("Album name: " + songResp[i].album.name));
            console.log(("Preview link: " + songResp[i].preview_url));
            console.log("End of Search Result");
            // didnt know what to console log so I used a refrence
            fs.appendFile("Result " + "Artist: " + songResp[i].artists[0].name + "Song title: " + songResp[i].name + "Album name: " + songResp[i].album.name + "URL Preview: " + songResp[i].preview_url );
        }
        fs.appendFile("log.txt", "Spotify Log Entry End");
    })
};



function concert(search) {
    let bands = keys.bands;
    
    if (search == "") {
        search = "ColdPlay";
    }
    
    let queryUrl = "https://rest.bandsintown.com/artists/" + search.trim() + "/events?app_id=" + bands + "&date=upcoming";
    
    request(queryUrl, function (err, response, body) {
        
        fs.appendFile("log.txt", "Concert Log Entry Start Processed on: \n" + Date() + "" + "Terminal commands:\n" + process.argv + "");
        
        if (JSON.parse(body).Error == "No upcoming concerts for " + search) {
            
            console.log("\nNo results found for " + search + ". Please try another artist.")
            
            fs.appendFile("log.txt", "No results found for " + search + ". Please try another artist.Concert Log Entry End");
            
        } else {
            console.log("Artist Name: " + search);
            console.log("Venue Name: " + concertBody[0].venue.name);
            fs.appendFile("log.txt", "Artist Name: " + search + "Venue Name: " + concertBody[0].venue.name + "Venue Location: " + concertBody[0].venue.city + ", " + concertBody[0].venue + "Concert Log Entry End");
            
        };
    });
};

function randomSearch() {
    
    fs.readFile("random.txt", "utf8", function (err, data) {
        
        var randomArray = data.split(",");
        
        if (randomArray[0] == "spotify-song") {
            searchSpotify(randomArray[1]);
        } else if (randomArray[0] == "movie-this") {
            searchMovie(randomArray[1]);
        }
    });
};