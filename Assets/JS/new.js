// DOM targeting for content injection


// Metropolitan Museum API
var metUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search";
var metObjUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
var metImg = "?primaryImage";
var imgCheck = "?hasimages=true";

// Harvard Museum API
var hAPI = "97a4196b-d37b-433b-bd93-476d81c28e29"
var harvardKey = "&apikey=" + hAPI;
var harvardUrl = "https://api.harvardartmuseums.org/object?q=hasimage=1"
var medium = "&medium=wood"

// Colour Lovers API
var clUrl = "http://www.colourlovers.com/api/patterns/";

// Rachel please update to include arrays for all your colour schemes //
var dustySunset = ["e5834d", "eca265", "fff4e7", "ea8ea1", "d6646f"]; // These are the hexadecimal codes without the # symbol
var weirdos = [1,2,3,4,5];
// var nextColorOption = [];

var clHEX = [
    dustySunset, 
    "weirdos"
    // all the others
];

// ?? Not sure we need this
var clHexID = [0, 1];



// Colours API //

function colorApiInjection () {
    // Slice is only there due to less inputs on test html, can amend
    data.slice(0,3).map(function(item, index) { // Map creates a concurrent loop
        injections[index].setAttribute('src', item.imageUrl.replace('http', 'https'))
        // injections refers to an array with the target divs
    }) 
}

function colorApiSearch () {
    fetch(clUrl + "e5834d" + "?format=json")
        .then(function (response) { return response.json() })
        .then(colorApiInjection(data))
}

// Harvard API //

function harvardSearch () { 

    fetch(harvardUrl+harvardKey)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            img1.setAttribute('src', data.records[0].primaryimageurl);
            //img1 refers to the target div
        })
}

// Metropolitan API //

function randomResult (objectIDs) {
    var i = Math.floor(Math.random() * objectIDs.length);   // Pick a random item from the valid results array
    divINJ.setAttribute('src', metObjUrl + objectIDs[i]);   // Apply the random image to a div
}   //divINJ refers to the target div

function metSearch () {
    fetch(metUrl + imgCheck)
        .then(function (response) { return response.json(); })
        .then(randomResult(data.objectIDs));
}