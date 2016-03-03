 (function() {
     
     "use strict";
     
     angular
        .module('ngClassifieds')
        .controller('newClassifiedsCtrl', function(
            $scope,
            $state,
            $mdSidenav,
            $mdDialog,
            $timeout,
            classifiedsFactory) {
            
            // define capture variables (vm = View Model)
            var vm = this;
            vm.toggleSidebar = toggleSidebar;
            vm.saveClassified = saveClassified;
       
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
            
            function saveClassified(classified) {
                if(classified) {
                    classified.contact = {
                        name: "Tom Beringer",
                        phone: "923923 27723472",
                        email: "tberng@gmail.com"    
                    };
                    
                    // emit data to the parent controller (classifieds.ctr)
                    $scope.$emit('newClassified', classified);
                    vm.sidenavOpen = false;
                }                
            }
        });
 })();