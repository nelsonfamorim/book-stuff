app.controller('RootController', function($scope) {
    $scope.headerText = "";
    $scope.actions = [];

    $scope.updateHeaderText = function(text){
        $scope.headerText = text;
    };

    $scope.setActions=function(actions){
        $scope.actions = actions;
    };
});