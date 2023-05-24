let input = document.querySelector("input");
let submit = document.querySelector("button");
let taskDiv = document.querySelector(".new-task");

let arrrayOfTasks = [];

if (localStorage.getItem("tasks")) {
    arrrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}
getFromLocal();

submit.onclick = function () {
    if (input.value !== " ") {
        addToArry(input.value);
    }
    input.value = " ";
}

function addToArry(el) {
    task= {
        id : Date.now(),
        titel : el,
        completed : false,
    }
    arrrayOfTasks.push(task);
    addtaskToPage(arrrayOfTasks);
    addtolocalStorge(arrrayOfTasks)
}
function addtaskToPage(arrrayOfTasks) {
    taskDiv.innerHTML = "";
    arrrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task" ;
        if (task.completed) {
            div.className = "done task" ;
        }
        div.setAttribute("data-id" , task.id);
        div.appendChild(document.createTextNode(task.titel));
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delet"));
        div.appendChild(span);
        taskDiv.appendChild(div);
    });
    
}
function addtolocalStorge(arrrayOfTasks) {
    window.localStorage.setItem("tasks" , JSON.stringify(arrrayOfTasks));

}

function getFromLocal() {
  let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addtaskToPage(tasks);
    }
}

//delet and done divs

taskDiv.addEventListener ("click" , function (e) {
    if (e.target.classList.contains("del")) {
        deletFromLocal(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    if (e.target.classList.contains("task")) {
        toggleWithId(e.target.getAttribute("data-id"))
        e.target.classList.toggle("done");
    }
})

function deletFromLocal (el){
    arrrayOfTasks = arrrayOfTasks.filter ((task) => task.id != el);
    addtolocalStorge(arrrayOfTasks);
}

function toggleWithId(el) {
    for (let i = 0; i < arrrayOfTasks.length; i++) {
        if (arrrayOfTasks[i].id == el) {
            arrrayOfTasks[i].completed == false ? (arrrayOfTasks[i].completed = true) : (arrrayOfTasks[i].completed = false);
        }
    }
    
    addtolocalStorge(arrrayOfTasks);
}