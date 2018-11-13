$("document").ready(function () {

    $(document).on("click", ".btn", function (e) {
        (e).preventDefault();

        let trainName = $("#train-name").val().trim();
        let destination = $("#destination").val().trim();
        let firstTrain = $("#start-time").val().trim();
        let frequencyMin = $("#frequency-min").val().trim();


        $("#train-name").push(trainName);
        $("#destination").push(destination);
        $("#frequency-min").push(frequencyMin);


        function renderRow() {
            let nextArrival = 0;
            let minutesAway = 0;

            let mytRow = $("<tr>");

            function renderCell(cellData) {
                let mytData = $("<td>");
                mytData.text(cellData);
                mytRow.append(mytData);
            }

            renderCell(trainName);
            renderCell(destination);
            renderCell(frequencyMin);
            renderCell(nextArrival);
            renderCell(minutesAway);

            $("tbody").append(mytRow);

        }
        renderRow();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            frequencyMin: frequencyMin,
            firstTrain: firstTrain,
        });

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
    console.log(childSnapshot.val().firstTrain);

    function renderRow() {
        let nextArrival = 0;
        let minutesAway = 0;

        let mytRow = $("<tr>");

        function renderCell(cellData) {
            let mytData = $("<td>");
            mytData.text(cellData);
            mytRow.append(mytData);
        }

        renderCell(childSnapshot.val().trainName);
        renderCell(childSnapshot.val().destination);
        renderCell(childSnapshot.val().frequencyMin);
        renderCell(nextArrival);
        renderCell(minutesAway);

        $("tbody").append(mytRow);

    }
    renderRow();


});


