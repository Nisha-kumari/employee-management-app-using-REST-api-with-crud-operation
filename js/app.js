'use strict';

var myApp = angular
.module('app', [
  'ui.bootstrap',
  'ui.router',
  'toaster',
  'datatables',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ngFileUpload',
  'ngMessages'
])
.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.when('','/');
  $stateProvider
  .state('loginPage', {
    url : '/',

    templateUrl: 'views/login.html',
    controller: 'loginCtrl',

  })
  .state('list', {
    url : '/list/:id',

    templateUrl: '/views/common/list.html',
    controller: 'ListCtrl',
  })
  
   $urlRouterProvider.otherwise('/loginPage')

}]);
