// DOM targeting for content injection

// Row 1
var big1 = document.getElementById('big1');

var small1 = document.getElementById('small2');
var small2 = document.getElementById('small3');
var small3 = document.getElementById('small4');
var small4 = document.getElementById('small5');

// Row 2
var small5 = document.getElementById('small6');
var small6 = document.getElementById('small7');
var small7 = document.getElementById('small8');
var small8 = document.getElementById('small9');

var big2 = document.getElementById('big2');

// Row 3

// API Arrays
var harvardTarget = [big1];
var metTarget = [big2];
var colorsTarget = [
    small1, small2, small3, small4, 
    small5, small6, small7, small8
];

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

// Arrays for 8 colour schemes
var dustySunset = ["e5834d", "eca265", "fff4e7", "ea8ea1", "d6646f"];
var weirdos = ["ac6ab9", "69b00b", "b00b69", "696969", "ab69ba"];
var summerHarmony = ["00334d", "d82929", "fb8100", "ffc14a", "ece4c0"];
var deepSeaBaby = ["77d9d9", "77c5d9", "77b2d9", "779ed9", "778bd9"];
var legacyOfFire = ["f8e6bd", "ffcf00", "f37852", "f93900", "5c2604"];
var lostRiver = ["133412", "dac1c3", "497529", "5f9422", "7d8078"];
var othelloCostumes = ["328bc1", "c74e4e", "ffdb6c", "7cd47d", "9c6464"];
var hubitatDashboards = ["f5f5f5", "0000ff", "ff0000", "077909", "e6e600"];

var clHEX = [
    dustySunset,
    weirdos,
    summerHarmony,
    deepSeaBaby,
    legacyOfFire,
    lostRiver,
    othelloCostumes,
    hubitatDashboards
];

// Harvard API //
// Current hard targets one div (will fix)

function harvardSearch () { 
    for ( i=0; i < harvardTarget.length; i++ ) {
    fetch(harvardUrl+harvardKey)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            var dataValidate = data.records[0].primaryimageurl
            console.log(dataValidate);
            if (dataValidate == undefined) {
                harvardSearch();
            } else
                harvardTarget[0].setAttribute('src', data.records[0].primaryimageurl);
        }
    )}
}

// Metropolitan API //
// CORS access issue from localhost but should function

function randomResult (objectIDs) {
    for ( i = 0; i < metTarget.length; i++ ) {                    // Loop the targets for the Met API
    var j = Math.floor(Math.random() * objectIDs.length);         // Pick a random item from the valid results array
    metTarget[i].setAttribute('src', metObjUrl + objectIDs[j]);   // Apply the random image from the valid results array to each div
    }
}   

function metSearch () {
    fetch(metUrl + imgCheck)
        .then(function (response) { return response.json(); })
        .then(randomResult(data.objectIDs));
}

// Colours API //
// CORS access issue from localhost but should function

function colorApiInjection () {
    // Slice is only there due to less inputs on test html, can amend
    data.map(function(item, index) { // Map creates a concurrent loop
        colorsTarget[index].setAttribute('src', item.imageUrl.replace('http', 'https'))
        // injections refers to an array with the target divs
    }) 
}

function colorApiSearch () {
    fetch(clUrl + clHEX[0][0] + "?format=json")
        .then(function (response) { return response.json() })
        .then(colorApiInjection(data))
}



function init () {
    harvardSearch();
    metSearch();
    colorApiSearch();
}

init();
















// TODO:
// HARVARD ART MUSEUMS API data call for page 3
// Artist name:
// records[0].people[0].name // eg. Honoré-Victorin Daumier or Lyonel Feininger

// Artist nationality:
// records[0].people[0].culture // eg. French or American

// Title:
// records[0].title // eg. Pickhardt Vol. IV: Charivari Lithographs by Daumier or Untitled

// Circa:
// records[0].dated // eg.1848 or 1940s-1950s

// Technique:
// records[0].technique // eg. Lithograph or Slide, 35 mm, black and white

// About: Nothing?  May need to remove this section ...
// ?????

// Image:
// records[0].images[0].baseimageurl
// records[0].images[0].width // eg. 774
// records[0].images[0].height // eg. 1024
// Or ...
// records[0].primaryimageurl



// TODO:
// MET MUSEUM API data call for page 3
// Artist name:
// artistDisplayName // eg. Kiyohara Yukinobu

// Artist nationality:
// artistNationality // eg. Japanese

// Title:
// title // eg. Quail and Millet

// Circa:
// objectDate // eg. late 17th century

// Technique:
// medium // eg. Hanging scroll; ink and color on silk

// About: Nothing?  May need to remove this section ...
// ?????

// Image:
// primaryImage