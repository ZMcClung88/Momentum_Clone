angular.module('app', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/frontend/views/home.html',
      controller: 'mainCtrl'
    })

});
