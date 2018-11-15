function renderRow(trainRow) {

    let mytRow = $("<tr>");
    let nameCell = $("<td>").text(trainRow.name);
    let destinationCell = $("<td>").text(trainRow.destination);
    let frequencyMinCell = $("<td>").text(trainRow.frequencyMin);
    let nextArrivalCell = $("<td>").text(trainRow.nextArrival);
    let minutesAwayCell = $("<td>").text(trainRow.minutesAway);

    mytRow.append(nameCell, destinationCell, frequencyMinCell, nextArrivalCell, minutesAwayCell);
    $("tbody").append(mytRow);
}


$("document").ready(function () {

    $(document).on("click", ".btn", function (e) {
        (e).preventDefault();

        //Grabbing user inputs and storing to a variable
        let trainName = $("#train-name").val().trim();
        let destination = $("#destination").val().trim();
        let startTime = $("#start-time").val().trim();
        let frequencyMin = $("#frequency-min").val().trim();


        //Pushing object data to firebase
        database.ref().push({
            trainName: trainName,
            destination: destination,
            startTime: startTime,
            frequencyMin: parseInt(frequencyMin),     
        });


        //Emptying input boxes on html after submit
        $("#train-name").val("");
        $("#destination").val("");
        $("#start-time").val("");
        $("#frequency-min").val("");

    });

});

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC1zn6Cqlg8O5v0otJ_Lykjn6NtRDrnjXg",
    authDomain: "train-schedules-a1701.firebaseapp.com",
    databaseURL: "https://train-schedules-a1701.firebaseio.com",
    projectId: "train-schedules-a1701",
    storageBucket: "train-schedules-a1701.appspot.com",
    messagingSenderId: "818052582860"
};
firebase.initializeApp(config);

database = firebase.database();

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequencyMin);
    console.log(childSnapshot.val().startTime);


    let trainRow = {
        name: (childSnapshot.val().trainName),
        destination: (childSnapshot.val().destination),
        startTime: (childSnapshot.val().startTime),
        frequencyMin: parseInt(childSnapshot.val().frequencyMin),
        minutesAway: minutesAway,
        nextArrival: nextArrival,
    }

    var startTimeConverted = moment(trainRow.startTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");
    var timeRemainder = diffTime % trainRow.frequencyMin;
    var minutesAway = trainRow.frequencyMin - timeRemainder;
    var nextArrival = moment().add(minutesAway, "m").format("hh:mm A");

    console.log(minutesAway);
    console.log(nextArrival);

    // minutesAwayCell.append(minutesAway);
    // nextArrivalCell.append(nextArrival);

    renderRow(trainRow);

});


