
angular.module('littleToDoApp.directives', [])
    .directive('inpt', function($timeout) {
        return {
            restrict : 'AE',
            link : function(scope, element, attrs) {
                  var str = ''
                element.bind('keyup', function(e) {
                    str = e.target.value
                    if (!scope.validate_string(str)) {
                        scope.error = 'Use only letter for first character'
                        $timeout(function() {
                            scope.newtask = ''
                         })
                    } else {
                        $timeout(function() {
                            scope.error = ''
                         })
                    }
                })
            },
            controller : function($scope, toDoService) {
                $scope.validate_string = function(str) {
                    return toDoService.validate_string(str)
                }
            }
        }    
    })
    .directive('btnPlus', function() {
        return {
            restrict: 'AEC',
            link : function(scope, element, attrs) {
                element.bind("mouseover", function(e) {
                    e.stopPropagation()
                    $(this).children('.plus_sign').css({
                        transform: 'rotate(90deg)',
                        transition: '1s'
                    })
                })
                element.bind("mouseout", function(e) {
                    e.stopPropagation()
                    $(this).children('.plus_sign').css({
                        transform: 'rotate(-90deg)',
                        transition: '1s'
                })
            })
        }
    }
})
