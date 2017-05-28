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