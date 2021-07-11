$(window).on("load", loadPreviousImages);

function loadPreviousImages() {
  var previousImages = JSON.parse(
    localStorage.getItem("previouslySearchedImages")
  );

  console.log(previousImages);

  if (previousImages !== null) {
    console.log(previousImages);
    for (var i = 0; i < previousImages.length; i++) {
      getAndDisplayImages(i, previousImages[i]);
    }
  } else {
    console.error("Dude!! Search for some images first");
    window.alert("No images have been searched previously");
  }
}

function getAndDisplayImages(index, image) {
  $("<img/>", {
    id: "image-" + index,
    src: image,
    class: "history-image",
  }).appendTo(".the-child-boss-div");
}
