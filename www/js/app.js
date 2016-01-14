// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('weatherCtl', function($http, $window, $scope){

  var weather = this;

  //api url with unique key
  var url = 'http://api.wunderground.com/api/6f553360d71d14af/conditions/geolookup/forecast/q/autoip.json';
  console.log("url", url);

  //http request to api then pass stats into WuData function.
  $http.get(url).then(WuData);

  //Getting the current latitude and longitude in chrome for later use.
  navigator.geolocation.getCurrentPosition(function (position){
    
    console.log("position", position);

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
     
  });//end of navigator function


  //Weather Stats coming from the http request.
  function WuData (res) {
    //console.log("res", res);

    $scope.city = res.data.location.city;

    $scope.state = res.data.location.state;
    
    $scope.stats = res.data.current_observation.icon;

    $scope.temperatureF = res.data.current_observation.temp_f + "°F"; 

    //return to use in search function.
    return res;   
  }//end of WuData


  // var history = [];
  //Search Button in Header
  weather.search = function () {
    
    $http.get(url + weather.searchQuery + ".json")
    .then(WuData)
    .then(function(res){
      //adding each ids to the array for the search history
      //ids.push(res.data.current_observation.station_id); 

      //defining current location and id that comes from res object
      var location = res.data.location.city + "," + res.data.location.state;
      console.log("location", location);
      var id = res.data.current_observation.station_id;
      //setting the local storage to empty object or to get history.
      var history = JSON.parse(localStorage.getItem('searchHistory')) || {};
      
      //adding a key value pair to the history.
      history[location] = id;
      
      //setting the local storage with history object.
      localStorage.setItem('searchHistory', JSON.stringify(history));
      
      // console.log("locationHistory", locationHistory);
      // history.push(locationHistory, id);
      
      //local storage need a key and a value.
      // localStorage.setItem('searchHistory', JSON.stringify(HistObj));
    });
  }

  //Getting Date information.
  var currentDate = new Date();
  var currentDay = currentDate.getDate();
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  var currentMonth = months[currentDate.getMonth()];
  var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var currentWeekDay = weekday[currentDate.getDay()];

  $scope.dateDisplay = currentWeekDay + "," + " " + currentMonth + " " + currentDay;
  console.log("currentDate", currentDate);

});//end of controller




