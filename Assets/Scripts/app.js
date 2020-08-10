// beginning of Johnny's part
// displays current date
$(document).ready(function () {
    $("#currentDate").append("<p>" + (moment().format('dddd, MMMM Do')) + "<p>");
});

    // grabbing user's inputted location
    var searchBtn = $("#searchBtn")

    searchBtn.on("click", function (event) {
        event.preventDefault();
        var button = $(this);
        console.log("click");

        var city = $("#city-name").val().trim();
        console.log(city);

        // reverse lookup using open weather lol
        queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8f775258afdec054195f89c38855f678&units=imperial";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            const geoCity = response.name;
            console.log(geoCity);
            const country = response.sys.country;
            console.log(country);
            var currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
            console.log(currentIcon);
            var rTemp0 = Math.floor(response.main.temp);
            console.log(rTemp0);

            $("#temp0").empty();
            $("#currentIcon").empty();
            $("#currentCity0").empty();

            $("#currentIcon").prepend(currentIcon);
            $("#temp0").prepend("<p>Temp: " + rTemp0 + "° F </p.>");
            $("#currentCity0").append("<p>" + geoCity + ", " + country + "</p>");

        });
    });

// google maps
function initMap() {
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);

        const geoLat = position.coords.latitude;
        const geoLon = position.coords.longitude;
        console.log(geoLat, geoLon);
        // The location of user
        var userLoc = {
            lat: geoLat,
            lng: geoLon
        };
        // The map, centered at location
        var map = new google.maps.Map(
            document.getElementById('map'), {
                zoom: 4,
                center: userLoc
            });
        // The marker, positioned at location
        var marker = new google.maps.Marker({
            position: userLoc,
            map: map
        })
    });
} 

function initMapTwo() {
        // The location of user
        var userLoc = {
            lat: geoLat,
            lng: geoLon
        };
        // The map, centered at location
        var map = new google.maps.Map(
            document.getElementById('map'), {
                zoom: 4,
                center: userLoc
            });
        // The marker, positioned at location
        var marker = new google.maps.Marker({
            position: userLoc,
            map: map
        })
    };

// end of Johnny's part