
angular.module('littleToDoApp.controllers', []).controller("HeadController", function($scope) {
    $scope.creator = "milanCHE"
})

angular.module('littleToDoApp.controllers')
    .controller("ToDoController", ["$scope", "toDoService", function($scope, toDoService) {
            
    $scope.error = null
    $scope.completed = []
    $scope.taskname = ''

    $scope.$watch(function() {
        return toDoService.getTasks()
    }, function(nv, ov) {
        if (nv != null) $scope.tasks = nv
    })
    
    toDoService.add_random_tasks(function(t) {
        $scope.tasks = t
    })

    $scope.change = function(index, start, end) {
        return toDoService.change(index, start, end)
    }
    
    $scope.add_task = function(evt) {
        toDoService.addTask($scope.newtask, function(err, t) {
            if (!err) { 
                $scope.newtask = ''
                  $scope.tasks = t
            } else {
                $scope.error = err.message
                  return false
            }
        })
    }
}])