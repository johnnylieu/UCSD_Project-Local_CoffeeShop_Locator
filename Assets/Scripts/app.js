// Johnny's part

// displays current date
$(document).ready(function () {
    $("#currentDate").append("<p>" + (moment().format('dddd, MMMM Do')) + "<p>");
});

// grabbing user's location
var geoLocBtn = $("#geoSearchBtn");

geoLocBtn.on("click", function (event) {
    event.preventDefault();
    console.log("click");

    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);

            const geoLat = position.coords.latitude;
            const geoLon = position.coords.longitude;
            console.log(geoLat, geoLon);

            // reverse lookup using open weather lol
            queryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + geoLat + "&lon=" + geoLon + "&appid=8f775258afdec054195f89c38855f678&units=imperial";
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

            // var lookUp = navigator.geolocation.getCurrentPosition(successfulLookup);
            // console.log(lookUp);
        });
});

// google maps
// function initMap () {
//     var location = {lat: geoLat, lng: geoLon};
//     var map = new google.maps.Map($("#map"), {
//         zoom: 4,
//         center: location,
//     });
// }
function initMap() {
    // The location of Uluru
    var uluru = {lat: -25.344, lng: 131.036};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
  }