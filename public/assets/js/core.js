var app = angular.module('app', ['ui.router','toastr','ng.sockjs']);

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

app.value('ngSockUrl', '/realtime');
app.controller('conversionsController', function($scope, documents, conversionsService, toastr, socket) {
    $scope.documents=documents;

    $scope.convertPDF = function(){
        var index = _.countBy(documents, 'type').PDF || 0;
        conversionsService.convertFile('PDF #' + index++,'PDF');
    }

    $scope.convertHTML = function(){
        var index = _.countBy(documents, 'type').HTML || 0;
        conversionsService.convertFile('HTML #' + index++,'HTML');
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

    showToast = function(text, icon){
        toastr.info('<div class="toast-message">' +
                    '<div class="toast-icon"><span class="glyphicon glyphicon-'+icon+'" aria-hidden="true"></div>'+
                    '<div class="toast-text"><span>'+text+'</span></div>'+
                '</div>', null, {
                    timeOut: 5000,
                    allowHtml: true
                });
    }

    socket.onOpen(function(){
        console.log('Socket Established');
    });

    socket.onMessage(function(data){
        var index = _.findIndex($scope.documents, {_id: data._id});
        if(index>-1)
            $scope.documents.splice(index, 1, data);
        else
            $scope.documents.push(data);
        var text, icon;
        switch(data.status){
            case "queue":
                text = 'Request ' + data.name + ' queued.';
                icon = 'info-sign';
                break;
            case "processing":
                text = 'Request ' + data.name + ' is processing.';
                icon = 'repeat';
                break;
            case "ready":
                text = 'Request ' + data.name + ' is processed.';
                icon = 'ok';
                break;
        }
        showToast(text, icon);
    });
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
            return $http.get(path + "convertFile?name=" + encodeURIComponent(name) + '&type=' + type).then(function (response) {
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