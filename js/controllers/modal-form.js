angular.module('app')
  .controller('ModalFormCtrl', ['param','$scope', '$http', 'Upload','$stateParams','$state','$uibModalInstance', function (param,$scope, $http, Upload,$stateParams,$state,$uibModalInstance) {

            
            $scope.employeeId = param;
                console.log("modal",  $scope.employeeId)
                 $http({
                 method : "GET",
                 url : "https://www.apimint.com:443/mock/ASSIGNMENT/v1/employees" ,
                 dataType: 'json',
                 accepts: "application/json",
                 headers:  {
                   "accept": "application/json; charset=utf-8",
                   "x-mock-access": 'fc8c20a3021d181215da588ddaa041'
                 }
                  }).then(function (response){
                         $scope.value = {};
                         $scope.value = response.data.payload;
                
                         for (var i = 0; i < $scope.value.length; i++) {
                
                              if($scope.value[i]._id===$scope.employeeId)
                             {
                               console.log($scope.value);
                               $scope.user = $scope.value[i];
                             }
                           }
                
                    })
                
                    $scope.picFile;
                    $scope.update = function(file){
                    $scope.picFile = file;
                    file.upload = Upload.upload({
                      method: 'PATCH',
                      url: 'https://www.apimint.com:443/mock/ASSIGNMENT/v1/employees/' + $scope.employeeId,
                      data: {file:file,data:$scope.user},
                
                      headers:  {
                        "Access-Control-Allow-Origin": '*',
                       'Content-Type':"multipart/form-data",
                        "x-mock-access": 'fc8c20a3021d181215da588ddaa041',
                
                         }
                
                      });
                      file.upload.then(function(response){
                        console.log("response:",response);
                     
                
                      }
                    );
                    }
                    
                  }]);




   
