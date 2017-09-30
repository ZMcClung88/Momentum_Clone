angular.module('app').controller('mainCtrl', function($scope, $rootScope, backgroundService, quotesService) {
  /// TIME
  $scope.time = moment().format('h:mm ');

  /// BACKGROUND IMAGES
  $rootScope.backgroundImages = function() {
    let images = backgroundService.backgroundImages;
    let randomNumber = Math.floor(Math.random() * images.length);
    let randomImage = images[randomNumber];
    // console.log(randomImage);
    return {
      "background-image": 'url(' + randomImage + ')'
    };
  };
  $scope.backgroundImages();
  console.log($scope.backgroundImages());

  /// QUOTES
  $rootScope.quotes = function() {
    let quotes = quotesService.quotes;
    let randomQuote = Math.floor(Math.random() * quotes.length);
    $scope.quote = quotes[randomQuote];

  }
  $scope.quotes();

});
