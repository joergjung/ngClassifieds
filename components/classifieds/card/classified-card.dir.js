(function() {
    
    "use strict";
    
    angular
        .module("ngClassifieds")
        .directive("classifiedCard", function() {
            return {
                templateUrl: "components/classifieds/card/classified-card.tpl.html",
                // isolate scope
                scope: {
                    // allow data to come in through the atrribute of the classified-card element (in classifieds.tpl.html) 
                    classifieds: "=classifieds",
                    classifiedsFilter: "=classifiedsFilter",
                    category: "=category"
                },
                controller: classifiedCardController,
                controllerAs: "vm"
            };
            
            function classifiedCardController($state, $scope, $mdDialog) {
                var vm = this;
                vm.editClassified = editClassified;
                // vm.deleteClassified = deleteClassified;
            
                // change state + add URL parameters classified id and classified object
                function editClassified(classified) {
                    $state.go('classifieds.edit', {
                        // State Parameter "$id" is hashed id from Firebase Array
                        id: classified.$id
                    });
                } 
                
                function deleteClassified(event, classified) {
                    // configure the confirm dialog
                    var confirm = $mdDialog.confirm()
                        .title('Really delete ' + classified.title + ' ?')
                        .ok('Yes')
                        .cancel('No')
                        .targetEvent(event)
                        
                    // show the confirm dialog
                    $mdDialog.show(confirm).then(function() {
                        vm.classifieds.$remove(classified);
                        showToast('Classified deleted!');
                    }, function() {
                        // empty function
                    });   
                }
            
                function showToast(message) {
                    $mdToast.show($mdToast.simple()
                        .textContent(message)
                        .position('top right'));
                }  
            }
        });
})();
