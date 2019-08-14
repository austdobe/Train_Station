var current = ""
var time = ""

console.log(current)
var timeUpdate = function(){
    time=moment().format("hh:mm:ss")
    current.html(time)
    
}

$(document).ready(function(){
    current = $("#current")
    timeUpdate()
    setInterval(timeUpdate, 1000)

// Your web app's Firebase configuration

var firebaseConfig = {
    apiKey: "AIzaSyBe_jvwzl9Bho-bAQiNzjPlTNEYe91lY6c",
    authDomain: "test-firebase-server-6f585.firebaseapp.com",
    databaseURL: "https://test-firebase-server-6f585.firebaseio.com",
    projectId: "test-firebase-server-6f585",
    storageBucket: "",
    messagingSenderId: "895264467096",
    appId: "1:895264467096:web:6d4befb83304d46c"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

//create variable for firebase data base

var database = firebase.database()

//create empty Global variables to store information

var trainName = "";
var destination = "";
var frequency = "";
var startTime = "";


// capture information from add train button

$("#addTrain").on("click", function(event){
    event.preventDefault()

    //Capture the values inserted within the input lines

    trainName = $("#trainName").val().trim()
    console.log("train "+trainName)
    destination = $("#destination").val().trim();console.log("destination " +destination)
    frequency = $("#frequency").val().trim()
    console.log("frequency "+frequency)
    startTime = $("#trainTime").val().trim()
    console.log("First Time "+startTime)
    
    //push captured information to database(without removing old information)

    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        startTime: startTime,
        
    })

})

function refresh (){
$("#trainDisplay").text("")
database.ref().on("child_added", function(childSnapshot){
    
    //establish new variables and match to firebase data

    var newTrain = childSnapshot.val().trainName;
    var newdestination = childSnapshot.val().destination
    var newFrequency = childSnapshot.val().frequency
    var firstTrain = childSnapshot.val().startTime
    var time = childSnapshot.val().time 
    console.log(newFrequency) 
    console.log(firstTrain)  
    
    //calculate the time until the next train

    var timeConvert = moment(firstTrain, "hh:mm A");
    console.log(timeConvert)
    var timeSince = moment(time).diff(moment(timeConvert), "minutes")% newFrequency;
    console.log(timeSince)
    var timeTill = newFrequency - timeSince;
    console.log(timeTill)

    //calculate when the train will arrive to the station

    var arrival = moment().add(timeTill, "m").format("hh:mm A");
    
    //show the information on the HTML file
    
    var newRow = $("<tr><td>" + newTrain + "</td><td>"+ newdestination + "</td><td>" + newFrequency + "</td><td>" + arrival + "</td><td>" + timeTill + "</td>")
    
    $("#trainDisplay").append(newRow);
    
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
}
setInterval(refresh, 1000)

});







