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
            
            // define capture variable (vm = View Model)
            var vm = this;
            vm.toggleSidebar = toggleSidebar;
       
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
        });
 })();