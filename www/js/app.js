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

  var url = 'http://api.wunderground.com/api/6f553360d71d14af/conditions/geolookup/forecast/q/autoip.json';
  console.log("url", url);
  
  //Getting the current latitude and longitude in chrome
  navigator.geolocation.getCurrentPosition(function (position){
    
    console.log("position", position);

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    
    

    $http.get(url).then(function(res){
      console.log("res", res);

      $scope.city = res.data.location.city;

      $scope.state = res.data.location.state;
      
      $scope.stats = res.data.current_observation.icon;

      $scope.temperatureF = res.data.current_observation.temp_f + "°F";
      //current temperatue
      // weather.temp = parseInt(res.data.currently.temperature);     

        
    });//end of http request
 
  });//end of navigator function


  weather.temp = "--";
  weather.stats = "";


  //Getting Date information.
  var currentDate = new Date();
  var currentDay = currentDate.getDate();
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  var currentMonth = months[currentDate.getMonth()];
  var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var currentWeekDay = weekday[currentDate.getDay()];

  $scope.dateDisplay = currentWeekDay + "," + " " + currentMonth + " " + currentDay;
  console.log("currentDate", currentDate);

});




