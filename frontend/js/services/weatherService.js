angular.module('app').service('weatherService', function($http) {
  const URL = 'http://api.openweathermap.org/data/2.5/forecast?id=5781004&APPID=f9b3c4e0067e9d150a154256de430243&units=imperial';

  this.getWeather = function() {
    return $http.get(URL).then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }


});
