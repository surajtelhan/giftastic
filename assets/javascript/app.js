
var topics = ["Yoda", "Darth Vader", "Luke Skywalker", "C3PO", "R2D2", "Stormtroopers", "Clone Troopers", "Han Solo"];

function renderButtons() {
    $("#buttonSpace").empty();
    for (var i = 0; i < topics.length; i++) {
        var topicButton = $("<button>").text(topics[i]);
        topicButton.attr("class", "gifButton btn btn-primary m-1");
        topicButton.attr("data-name", topics[i]);
        $("#buttonSpace").append(topicButton);
    }
}
$("#submitButton").click(function(event) {
    event.preventDefault();
    var userInputValue = $("#userInput").val().trim();
    topics.push(userInputValue);
    renderButtons();
});

$(document).ready(function () {
    renderButtons();
    $(document).on('click', ".gifButton", function () {
        $("#gifSpace").empty();
        var characterName = $(this).attr("data-name");

        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + playerName + "&limit=10&rating=pg&api_key=VDxHIfeaPfDIQImR9DIGqeyWB5Iw2c8F";

        $.ajax({
                url: queryUrl,
                method: "GET"
            })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {

    
                    var stillGifURL = results[i].images.fixed_height_still.url;
                    var animatedGifURL = results[i].images.fixed_height.url;
                    var ratingURL = results[i].rating;

            
                    var stillImage = $("<img class='img-fluid border border-primary gif'>");
                    var ratingDisplay = $("<p class='text-center text-light bg-secondary m-2'>").text("Rating: " + ratingURL);

                    
                    stillImage.attr("src", stillGifURL);
                    stillImage.attr("alt", "Still Gif Image");
                   
                    stillImage.attr("data-state", "still");
                    stillImage.attr("data-still", stillGifURL);
                    stillImage.attr("data-animate", animatedGifURL);

                    
                    $("#gifSpace").append(stillImage);
                    $("#gifSpace").append(ratingDisplay);
                }
            });
    });

    $(document).on('click', ".gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});