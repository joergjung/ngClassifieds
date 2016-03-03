(function() {

    "use strict";
    
    angular
        .module("ngClassifieds")
        .controller("classifiedsCtrl", function(
            $scope,
            $state,
            $http,
            classifiedsFactory,
            $mdSidenav,
            $mdToast,
            $mdDialog) {
            
            // define capture variables (vm = View Model)
            var vm = this;
            
            vm.categories;
            vm.classified;
            vm.classifieds;
            vm.deleteClassified = deleteClassified;
            vm.editClassified = editClassified;
            vm.saveClassified = saveClassified;
            vm.editing;
            vm.saveEdit = saveEdit;
            vm.toggleSidebar = toggleSidebar;
            
            // pull data from Firebase
            vm.classifieds = classifiedsFactory.ref;
            // getCategories ($loaded function is provided by Firebase)
            vm.classifieds.$loaded().then(function(classifieds) {
                vm.categories = getCategories(classifieds); 
            });
            
            // listen to emitted data from the classifieds.new controller (a child controller)
            $scope.$on('newClassified', function(event, classified) {
                // add to Firebase
                vm.classifieds.$add(classified);
                showToast('Classified save!');
            });
            
            // listen to emitted data from the classifieds.edit controller (a child controller)
            $scope.$on('editSaved', function(event, message) {
                showToast(message);
            });
            
            var contact = {
                name: "Tom Beringer",
                phone: "923923 27723472",
                email: "tberng@gmail.com"
            };
            
            function toggleSidebar() {
                $state.go('classifieds.new');            
            }

            function saveClassified(classified) {
                if (classified) {
                    classified.contact = contact;
                    vm.classifieds.push(classified);    
                    vm.classified = {};
                    toggleSidebar();
                    showToast("Classified Saved");
                }
            }
            // change state + add URL parameters classified id and classified object
            function editClassified(classified) {
                $state.go('classifieds.edit', {
                    // State Parameter "$id" is hashed id from Firebase Array
                    id: classified.$id
                });
            }
            
            function saveEdit(classified) {
                vm.editing = false;
                vm.classified = {};
                toggleSidebar();
                showToast("Edit Saved");
            }
            
            function deleteClassified(event, classified) {
                // configure the confirm dialog
                var confirm = $mdDialog.confirm()
                    .title('Really delete ' + classified.title + ' ?')
                    .ok('Yes')
                    .cancel('No')
                    .targetEvent(event);
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
            
            function getCategories(classifieds) {
                var categories = [];

                // each object in the whole classifieds array will be stored in "item"
                angular.forEach(classifieds, function(item) { 

                    // each object in the categories array will be stored in "category"
                    angular.forEach(item.categories, function(category) {
                        categories.push(category);  
                    });
                });
                // use lodash's uniq function (return only unique categories from the categories array) 
                return _.uniq(categories); 
            }
        });
})();
