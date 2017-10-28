angular.module('app')
  .controller('deleteCtrl', ['delparam','$scope', '$http','$stateParams','$state', function (delparam,$scope, $http,$stateParams,$state) {
    $scope.employeeId = delparam;
    console.log("empid", $scope.employeeId);

    $scope.delete = function(){
      $http({
        method: 'DELETE',
        url : "https://www.apimint.com:443/mock/ASSIGNMENT/v1/employees/" + $scope.employeeId,

        headers:  {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-mock-access',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          "x-mock-access": 'fc8c20a3021d181215da588ddaa041'
        }
        }).then(function (response){
          if (response.status == 200){
             toaster.pop('success', "deleted successfully.");
             console.log("deleted successfully");
          }
          else {
            toaster.pop('error', "Failed to delete");
          }


       }).catch(function(err){
         console.log("checking error:",err);

       })

    }
  }]);

  
