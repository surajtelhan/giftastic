//Global Variables

//We create an array of strings for each gif topic that will be associated with a button
var topics = ["Yoda", "Darth Vader", "Luke Skywalker", "C3PO", "R2D2", "Stormtroopers", "Clone Troopers", "Han Solo"];

//Global Functions

//Function that will append buttons from the topics string to the buttonSpace div
function renderButtons() {
    //Empty the buttonSpace div so that duplicates aren't made whenever function is called
    $("#buttonSpace").empty();
    //Loop through entire array of topics
    for (var i = 0; i < topics.length; i++) {
        //We create a button element for the topic
        var topicButton = $("<button>").text(topics[i]);
        //We assign each button with a class and data attribute
        topicButton.attr("class", "gifButton btn btn-primary m-1");
        topicButton.attr("data-name", topics[i]);
        //And we append the topic button to the buttonSpace div
        $("#buttonSpace").append(topicButton);
    }
}

//Function to submit user input from form to add new buttons to the page
$("#submitButton").click(function(event) {
    event.preventDefault();
    var userInputValue = $("#userInput").val().trim();
    topics.push(userInputValue);
    renderButtons();
});

//Components of the app that we don't want to load until the document is ready
$(document).ready(function () {
    renderButtons();
    //Adding a click event listener for all buttons
    $(document).on('click', ".gifButton", function () {
        //Empty our gifSpace div to remove any previous request
        $("#gifSpace").empty();
        //Storing our data-name property value from the button into a variable
        var playerName = $(this).attr("data-name");

        //Using the player name to construct our query URL for the Giphy API
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + playerName + "&limit=10&rating=pg&api_key=VDxHIfeaPfDIQImR9DIGqeyWB5Iw2c8F";

        //Performing our AJAX GET request
        $.ajax({
                url: queryUrl,
                method: "GET"
            })
            //After the data from the AJAZ request comes back
            .then(function (response) {
                //Storing the results of the request as an array
                var results = response.data;

                //Looping through each object in the array of results
                for (var i = 0; i < results.length; i++) {

                    //Saving the gif's still image and rating properties
                    var stillGifURL = results[i].images.fixed_height_still.url;
                    var animatedGifURL = results[i].images.fixed_height.url;
                    var ratingURL = results[i].rating;

                    //Creating html elements to display our gif properties we saved
                    var stillImage = $("<img class='img-fluid border border-primary gif'>");
                    var ratingDisplay = $("<p class='text-center text-light bg-secondary m-2'>").text("Rating: " + ratingURL);

                    //Giving the still image element a src attribute of the still image property we obtained from the response to our request
                    stillImage.attr("src", stillGifURL);
                    stillImage.attr("alt", "Still Gif Image");
                    //Data attibrutes for recording and changing the gif state
                    stillImage.attr("data-state", "still");
                    stillImage.attr("data-still", stillGifURL);
                    stillImage.attr("data-animate", animatedGifURL);

                    //Append the Gif to the gifSpace div
                    $("#gifSpace").append(stillImage);
                    $("#gifSpace").append(ratingDisplay);
                }
            });
    });
    //Adding a click event listener for gifs to be toggled between still and animated
    $(document).on('click', ".gif", function () {
        //Store current state of gif
        var state = $(this).attr("data-state");
        //If the image status is still
        if (state === "still") {
            //Then, change the image source to the animated gif
            $(this).attr("src", $(this).attr("data-animate"));
            //And change its data state to animate
            $(this).attr("data-state", "animate");
        } else {
            //Otherwise, set the image source and state to still
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});