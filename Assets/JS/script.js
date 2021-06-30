// DOM targeting for content injection
var testbench = document.getElementById('contentINJ');
var userQuery = document.getElementById('userQuery');
var button = document.getElementById('goBtn');

// Metropolitan Meseum API
var metUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search";
var metObjUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"
var metImg = "?primaryImage";
var imgCheck = "?hasimages=true";

// Write to DOM
function randomResult (objectIDs) {
    var i = Math.floor(Math.random() * objectIDs.length);   // Pick a random item from the valid results array

    // testbench.innerHTML = objectIDs[i];

    url = metObjUrl + objectIDs[i];
    imgReturn(url, metImg);
}

// Core search function
function newSearch (url, param1, query) {   // Pass in variables

    fetch(url + param1 + query, {
        method: 'GET',
        // mode: 'no-cors',
    })
    .then(function (response) {             // Take response and parse it with JSON
        return response.json();
    })
    .then(function (data) {                 // Pull array of object ID's meeting criteria
        console.log(data, data.objectIDs);
        // testbench.innerHTML = data.objectIDs;   // Write returned values to the DOM
        randomResult(data.objectIDs);
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
        testbench.innerHTML += "<img src=" + data.primaryImage + "></img>"; 
    })
}

// Eventlistener for button press
button.addEventListener("click", function(event) {
    event.preventDefault();                         // Anonymous function to prevent form reset

    var query = userQuery.value;                    // Update user input variable
    newSearch(metUrl, imgCheck, '&q=' + query);     // Perform a new serach with the chosen paramaters
})