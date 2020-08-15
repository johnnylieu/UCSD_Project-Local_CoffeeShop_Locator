// beginning of Johnny's part
// displays current date
$(document).ready(function () {

    // Makes sure the cards stack vertically
    var alterClass = function () {
        var ww = document.body.clientWidth;
        if (ww < 500) {
            $('#map-review-container').removeClass('row');
        } else if (ww >= 401) {
            $('#map-review-container').addClass('row');
        };
    };
    $(window).resize(function () {
        alterClass();
    });
    //Fire it when the page first loads:
    alterClass();


    $("#current-date").append("<strong>Today's Date:</strong>  " + (moment().format('dddd, MMMM Do')));
    // gets user's location
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        geoLat = position.coords.latitude;
        geoLon = position.coords.longitude;
        console.log(geoLat, geoLon);

        // loads user's location in google map
        initialize();

        // grabs weather for user's location
        queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + geoLat + "&lon=" + geoLon + "&appid=8f775258afdec054195f89c38855f678&units=imperial";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            const geoCity = response.name;
            // console.log(geoCity);
            const country = response.sys.country;
            // console.log(country);
            var currentIcon = $("<img>")
                .attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
            currentIcon.css({
                "position": 'absolute'
            });
            console.log(currentIcon);
            var rTemp0 = Math.floor(response.main.temp);
            // console.log(rTemp0);

            $("#current-city").empty();
            $("#temp").empty();
            $("#current-icon").empty();

            $("#current-city").append("<strong>Current City:  </strong>" + geoCity + ", " + country);
            $("#temp").append("<strong>Current Temp: </strong>" + rTemp0 + "° F");
            $("#current-icon").append(currentIcon);
        });
    })

});

// grabbing user's inputted location
var searchBtn = $("#searchBtn")

searchBtn.on("click", function (event) {
    event.preventDefault();

    // $('#map-review-container')
    // // Makes sure the cards stack vertically
    // var alterClass = function () {
    //     var ww = document.body.clientWidth;
    //     if (ww < 500) {
    //         $('#map-review-container').removeClass('row');
    //     } else if (ww >= 401) {
    //         $('#map-review-container').addClass('row');
    //     };
    // };
    // $(window).resize(function () {
    //     alterClass();
    // });
    // //Fire it when the page first loads:
    // alterClass();
// change


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
        var currentIcon = $("<img>")
            .attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
        // console.log(currentIcon);
        // This click event is getting a different icon than the ready function
        var rTemp0 = Math.floor(response.main.temp);
        console.log(rTemp0);

        geoLat = response.coord.lat
        console.log(geoLat);
        geoLon = response.coord.lon
        console.log(geoLon);

        initialize()

        $("#temp").empty();
        $("#current-icon").empty();
        $("#current-city").empty();

        $("#current-city").append("<strong>Current City:  </strong>" + geoCity + ", " + country);
        $("#temp").prepend("<strong>Current Temp: </strong>" + rTemp0 + "° F");
        $("#current-icon").prepend(currentIcon);
    });
});

// google maps
let map;
var infowindow;

function initialize() {
    // The location of user
    var userLoc = {
        lat: geoLat,
        lng: geoLon
    };
    // The map, centered at location
    map = new google.maps.Map(
        document.getElementById('map'), {
        zoom: 12,
        center: userLoc
    });

    // The marker, positioned at user's location
    var marker = new google.maps.Marker({
        position: userLoc,
        map: map,
        icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
    })

    // info on marker
    var infoWindow = new google.maps.InfoWindow({
        content: '<p>You Are Here</p>'
    });

    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });
    var request = {
        location: userLoc,
        radius: 8047,
        types: ['cafe'] //This is what the cafe is searching for
    };
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
};

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i], i);
            console.log(results[i], i);
        }
    }
}

function createMarker(place, index) {
    var placeLoc = place.geometry.location;
    var latti = place.geometry.location.lat();
    var longi = place.geometry.location.lng();
    console.log(latti, longi);
    console.log(place.name);
    var marker = new google.maps.Marker({
        map: map,
        position: { lat: latti, lng: longi },
        // icon: {
        //     url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        //     // This marker is 20 pixels wide by 32 pixels high.
        //     size: new google.maps.Size(20, 32),
        //     // The origin for this image is (0, 0).
        //     origin: new google.maps.Point(0, 0),
        //     // The anchor for this image is the base of the flagpole at (0, 32).
        //     anchor: new google.maps.Point(0, 32)
        //   },
        title: index + "",
        zIndex: index,
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    })
}

// if we want google maps to load when windows loads but right now we don't need this
// google.maps.event.addDomListener(window, 'load', initialize);

// end of Johnny's part