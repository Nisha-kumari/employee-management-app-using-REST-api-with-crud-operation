'use strict';

/**
 * @ngdoc function
 * @name app.controller:LoginCtrl
 * @description
 * # MainCtrl
 * Controller of the myAppApp
 */
angular.module('app')
  .controller('ListCtrl',['$stateParams','$http','$state','$window','$compile','$scope','$rootScope','DTOptionsBuilder','DTColumnBuilder','$uibModal','$log', function ($stateParams,$http,$state,$window,$compile,$scope,$rootScope,DTOptionsBuilder,DTColumnBuilder,$uibModal,$log) {
    $rootScope.pageTitle =  'List of employees';
    $scope.emailId=$stateParams.id;
    $scope.employee = {};
    $scope.dtOptions = DTOptionsBuilder.newOptions()
    				.withOption('ajax', {
              processing: true,
              serverSide: true,
    					url: 'https://www.apimint.com:443/mock/ASSIGNMENT/v1/employees',
              //dataSrc: "",
    					type: 'GET',
    					contentType: 'application/json',
    					dataType: 'json',
    					accepts: "application/json",
              headers:  {
                "accept": "application/json; charset=utf-8",
                "x-mock-access": 'fc8c20a3021d181215da588ddaa041'
              },

    				})
    				.withDataProp('payload')
    				.withOption('processing', true)
    				.withOption('serverSide', false)    // Enable server-side processing
    				.withOption('createdRow', function(row, data, dataIndex) {
    					// Recompiling so we can bind Angular directive to the DT
    					$scope.employee[data._id] = data;
    					$compile(angular.element(row).contents())($scope);
    				})
    				.withOption('headerCallback', function(header) {
    					if (!$scope.headerCompiled) {
    						// Use this headerCompiled field to only compile header once
    						$scope.headerCompiled = true;
    						$compile(angular.element(header).contents())($scope);
    					}
    				})

    				.withPaginationType('full_numbers');

            $scope.dtColumns = [

									DTColumnBuilder
											.newColumn('_id')
											.withTitle('Document Id')
											.notVisible()
											.renderWith(
													function(data, type, full,
															meta) {
														return '<a data-toggle="modal" ng-click="editDocument(\''
																+ full._id
																+ '\')">'
																+ full._id
																+ '</a>';
													}),

              DTColumnBuilder.newColumn('name').withTitle('Name')
                 .renderWith(function(data, type, full, meta) {
                    var displayTitle = 'NA';
                   try{
                     if(full.name){
                       if(full.name.fName){
                        displayTitle = full.name.fName;
                        if(full.name.fName){
                          displayTitle = displayTitle + ' ' + full.name.lName
                        }
                       }
                       else{
                         displayTitle = full.name;
                       }
                     }
                     return (displayTitle);
                   }
                   catch(err) {
                     console.log('error: ', err);
                   }
                   return 'NA';
             }),
             DTColumnBuilder.newColumn('email').withTitle('Email Id')
                .renderWith(function(data, type, full, meta) {

                  try{
                    return (full.email.work);

                  }
                  catch(err) {
                    console.log('error: ', err);
                  }
                  return 'NA';
            }),

               DTColumnBuilder.newColumn('department').withTitle('Department')
                  .renderWith(function(data, type, full, meta) {
                    try{
                      return (full.department);
                    }
                    catch(err) {
                      console.log('error: ', err);
                    }
                    return 'NA';
              }),


              DTColumnBuilder.newColumn('edit').withTitle('Edit')
                 .renderWith(function(data, type, full, meta) {

                   try{
                     //console.log(full._id);
                     return '<a data-toggle="modal" ng-click="editDocument( \''
                     + full._id
                     + '\')" >'
										+ '<span class="glyphicon glyphicon-edit" title="Edit"></span></a>';

                   }
                   catch(err) {
                     console.log('error: ', err);
                   }
                   return 'NA';
             }),
             DTColumnBuilder.newColumn('delete').withTitle('Delete')
                .renderWith(function(data, type, full, meta) {

                  try{
                    return '<a data-toggle="modal" ng-click="deleteDocument(\''
                    + full._id
                    + '\')" >'
                   + '<span class="glyphicon glyphicon-trash" title="Delete"></span></a>';

                  }
                  catch(err) {
                    console.log('error: ', err);
                  }
                  return 'NA';
            }),
           ];

          
           $scope.editDocument = editDocument;
           function editDocument(employeeId){
            $scope.employeeId = employeeId;
             console.log("u clicked this Id = " +  $scope.employeeId); 
             $scope.modalInstance = $uibModal.open({
               ariaLabelledBy: 'modal-title',
               backdrop: false,
               ariaDescribedBy: 'modal-body',
               templateUrl: '/views/common/modal-form.html',
               controller: 'ModalFormCtrl',
               size: 'md',
               scope: $scope,
               resolve: {
                 param: function(){
                   return  $scope.employeeId;
                 }
               }

               });

          }
               $scope.deleteDocument= deleteDocument;
                function deleteDocument(employeeId){
                  $scope.employeeId = employeeId;
                  $scope.modalInstance = $uibModal.open({
                    backdrop: false,
                    templateUrl: '/views/common/delete.html',
                    controller: 'deleteCtrl',
                    size: 'md',
                    scope: $scope,
                    resolve: {
                      delparam: function(){
                        return $scope.employeeId;
                      }
                    }
                  })
               
           }
           
           $scope.logout = function(){
             $state.go('loginPage');
           }
          }]);
       






