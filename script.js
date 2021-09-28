img = "";
status = "";
objects = [];

function preload() {
    song = loadSound("https://www.youtube.com/watch?v=5LCvj6Z_LrA");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    objectDetector = ml5.objectDetector("cocoSsd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model is Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}

function draw() {
    image(video, 0, 0, 380, 380);
    if(status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Babies Detected: " + objects.length;
        }
    }
}

function gotResult(error, results) {
    if(error) {
        console.log("Baby Not Found",error);
    }
    console.log(results);
    objects = results;
}