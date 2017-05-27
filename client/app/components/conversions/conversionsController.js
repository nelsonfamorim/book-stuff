app.controller('conversionsController', function($scope) {
    $scope.text2= "World";

    $scope.convertPDF = function(){
        alert('convert pdf');
    }

    $scope.convertHTML = function(){
        alert('convert html');
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