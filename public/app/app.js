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