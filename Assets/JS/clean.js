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
var metQueries = localStorage.getItem('metChecks').replace("_", "+"); 

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
    fetch(harvardUrl + harvardQueries + harvardKey + hasImage)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            // console.log(data);
            var j = randomiseHarvardResult(data)
            var dataValidate = data.records[j].primaryimageurl;   
            if (dataValidate === null ) {                                   // if randomised object has no image, it restarts the API call.
                harvardSearch()
            } else {
                element.setAttribute("src", dataValidate);
            }
            localStorage.setItem('harvardTarget', JSON.stringify(data));    // Store full api object 
        })
}

function randomiseHarvardResult (data) {                                    // random object function chooser
    var j = Math.floor(Math.random() * data.records.length);
    // console.log(j);
    return j;
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
function metSearch (element) {
    console.log(metUrl + metQueries + imgCheck)
    fetch(metUrl + metQueries + imgCheck) 
        .then(function (response) { return response.json(); })
        .then(function (data) {
            randomResult(data.objectIDs, element);
        })
}

//selects a random ObjectID from the array of ObjectIDs
function randomResult (objectIDs, element) {
    for ( i = 0; i < metTarget.length; i++ ) {
        var j = Math.floor(Math.random() * objectIDs.length);
        console.log(j);
        metObjSearch(j, element);

    }
}

// 2nd API call that gets all the details of the Object ID, including image
function metObjSearch (objectID, element) {
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
            console.log(data);
            var dataValidate = data.primaryImageSmall;

            if (dataValidate === "") {                                  // if randomised object has no image, it restarts the API call.
                metSearch(element);
            } else if (dataValidate === undefined) {
                metSearch(element);
            } else {
                element.setAttribute("src", dataValidate);
            }
            localStorage.setItem('metTarget', JSON.stringify(data));    // Store full api object 
        })
    }

// Colours API //

function getColor(data) {
    return data.name === colorSelected;
}

function colorInjection(data) {
    var colorOne = data.value[0];
    var colorTwo = data.value[1];
    var colorThree = data.value[2];
    var colorFour = data.value[3];
    var colorFive = data.value[4];

    aEl.setAttribute("style", "background:#" + colorOne);
    dEl.setAttribute("style", "background:#" + colorThree);
    eEl.setAttribute("style", "background:#" + colorFour);
    fEl.setAttribute("style", "background:#" + colorFive);
    eventEl.setAttribute("style", "background-image: linear-gradient(#" + colorTwo + ",#" + colorOne + ",#" + colorThree + ",#" + colorFour);
}


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

function saveToLocalStorage(event) {
  //Get previously searched images and store in a variable
  var previousImages = JSON.parse(
    localStorage.getItem("previouslySearchedImages")
  );

  var selectedImage = event.target;
  var imgURL = selectedImage.src;
  var selectedImageId = selectedImage.id;

  console.log("This is the id "+selectedImageId);

  //Check if local storage has any previously searched images
  //   if (previousImages !== null) {
  //     for (var i = 0; i < previousImages.length; i++) {
  //       getAndSetImage(previousImage[i]);
  //     }
  //   }
  if ((imgURL !== null) || (imgURL !== undefined)) {
    if (previousImages == null) {
      previousImages = [];
      previousImages.push(imgURL);
      localStorage.setItem(
        "previouslySearchedImages",
        JSON.stringify(previousImages)
      );

      //calling Jesse's code (TO BE REVIEWED)
if (selectedImageId === 
    "big1"){
      chosen('harvardTarget');
    } else if (selectedImageId === "big2"){
        chosen('metTarget');
    }
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
      if (selectedImageId === 
        "big1"){
          chosen('harvardTarget');
        } else if (selectedImageId === "big2"){
            chosen('metTarget');
        }
    }
  }
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

//AFsha: Updated replace with href, to allow for browswer back button to work
function chosen(name) {
    var object = localStorage.getItem(name);
    localStorage.setItem('focusImage', object)
    window.location.href = './page3.html';
}

//Event handler to check for click on image
$("img").on("click", saveToLocalStorage);


function init () {
    smallGroup1.forEach(harvardSearch);
    harvardSearch(big1);
    smallGroup2.forEach(metSearch);
    metSearch(big2);
    colorApiInjection();
    colorInjection(clHEX.find(getColor));
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