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
            vm.toggleSidebar = toggleSidebar;
            vm.saveEdit = saveEdit;
            // grabs the classified object from the state params (classifieds.ctr) and puts it on vm.classified
            vm.classified = $state.params.classified;
       
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
                $scope.$emit('editSaved', 'Edit saved!');
                vm.sidenavOpen = false;             
            }
        });
 })(); 