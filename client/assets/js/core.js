var app = angular.module('app', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise('/conversions');

    $stateProvider
        .state({
            name: 'app',
            abstract: true,
            templateUrl: '/components/root/rootView.html',
            controller: 'RootController',
        })
        .state({
            name: 'app.conversions',
            url: '/conversions',
            templateUrl: '/components/conversions/conversionsView.html',
            controller: 'conversionsController'
        })
});
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