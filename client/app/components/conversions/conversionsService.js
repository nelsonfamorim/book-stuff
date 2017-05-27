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