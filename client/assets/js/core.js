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
            controller: 'conversionsController',
            resolve: {
                documents: function(conversionsService){
                    return conversionsService.getDocuments();
                }
            }
        })
});
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
app.factory('conversionsService', function($http){
    var path = 'http://' +window.location.host+ '/api/conversions/';
    var service = {
        getDocuments: function(){
            return $http.get(path + "getDocuments").then(function (response) {
                return response.data;
            });
        },
        convertFile: function(name,type){
            return $http.get(path + "convertFile?name=" + name + '&type=' + type).then(function (response) {
                return response.data;
            });
        } 
    }

    return service;
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