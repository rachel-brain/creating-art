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

var aEl = document.querySelector(".a");
var dEl = document.querySelector(".d");
var eEl = document.querySelector(".e");
var fEl = document.querySelector(".f");
var eventEl = document.querySelector("#event");
// API Arrays
var harvardTarget = [big1];
var metTarget = [big2];
var colorsTarget = [
    small1, small2, small3, small4, 
    small5, small6, small7, small8
];
var smallGroup1 = [small1, small2, small3, small4];
var smallGroup2 = [small5, small6, small7, small8];

// Metropolitan Museum API
var metUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=";
var metObjUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
var metImg = "?primaryImage";
var imgCheck = "&hasImages=true";
var metQueries = localStorage.getItem('metChecks'); 

// Harvard Museum API
var harvardKey = "&apikey=97a4196b-d37b-433b-bd93-476d81c28e29"
var harvardUrl = "https://api.harvardartmuseums.org/object?q="
var hasImage = "&hasimage=1&size=30"
var harvardQueries = localStorage.getItem('harvardChecks').replace("_", "+");

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

var colorSelected = localStorage.getItem('color');

//Page 3 variable
var previousImages = [];

var clHEX = [
    {name: "dusty-sunset", value: dustySunset},
    {name: "weirdos", value: weirdos},
    {name: "summer-harmony", value: summerHarmony},
    {name: "deep-sea-baby", value: deepSeaBaby},
    {name: "legacy-of-fire", value: legacyOfFire},
    {name: "lost-river", value: lostRiver},
    {name: "ot-hello-costumes", value: othelloCostumes},
    {name: "hubitat-dashboards", value: hubitatDashboards}
];


// Harvard API //
function harvardSearch (element) {
    var name = element.id;

    fetch(harvardUrl + harvardQueries + harvardKey + hasImage)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            var j = randomiseHarvardResult(data)
            var dataValidate = data.records[j].primaryimageurl;   
            if (dataValidate === null ) {                                   // if randomised object has no image, it restarts the API call.
                harvardSearch()
            } else {
                element.setAttribute("src", dataValidate);
            }
            localStorage.setItem(name, JSON.stringify(data.records[j]));    // Store full api object 
        })
}

function randomiseHarvardResult (data) {                                    // random object function chooser
    var j = Math.floor(Math.random() * data.records.length);
    return j;
}

// Metropolitan API //
// first API call that resolves Name searches (such as sunflowers) and finds all relevant Met Museum ObjectIDs
function metSearch (element) {
    fetch(metUrl + metQueries + imgCheck) 
        .then(function (response) { return response.json(); })
        .then(function (data) {
            
            function randomResult (objectIDs, element, data) {
                    var j = Math.floor(Math.random() * objectIDs.length);
                    
                    metObjSearch(data.objectIDs[j], element);    
            }
            randomResult(data.objectIDs, element, data);
        })
}

// 2nd API call that gets all the details of the Object ID, including image
function metObjSearch (objectID, element) {
    var name = element.id;
    var URL = metObjUrl + objectID.toString();
    fetch(URL)
        .then(function (response) {
            if (response.status === 404) {                              //some objects return 404. this restarts the API call.
                metSearch(element);
            } else {
                return response.json();
            }        
        })
        .then(function (data) {
            var dataValidate = data.primaryImageSmall;

            if (dataValidate === "") {                                  // if randomised object has no image, it restarts the API call.
                metSearch(element);
            } else if (dataValidate === undefined) {
                metSearch(element);
            } else {
                element.setAttribute("src", dataValidate);
            }
            localStorage.setItem(name, JSON.stringify(data));    // Store full api object 
        })
    }

// Colours API //
function getColor(data) {
    return data.name === colorSelected;
}

// OFFLINE Colours API //
function colorApiInjection () {
    colData.map(function(item, index) { // Map creates a concurrent loop
        for ( i = 0; i < colorsTarget.length; i++ ) {
            colorsTarget[i].setAttribute('src', item.imageUrl.replace('http', 'https'))
        }
    }) 
}

function saveToLocalStorage(event) {
  //Get previously searched images and store in a variable
  var previousImages = JSON.parse(
    localStorage.getItem("previouslySearchedImages")
  );

  var selectedImage = event.target;
  var imgURL = selectedImage.src;
  var selectedImageId = selectedImage.id;

  if ((imgURL !== null) || (imgURL !== undefined)) {
    if (previousImages == null) {
      previousImages = [];
      previousImages.push(imgURL);
      localStorage.setItem(
        "previouslySearchedImages",
        JSON.stringify(previousImages)
      );
    } else if (previousImages !== null) {
      //previousImages = JSON.parse(localStorage.getItem("previouslySearchedImages"));
      var existsInStorage = findInStorage(previousImages, imgURL);
      if (existsInStorage > 0) {
        previousImages.push(imgURL);
        localStorage.setItem(
          "previouslySearchedImages",
          JSON.stringify(previousImages)
        );
      }
    }
  }
  chosen(selectedImageId); // Do not move me (ever)
}

// searches the image to see if it exists in the entries from the storage
function findInStorage(previousImages, imgURL) {
  for (var i = 0; i < previousImages.length; i++) {
    if (imgURL === previousImages[i]) {
      return -1;
    }
  }
  return 1;
}

function chosen(name) {
    var object = localStorage.getItem(name);
    localStorage.setItem('focusImage', object)
    window.location.href = 'detailPage.html';
}

//Event handler to check for click on image
$("img").on("click", saveToLocalStorage);


function init () {
    smallGroup1.forEach(harvardSearch);
    harvardSearch(big1);
    smallGroup2.forEach(metSearch);
    metSearch(big2);
    colorApiInjection();
}

init();