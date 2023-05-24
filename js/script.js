let input = document.querySelector("input");
let button = document.querySelector("button");
let task = document.querySelector(".new-task");
//Array to add the tasks
let ArrofTasks = [];


//Add the loal storage to Array
if (localStorage.getItem("tasks")){
    ArrofTasks = JSON.parse(localStorage.getItem("tasks"));
}
getDatafromlocal()

button.onclick = function () {
    if (input.value !== "") {
        AddTaskToArr(input.value);
        input.value ="";
    }
}

//delet click 
task.addEventListener("click" , (e) => {
    //is it a delet span?
    if(e.target.classList.contains("del") )
    //remove el from page
    e.target.parentElement.remove();
    //remove el from local storeg
    deletfromlocal(e.target.parentElement.getAttribute("data-id"));
    //Add Done class
    if( e.target.classList.contains("task")){
        //toggle complet tasks
        togeleTaskcomplet(e.target.getAttribute("data-id"))
        //toggle done class
        e.target.classList.toggle("done");
    };
})

function AddTaskToArr(el) {
    const tasks = {
        id : Date.now(),
        titel : el ,
        complet : false,
    }
    ArrofTasks.push(tasks);
    //Add task to page
    AddTasksToPage(ArrofTasks)
    //Add task to local storage
    AddtoLocal(ArrofTasks)   
}

function AddTasksToPage(ArrofTasks) {
    task.innerHTML = "" ;
    //looping on Array of task
    ArrofTasks.forEach((tasks) => {
        let div = document.createElement("div");
        div.className = "task";
        if (tasks.complet) {
            div.className = "task done"; 
        }
        div.setAttribute("data-id" , tasks.id );
        div.appendChild(document.createTextNode(tasks.titel));
        console.log(div);

        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delet"));
        div.appendChild(span);
        //Add task div in page
        task.appendChild(div);
    }); 
}
function AddtoLocal (ArrofTasks) {
    window.localStorage.setItem("tasks" , JSON.stringify(ArrofTasks));
}
function getDatafromlocal(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let thetask = JSON.parse(data);
        AddTasksToPage(thetask);
    }
}

//remove el from local storeg
function deletfromlocal(taskid){
    ArrofTasks = ArrofTasks.filter((tasks) => tasks.id != taskid);
    //Add to local storeg after delet one of them
    AddtoLocal(ArrofTasks);
}

function togeleTaskcomplet(taskid){

    for (let i = 0; i < ArrofTasks.length; i++) {
        if (ArrofTasks[i].id == taskid) {
            ArrofTasks[i].complet == false ? (ArrofTasks[i].complet = true) : (ArrofTasks[i].complet = false) ;
        }
    }
    AddtoLocal(ArrofTasks);

}