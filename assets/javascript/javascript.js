 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyD6qYFQihu9JTU4h3KcoJeSnOHdFJQPTy4",
    authDomain: "project-9bfe9.firebaseapp.com",
    databaseURL: "https://project-9bfe9.firebaseio.com",
    projectId: "project-9bfe9",
    storageBucket: "project-9bfe9.appspot.com",
    messagingSenderId: "347339933313"
  };
  firebase.initializeApp(config);

var trainData = firebase.database().ref();

$("#currentTime").append(moment().format("hh:mm A"));

$("#addTrainBtn").on("click", function() {
    event.preventDefault();
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }
    trainData.push(newTrain);

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    return false;
});

trainData.on("child_added", function(childSnapshot) {

    let data = childSnapshot.val();
    let trainNames = data.name;
    let trainDestin = data.destination;
    let trainFrequency = data.frequency;
    let theFirstTrain = data.firstTrain;
    console.log(theFirstTrain);
    let tRemainder = moment().diff(moment.unix(theFirstTrain), "minutes") % trainFrequency;
    let tMinutes = trainFrequency - tRemainder;

    let tArrival = moment().add(tMinutes, "m").format("hh:mm A");

    $("#trainTable > tbody").append("<tr><td>" + trainNames + "</td><td>" + trainDestin + "</td><td class='min'>" + trainFrequency + "</td><td class='min'>" + tArrival + "</td><td class='min'>" + tMinutes + "</td></tr>");

});