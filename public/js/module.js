'use strict';

var app = angular.module('test4aLikesApp', ['ui.router']);

app.run(function(Test4aLikesService) {
  Test4aLikesService.getProfile();
});

var resolveObj = {
  profile: function(Test4aLikesService, $q, $state) {
    return Test4aLikesService.getProfile()
    .catch(() => {
      $state.go('home');
      return $q.reject();
    });
  }
}

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/html/home.html',
      controller: 'homeCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/html/authForm.html',
      controller: 'authFormCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/html/authForm.html',
      controller: 'authFormCtrl'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: '/html/profile.html',
      controller: 'profileCtrl',
      resolve: resolveObj
    })
    $urlRouterProvider.otherwise('/');
});

app.filter('titlecase', function() {
  return function(input) {
    return input[0].toUpperCase() + input.slice(1).toLowerCase();
  };
});
