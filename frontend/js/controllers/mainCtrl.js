angular.module('app').controller('mainCtrl', function($scope, $rootScope, backgroundService, quotesService, weatherService) {


  ////////////// TIME //////////////
  $scope.time = moment().format('h:mm ');
  $scope.ampm = moment().format('a');

  $(function() {
    $("#time").hover(function() {
      $("#ampm").fadeIn("slow");
    },
    function() {
        $("#ampm").fadeOut("fast");
    });
  })

  const theHours = new Date().getHours();
  let theMessage;
  let morning = ('Good morning');
  let afternoon =('Good afternoon');
  let evening = ('Good evening');

  if(theHours >= 0 && theHours < 12) {
    theMessage = morning;
  } else if (theHours >= 12 && theHours < 17) {
    theMessage = afternoon;
  } else if (theHours >= 17 && theHours < 24) {
    theMessage = evening;
  }

  ////////////// MILITARY TIME //////////////
  $scope.militaryTime = moment().format('H:mm');

  ////////////// TOGGLE TIME AND MILITARY TIME //////////////
  $("#militaryTime").hide();

  $(".standard-time, .militaryTime, .ampm").on('click', function() {
    $(".standard-time, .militaryTime, .ampm").toggle();
  })

  ////////////// GREETING //////////////
  function greeting() {
    let customerName = prompt("Please enter your name...");
    if(customerName != null) {
      document.getElementById("greeting-personal").innerHTML = theMessage + ", " + customerName + ".";
    }
  }
  greeting();


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
