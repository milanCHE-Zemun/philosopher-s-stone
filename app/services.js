
angular.module('littleToDoApp.services', []).value("version", "0.1.1")
angular.module('littleToDoApp.services')
  .factory('toDoService', function($interval) {
    var seen = {"do your homework" : true, "clean the house" : true, "wash your hands" : true}
//Data from server --simulation
    //Some starting tasks
    var tasks = ["Do Your Homework", "Clean the house", "Wash your hands"]
    //Data from database
    var random_tasks = ["Do the dishes", "Wash hands", "Go play", "Do Math", "Buy Juice", "Do Your Homework", "Wash hands", "Clean yard", "clean yard", "Wash laundry", "Buy Juice", "do the dishes"]
    var index = 0

    return {
        setTasks : function(value) {
            tasks = value
        },
        getTasks : function() {
            return tasks
        },
        addTask : function(task_name, callback) {
            if (task_name) {
            for (var prop in seen) {
                if (this.match_strings(prop, task_name)) {
                    return callback(new Error('You already have this task'))
                } 
            }
            seen[task_name] = true
            tasks.push(task_name)
            return callback(null, tasks)
            }
        },
        change : function(index, start, end) {
            end.push(start[index])
            start.splice(index, 1)
        },
        add_random_tasks : function(callback) {
        //Brute force
        //Try another aproach
            var new_arr = []
            for (var i = 0; i < random_tasks.length;i ++) {
                if (this.validate_string(random_tasks[i]) && !(random_tasks[i].toLowerCase() in seen)) {
                    seen[random_tasks[i].toLowerCase()] = true
                    new_arr.push(random_tasks[i])          
                }
            }
            var si = $interval(function() {
                if (index == new_arr.length - 1) {                             
                    $interval.cancel(si)
                } 
                   callback(tasks)
                    tasks.push(new_arr[index])
                     index ++
                }, 30000)
        },
        validate_string : function(str) {
            var regex = /[A-Za-z][a-z0-9!#$%^&!]*[a-z0-9!#$%^&\s]*/g
            return str.match(regex) ? true : false
        },
        match_strings : function(str1, str2) {
            var new1 = ''
            var new2 = ''
              var arr1 = str1.split("")
                var arr2 = str2.split("")
                 for (var i in arr1) {
                    if (!(arr1[i].match(/\s/)))
                      new1 += arr1[i].toLowerCase()
                  }
                  for (var j in arr2) {
                    if (!(arr2[j].match(/\s/)))
                      new2 += arr2[j].toLowerCase()
                  }
            return new1 === new2 ? true : false
        }
    }
})