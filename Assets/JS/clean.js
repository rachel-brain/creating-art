// DOM targeting for content injection //

// Row 1
var big1 = document.getElementById('big1');

var small1 = document.getElementById('small1');
var small2 = document.getElementById('small2');
var small3 = document.getElementById('small3');
var small4 = document.getElementById('small4');

// Row 2
var small5 = document.getElementById('small5');
var small6 = document.getElementById('small6');
var small7 = document.getElementById('small7');
var small8 = document.getElementById('small8');

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
var imgCheck = "&hasImages=true";

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
                localStorage.setItem('harvardTarget', JSON.stringify(data));    // Store full api object 
        }
    )}
}

// Metropolitan API //

// function randomResult (data) {
//     var url = data.objectIDs
//         metTarget.forEach(function (target, i) {
//             var j = Math.floor(Math.random() * url.length);
//             fetch(metObjUrl + url[j])
//                 .then(function (response) { return response.json(); })
//                 .then(function (data) { 
//                     console.log(i);
//                     metTarget[i].setAttribute('src', data.primaryImage); });
//         })

//     }

// function metSearch () {
//     fetch(metUrl + "?q=sunflowers" + imgCheck)
//         .then(function (response) { return response.json(); })
//         .then(function (data) {
//             randomResult(data);
//         });
// }

function harvardSearch () {
    fetch(harvardUrl + harvardKey)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            var dataValidate = data.records[2].primaryimageurl;   // so far the API call is static, we need to make it dynamic, so it chooses random pictures every single time
            big1.setAttribute("src", dataValidate);
            localStorage.setItem('harvardTarget', JSON.stringify(data));    // Store full api object 
        })
}

// Metropolitan API //
// CORS access issue from localhost but should function

// function randomResult (objectIDs) {
//     for ( i = 0; i < metTarget.length; i++ ) {                    // Loop the targets for the Met API
//     var j = Math.floor(Math.random() * objectIDs.length);         // Pick a random item from the valid results array
//     console.log(metObjUrl + objectIDs[j]);
//     metTarget[i].setAttribute('src', metObjUrl + objectIDs[j]);   // Apply the random image from the valid results array to each div
//     }
// }   

// function metSearch () {
//     fetch(metUrl + imgCheck)
//         .then(function (response) { return response.json(); })
//         .then(randomResult(data.objectIDs));
// }

// first API call that resolves Name searches (such as sunflowers) and finds all relevant Met Museum ObjectIDs
function metSearch () {
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers" + imgCheck) // static at the moment, needs to adjust "q="
        .then(function (response) { return response.json(); })
        .then(function (data) {
            randomResult(data.objectIDs);
        })
}

//selects a random ObjectID from the array of ObjectIDs
function randomResult (objectIDs) {
    for ( i = 0; i < metTarget.length; i++ ) {
        var j = Math.floor(Math.random() * objectIDs.length);

        metObjSearch(j);

    }
}

// 2nd API call that gets all the details of the Object ID, including image
function metObjSearch (objectID) {
    var URL = metObjUrl + objectID.toString();
    fetch(URL)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            console.log(data);
            var dataValidate = data.primaryImageSmall;
            big2.setAttribute("src", dataValidate);
            localStorage.setItem('metTarget', JSON.stringify(data));    // Store full api object 
        })
}

// Colours API //
// CORS access issue from localhost but should function

// function colorApiInjection () {
//     // Slice is only there due to less inputs on test html, can amend
//     data.map(function(item, index) { // Map creates a concurrent loop
//         colorsTarget[index].setAttribute('src', item.imageUrl.replace('http', 'https'))
//         // injections refers to an array with the target divs
//     }) 
// }

// function colorApiSearch () {
//     fetch(clUrl + clHEX[0][0] + "?format=json")
//         .then(function (response) { return response.json() })
//         .then(colorApiInjection(data))
// }

// OFFLINE Colours API //
function colorApiInjection () {
    colData.map(function(item, index) { // Map creates a concurrent loop
        for ( i = 0; i < colorsTarget.length; i++ ) {
            colorsTarget[i].setAttribute('src', item.imageUrl.replace('http', 'https'))
            localStorage.setItem('colorsTarget' + i, JSON.stringify(item));    // Store full api object 
        }
    }) 
}

// Page3
function chosen(name) {
    var object = localStorage.getItem(name);
    localStorage.setItem('focusImage', object)
    window.location.replace('./page3.html');
}


function init () {
    harvardSearch();
    metSearch();
    colorApiInjection();
    // colorApiSearch();
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




// function randomResult (data) {
//     var url = data.objectIDs
//     for ( i = 0; i < metTarget.length; i++ ) {                    // Loop the targets for the Met API
//     var j = Math.floor(Math.random() * url.length);         // Pick a random item from the valid results array
//     var newUrl = metObjUrl + url[j];
//     metSearch2(newUrl);
//     }
// }   

// function metSearch2 (newUrl) {
//     fetch(newUrl)
//         .then(function (response) { return response.json(); })
//         .then(function (data) {
//             for ( i = 0; i < metTarget.length; i++ ) {
//                 metTarget[i].setAttribute('src', data.primaryImage);
//             }
//         });
// }