
angular.module('littleToDoApp', ['littleToDoApp.services', 'littleToDoApp.controllers', 'littleToDoApp.directives'])

angular.module('littleToDoApp').run(function($rootScope) {
    $rootScope.title = "Little To-Do App"
})