'use strict';

/**
 * @ngdoc function
 * @name app.controller:LoginCtrl
 * @description
 * # MainCtrl
 * Controller of the myAppApp
 */

 myApp.controller('loginCtrl',['toaster', '$rootScope', '$scope','$http','$state','$stateParams', function (toaster,$rootScope,$scope,$http,$state,$stateParams) {
  $scope.uemail='';
  $rootScope.pageTitle =  'Login';
  $scope.paswd = '123456';
  $scope.login = function()
    {
           $http
           ({
            method: 'GET',
            url: 'https://www.apimint.com:443/mock/ASSIGNMENT/v1/employees/1',
            contentType: 'application/json',
            dataType: 'json',
            accepts: "application/json",
            headers:  {
              "accept": "application/json; charset=utf-8",
              "x-mock-access": 'fc8c20a3021d181215da588ddaa041'
            }
           })
           .then(function(response){

             $scope.useremail = response.data.payload.email.personal;

             if( ($scope.uemail == $scope.useremail) && ($scope.upassword== $scope.paswd))
             {
               console.log("login by:", $scope.useremail);
               toaster.pop('success', "Login successfull.");
              $state.go('list',{id:$scope.useremail});

             }
             else{
              toaster.pop('error', "Please enter valid username or password");

             }
           })
          }


    }]);
