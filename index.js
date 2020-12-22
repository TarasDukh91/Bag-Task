const form = document.getElementById("main_form")

const divForm = document.querySelector(".div--form")

const startTimeInput = document.querySelector(".main__input--time--start")
const endTimeInput = document.querySelector(".main__input--time--end")
let regexp = /^([0-9]|0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9])?$/ 
let formArray = []

function hourParser(timeValue)  {
    let time = [0, 0];
    let maxTime = time.length
    let timer = (timeValue || ':').split(":")
    for(let i = 0; i < maxTime; i++) {
        timer[i] = isNaN(parseInt(timer[i])) ? 0 : parseInt(timer[i])
    }
    
    for(let i =  0; i < maxTime; i++){
        time[i] = timer[i]
    }
    
    let hour = time[0]
    let minute = time[1]
    
    if(minute > 60) {
        let h = (minute / 60) << 0;
        hour += h
        minute -= 60 * h;
    }
    if(hour > 24) {
        let errorMassage = document.querySelector(".error--massage");
        errorMassage.setAttribute("class", "show--massage");
    }    
    return ("0" + hour).slice(-2) + ":" + ("0" + minute).slice(-2)
}


function onInputChange(element) {
    let timeValue = element.value
    element.value = hourParser(element.value)
    
    console.log(element.value)

    if(!regexp.test(timeValue)){
        let errorMassage = document.querySelector(".error--massage");
        errorMassage.setAttribute("class", "show--massage");
    }
   
}

function AddNewElementToUi(){
    
    let newDivForm = divForm.cloneNode(true)
    newDivForm.setAttribute("id", addIndex());
    formArray.push(newDivForm)

    form.appendChild(newDivForm);
    console.log(newDivForm)
    
    refreshStates();
}


let currentIndex = 1
const addIndex = () => {
    currentIndex++
    return `div__form_${currentIndex}`
}


const createForm = document.querySelector(".main__add--button").addEventListener("click", AddNewElementToUi)
const submitForm = document.querySelector(".submit").addEventListener("click", onSubmit)

function onSubmit() {
    const rows = document.querySelector(".div--form");
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        
        const checkboxes = row.getElementsByClassName("checkbox");
        const days = collectCheckBoxData(checkboxes);
    };
    
}


function collectCheckBoxData(dayList) {
    const activeDay = [];

    for(let i = 0; i < dayList.length; i++) {
        const checked = dayList[i];
        if(checked.checked){
            activeDay.push(i)
        }
    }
    console.log(activeDay)
    return activeDay;
}

function refreshStates() {
    let checkedIndexes = [];

    const checkboxes = document.getElementsByClassName("checkbox");
    
    for(let i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked) {
            console.log(checkboxes[i].value);
            checkedIndexes.push(+checkboxes[i].value)
        }
    }

    checkedIndexes = Array.from(new Set(checkedIndexes));

    for(let i = 0; i < checkboxes.length; i++) {
        const check = checkboxes[i];
        check.disabled = !check.checked && checkedIndexes.includes(+check.value);
    }
}

function onCheckboxChange(checkbox) {
    refreshStates();
}

function ischeckboxDisabled(checkboxIndex) { 
    const rows = [];
    const allCheckbox = [];
    console.log(allCheckbox)
    return allCheckbox.includes(checkboxIndex);
}