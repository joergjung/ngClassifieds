(function() {

    "use strict";
    
    angular
        .module("ngClassifieds")
        .controller("classifiedsCtrl", function(
            $scope,
            $http,
            classifiedsFactory,
            $mdSidenav,
            $mdToast,
            $mdDialog) {
            
            classifiedsFactory.getClassifieds().then(function(classifieds) {
                $scope.classifieds = classifieds.data;  
                $scope.categories = getCategories($scope.classifieds);  
            });
            
            var contact = {
                name: "Tom Beringer",
                phone: "923923 27723472",
                email: "tberng@rjrjr.com"
            };
            
            $scope.toggleSidebar = function() {
                $mdSidenav('left').toggle();                
            };

            $scope.saveClassified = function(classified) {
                if (classified) {
                    classified.contact = contact;
                    $scope.classifieds.push(classified);    
                    $scope.classified = {};
                    $scope.toggleSidebar();
                    showToast("Classified Saved");
                }
            };
            
            $scope.editClassified = function(classified) {
              $scope.editing = true;
              $scope.toggleSidebar();
              $scope.classified = classified; 
            };
            
            $scope.saveEdit = function(classified) {
                $scope.editing = false;   
                $scope.classified = {};
                $scope.toggleSidebar();
                showToast("Edit Saved");
            };
            
            $scope.deleteClassified = function(event, classified) {
                // configure the confirm dialog
                var confirm = $mdDialog.confirm()
                    .title('Really delete ' + classified.title + ' ?')
                    .ok('Yes')
                    .cancel('No')
                    .targetEvent(event);
                // show the confirm dialog
                $mdDialog.show(confirm).then(function() {
                    var index = $scope.classifieds.indexOf(classified);
                    $scope.classifieds.splice(index, 1); 
                }, function() {
                    
                });   
            };
            
            function showToast(message) {
                $mdToast.show($mdToast.simple()
                    .textContent(message)
                    .position('top right'));
            }
            
            function getCategories(classifieds) {
                var categories = [];

                // each object in the whole classifieds array will be stored in "item"
                angular.forEach(classifieds, function(item) { 

                    // each object in the categories array will be stored in "category"
                    angular.forEach(item.categories, function(category) {
                        categories.push(category);  
                    });
                });
                // use lodash's uniq (unique) function (return only unique categories from the categories array) 
                return _.uniq(categories); 
            }
        });
})();
