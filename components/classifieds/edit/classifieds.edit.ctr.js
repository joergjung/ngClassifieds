 (function() {
     
     "use strict";
     
     angular
        .module('ngClassifieds')
        .controller('editClassifiedsCtrl', function(
            $scope,
            $state,
            $mdSidenav,
            $mdDialog,
            $timeout,
            classifiedsFactory) {
            
            // define capture variables (vm = View Model)
            var vm = this;
            // reference to Firebase
            vm.classifieds = classifiedsFactory.ref;
            // get the record of the Firebase data object
            vm.classified = vm.classifieds.$getRecord($state.params.id);
            vm.toggleSidebar = toggleSidebar;
            vm.saveEdit = saveEdit;
            
            $timeout(function() {
                $mdSidenav('left').toggle();
            });    
            
            $scope.$watch('vm.sidenavOpen', function(sidenav) {
                if(sidenav === false) {
                    $mdSidenav('left')
                        .toggle()
                        .then(function() {
                            $state.go('classifieds');
                        });
                }
            }); 
            
            function toggleSidebar() {
                vm.sidenavOpen = false;
            }
            
            function saveEdit(classified) {
                // save to Firebase (creates a promise, the callback function emits data and closes the sidebar)
                vm.classifieds.$save(vm.classified).then(function() {
                    $scope.$emit('editSaved', 'Edit saved!');
                    vm.sidenavOpen = false;     
                });            
            }
        });
 })(); 
 