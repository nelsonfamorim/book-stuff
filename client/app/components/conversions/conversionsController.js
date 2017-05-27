app.controller('conversionsController', function($scope, documents, conversionsService) {
    $scope.documents=documents;

    $scope.convertPDF = function(){
        conversionsService.convertFile('abc','PDF');
    }

    $scope.convertHTML = function(){
        conversionsService.convertFile('abc','HTML');
    }

    $scope.updateHeaderText("Conversions");

    $scope.setActions([
        {
            text: "New PDF Conversion",
            callback: $scope.convertPDF
        },
        {
            text: "New HTML Conversion",
            callback: $scope.convertHTML
        }
    ]);
});