angular.module('app').controller('mainCtrl', function($scope, $rootScope, backgroundService, quotesService, weatherService) {



  ////////////// TIME //////////////
  $scope.time = moment().format('h:mm ');

  ////////////// GET NAME //////////////
  $scope.getName = function () {

  }

  ////////////// BACKGROUND IMAGES //////////////
  $rootScope.backgroundImages = function() {
    let images = backgroundService.backgroundImages;
    let randomNumber = Math.floor(Math.random() * images.length);
    let randomImage = images[randomNumber];
    // console.log(randomImage);
    return {
      "background-image": 'url(' + randomImage + ')'
    };
  };
  $rootScope.backgroundImages();
  console.log($scope.backgroundImages());

  ////////////// WEATHER //////////////
  weatherService.getWeather().then(function(response) {
    $scope.city = response.city.name;
    console.log($scope.city);
    $scope.weather = Math.floor(response.list[0].main.temp);
    console.log($scope.weather);
    $scope.icon = response.list[0].weather[0].icon + '.svg';
    console.log($scope.icon);
  });

  ////////////// QUOTES //////////////
  $scope.quotes = function() {
    let quotes = quotesService.quotes;
    let randomQuote = Math.floor(Math.random() * quotes.length);
    $scope.quote = quotes[randomQuote];

  }
  $scope.quotes();

});
