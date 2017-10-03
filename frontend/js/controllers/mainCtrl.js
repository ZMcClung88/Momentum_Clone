angular.module('app').controller('mainCtrl', function($scope, $rootScope, backgroundService, quotesService, weatherService) {

  ////////////// GREETING //////////////
  function greeting() {
    let customerName = prompt("Please enter your name...");
    if(customerName != null) {
      document.getElementById("greeting-personal").innerHTML = "Good afternoon, " + customerName + ".";
    }
  }
  greeting();

  ////////////// TIME //////////////
  $scope.time = moment().format('h:mm ');
  $scope.ampm = $scope.time < 12 ? "PM" : "AM";

  $(function() {
    $("#time").hover(function() {
      $("#ampm").fadeIn("slow");
    },
    function() {
        $("#ampm").fadeOut("fast");
    });
  })


  ////////////// QUOTE HOVER //////////////
  $(function() {
    $("#quote").hover(function(){
      $("#author").fadeIn("slow");
    },
    function(){
      $("#author").fadeOut("slow");
    });
  })



  ////////////// BACKGROUND IMAGES //////////////
  $rootScope.backgroundImages = function() {
    let images = backgroundService.backgroundImages;
    let randomNumber = Math.floor(Math.random() * images.length);
    let randomImage = images[randomNumber];
    return {
      "background-image": 'url(' + randomImage + ')'
    };
  };
  $rootScope.backgroundImages();

  ////////////// WEATHER //////////////
  weatherService.getWeather().then(function(response) {
    $scope.city = response.city.name;
    $scope.weather = Math.floor(response.list[0].main.temp);
    $scope.icon = response.list[0].weather[0].icon + '.svg';
  });

  //////////// QUOTES //////////////
  $scope.quotes = function() {
    let quotes = quotesService.quotes;
    let randomQuote = Math.floor(Math.random() * quotes.length);
    $scope.quote = quotes[randomQuote];

  }
  $scope.quotes();

});
