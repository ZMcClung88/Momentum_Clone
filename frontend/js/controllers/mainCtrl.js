angular.module('app').controller('mainCtrl', function($scope, $rootScope, backgroundService, quotesService, weatherService) {



  ////////////// TIME //////////////
  $scope.time = moment().format('h:mm ');

  ////////////// GET NAME //////////////
  $scope.getName = function (name) {
    // console.log('name', name);
    $scope.name = name;
  }

  ////////////// GREETING //////////////
  // $('body').keypress(function(key) {
  //   if(key.which == 13){
  //     console.log('you hit enter!')
  //     $('#input').hide() && $('#greeting-personal').show();
  //   }
  // });

  ////////////// QUOTE HOVER //////////////
  // $("#quote").mouseover(function() {
  //   console.log('mouse in the house!');
  //   $("#author").removeClass('quote-author');
  // });
  // $("#quote").mouseleave(function() {
  //   console.log('mouse out of the house!');
  //   $("#author").addClass('quote-author');
  // });

  $(function() {
    $("#quote").hover(function(){
      $("#author").fadeIn("slow");
    },
    function(){
      $("#author").fadeOut("slow");
    }
  );
})



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
  // console.log($scope.backgroundImages());

  ////////////// WEATHER //////////////
  weatherService.getWeather().then(function(response) {
    $scope.city = response.city.name;
    // console.log($scope.city);
    $scope.weather = Math.floor(response.list[0].main.temp);
    // console.log($scope.weather);
    $scope.icon = response.list[0].weather[0].icon + '.svg';
    // console.log($scope.icon);
  });

  //////////// QUOTES //////////////
  $scope.quotes = function() {
    let quotes = quotesService.quotes;
    let randomQuote = Math.floor(Math.random() * quotes.length);
    $scope.quote = quotes[randomQuote];

  }
  $scope.quotes();

});
