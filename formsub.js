
let thename = document.querySelector("[name = 'user_name']");
let theage = document.querySelector("[name = 'age']");
 console.log(thename.value.length)

document.forms[0].onsubmit = function (e) {
    let has_name = false;
    let has_age = false;
 
    if (thename.value !== " " && thename.value.length <=10) {
        has_name = true;
    }
    if (theage.value !== " " && theage.value.length <=2){
        has_age = true;
    }

    if(has_name === false || has_age === false){
        e.preventDefault();
    }
};