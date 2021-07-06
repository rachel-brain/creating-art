// DOM targeting for content injection
var testbench = document.getElementById('contentINJ');
var userQuery = document.getElementById('userQuery');
var button = document.getElementById('goBtn');

// Metropolitan Museum API
var metUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search";
var metObjUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
var metImg = "?primaryImage";
var imgCheck = "?hasimages=true";

// Colour Lovers API
var clUrl = "http://www.colourlovers.com/api/patterns/";

var dustySunset = ["e5834d", "eca265", "fff4e7", "ea8ea1", "d6646f" ];

var clHEX = [
    dustySunset, 
    "weirdos"
];
var clHexID = [0, 1];


// Write to DOM
function randomResult (objectIDs) {
    var i = Math.floor(Math.random() * objectIDs.length);   // Pick a random item from the valid results array

    // testbench.innerHTML = objectIDs[i];

    url = metObjUrl + objectIDs[i];
    imgReturn(url, metImg);
}

var pictureINJ = document.getElementsByClassName('div5');
var col1 = document.getElementById('col1');
var col2 = document.getElementById('col2');
var col3 = document.getElementById('col3');
var injections = [col1, col2, col3]

function search () {
    fetch("http://www.colourlovers.com/api/patterns/e5834d?format=json")
    .then(function (response) { return response.json() })
    .then(function (data) {
        var fixedData = data.map(function(item) {
            return {
                image: item.imageUrl.replace('http', 'https')
            }
        });
        for (i=1;i<4;i++) {
            injections[i].setAttribute('src', item.i.image);
        }
        console.log(fixedData);
})
}

// Image Retrieval function
function imgReturn (url) {   // Pass in variables

    fetch(url, {
        method: 'GET',
        // mode: 'no-cors',
    })
    .then(function (response) {             // Take response and parse it with JSON
        return response.json();
    })
    .then(function (data) {                 // Display primary image result
        console.log(data);
        // testbench.innerHTML += "<img src=" + data.imageURL + "></img>"; 
    })
}

// // Eventlistener for button press
// button.addEventListener("click", function(event) {
//     event.preventDefault();                         // Anonymous function to prevent form reset

//     var query = userQuery.value;                    // Update user input variable
//     newSearch(metUrl, imgCheck, '&q=' + query);     // Perform a new serach with the chosen paramaters
// })

// Eventlistener for button press
button.addEventListener("click", function(event) {
    event.preventDefault();                         // Anonymous function to prevent form reset

    search();     // Perform a new serach with the chosen paramaters clUrl, dustySunset[0], "?format=json"
})