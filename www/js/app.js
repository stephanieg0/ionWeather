// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'angular-skycons'])

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

  navigator.geolocation.getCurrentPosition(function (geopos){
    
    console.log("geopos", geopos);
    var lat = geopos.coords.latitude;
    var lon = geopos.coords.longitude;
    var apiKey = '2485e7cf38367fdd4ae514375860d9d0';
    var url = '/api/forecast/' + apiKey + '/' + lat + ',' + lon;

    console.log("url", url);

    $http.get(url).then(function(res){
      
      weather.temp = parseInt(res.data.currently.temperature);     

      weather.image = res.data.currently.icon;

      $scope.CurrentWeather = {
        forecast: {
            icon: weather.image,
            iconSize: 100,
            color: "blue"
        }
    };
        
    });
 
  });


  weather.temp = "--";
  weather.image = "";

  
  


});


// .config(function($stateProvider, $urlRouterProvider){
//   // $stateProvider.state('root', {
//   //   url: '/',
//   //   template: '<h1>hello world</h1>'
//   // });

//   $urlRouterProvider.otherwise('/');
// })