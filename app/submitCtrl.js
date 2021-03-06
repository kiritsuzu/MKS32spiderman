angular.module('signup', [])

.controller('submitCtrl', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {

  $scope.isAuth = function(){
    return Boolean($window.localStorage.getItem('com.brewed'));
  };

  $scope.addUser = function(){
    $http.post('/signup', $scope.newUser).success(function(response){
      $location.path('/signin');
    });
  };

  $scope.signin = function(){
    $http.post('/signin', $scope.user).success(function(response){

      // if a token comes back, redirect to home
      if(response){
        $window.localStorage.setItem('com.brewed', response);
        $location.path('/home');
      }

      // if no token, redirect to signin
      else {
        $location.path('/signin');
      }
    });
  };

  $scope.getAppointments = function(){
    console.log('submitCtrl line36++, appointment button clicked');
    console.log('submitCtrl.js line 37++', $scope.token);
    $http.post('/appointments', $scope.token).success(function(response){
      console.log('line39++ submitctrl ', response);
      if($scope.isAuth()){
        $location.path('/appointments');
      }

      else {
        $location.path('/signin');
      }
    });
  };

  $scope.signout = function(){
    $window.localStorage.removeItem('com.brewed');
    $location.path('/home');
  };

}]);
