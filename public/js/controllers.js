'use strict';

var app = angular.module('test4aLikesApp');


app.controller('homeCtrl', function($scope, $q, $http) {
  // $scope.clients = clientDex;
});

app.controller('mainCtrl', function($scope, $state, Test4aLikesService) {

  $scope.$watch(function() {
    return Test4aLikesService.currentUser;
  }, function(newVal, oldVal) {
    $scope.currentUser = newVal;
  });

  $scope.logout = () => {
    Test4aLikesService.logout()
      .then(res => {
        $state.go('home');
      })
  }
});

app.controller('authFormCtrl', function($scope, $state, Test4aLikesService) {

  $scope.currentState = $state.current.name;

  $scope.submitForm = () => {
    if($scope.currentState === 'register') {

      // register user
      if($scope.user.password !== $scope.user.password2) {

        $scope.user.password = '';
        $scope.user.password2 = '';

        alert('Passwords must match.')
      } else {
        Test4aLikesService.register($scope.user)
          .then(res => {
            return Test4aLikesService.login($scope.user);
          })
          .then(res => {
            $state.go('home');
          })
          .catch(res => {
            alert(res.data.error);
          });
      }
    } else {
      Test4aLikesService.login($scope.user)
        .then(res => {
          $state.go('home');
        })
        .catch(res => {
          alert(res.data.error);
        })
    }
  };
});

app.controller('profileCtrl', function($scope, $state, $q, $http) {
    // var t = $state.params.user;

    $scope.likes = function() {
      console.log('like clicked', $scope.clicklikes);
    }
    $scope.dislikes = function() {
      console.log('like clicked', $scope.clickdislikes);
    }



});
