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

// ?? Not sure we need this
var clHexID = [0, 1];


// Write to DOM
function randomResult(objectIDs) {
    var i = Math.floor(Math.random() * objectIDs.length); // Pick a random item from the valid results array

    // testbench.innerHTML = objectIDs[i];

    url = metObjUrl + objectIDs[i];
    imgReturn(url, metImg);
}

var pictureINJ = document.getElementsByClassName('div5');
var col1 = document.getElementById('col1');
var col2 = document.getElementById('col2');
var col3 = document.getElementById('col3');
var injections = [col1, col2, col3]

function search() {
    fetch("http://www.colourlovers.com/api/patterns/e5834d?format=json")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var fixedData = data.map(function (item) {
                return {
                    image: item.imageUrl.replace('http', 'https')
                }
            });
            for (i = 1; i < 4; i++) {
                injections[i].setAttribute('src', item.i.image);
            }
            console.log(fixedData);
        })
}

// Image Retrieval function
function imgReturn(url) { // Pass in variables

    fetch(url, {
            method: 'GET',
            // mode: 'no-cors',
        })
        .then(function (response) { // Take response and parse it with JSON
            return response.json();
        })
        .then(function (data) { // Display primary image result
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
button.addEventListener("click", function (event) {
    event.preventDefault(); // Anonymous function to prevent form reset

    search(); // Perform a new serach with the chosen paramaters clUrl, dustySunset[0], "?format=json"
})



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