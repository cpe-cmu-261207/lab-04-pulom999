
const cout = console.log
if (localStorage.getItem('userData') == null) {
    const dataformat = {
        incompleteArr: [], completeArr: []
    }
    localStorage.setItem('userData', JSON.stringify(dataformat))
}
let pastData = JSON.parse(localStorage.getItem("userData"))

const charCodeCheck = (eve) => {
    if ((eve.which || eve.keyCode) === 13) EnteringInput()
}

function emptyAlert(input) {
    if (input.length == 0 || input.indexOf(' ') == 0) {
        document.getElementById("TaskInput").value = ""
        alert("Cannot add empty task")
        return false
    }
    return true
}

function emptyCheck(inpu){
    if (inpu.length == 0 || inpu.indexOf(' ') == 0) {
        return false
    }
    return true
}

function returnArrIndex(arr, key) {
    for (i = 0; i < arr.length; i++) {
        if (arr[i] === key) return i
    }
    return -1
}


const taskbxCons = (TaskCalled) => {
    const taskName = TaskCalled;
    const taskTe = document.createElement('p')
    const taskBx = document.createElement('div')
    const taskActionBar = document.createElement('div')
    const taskDone = document.createElement('button')
    const taskDel = document.createElement('button')
    const DoneAction = () => {
        taskTe.className = "mainFont text-lg text-center p-1 line-through"
        document.getElementById("CompletedBox").append(taskTe)
        pastData.incompleteArr[returnArrIndex(pastData.incompleteArr, taskName)] = ""
        pastData.completeArr.push(taskName)
        localStorage.setItem('userData', JSON.stringify(pastData))
        taskBx.remove()
    }

    const DeleteAction = () => {
        pastData.incompleteArr[returnArrIndex(pastData.incompleteArr, taskName)] = ""
        localStorage.setItem('userData', JSON.stringify(pastData))
        taskBx.remove()
    }

    const ButtonAppear = () => {
        taskDone.style.visibility = "visible"
        taskDel.style.visibility = "visible"
    }

    const ButtonGone = () => {
        taskDone.style.visibility = "hidden"
        taskDel.style.visibility = "hidden"
    }

    taskBx.className = "max-w-sm mx-auto my-0.5 p-1 border border-pink-400 flex flex-row justify-between"
    taskTe.className = "mainFont text-lg text-center p-1 pr-5"
    taskActionBar.className = "flex flex-row justify-center space-x-2"
    taskDel.className = "p-0.5 border bg-pink-300"
    taskDel.style.visibility = "hidden"
    taskDone.className = "p-0.5 border bg-pink-300"
    taskDone.style.visibility = "hidden"
    taskTe.innerHTML = TaskCalled
    taskDone.innerHTML = "Done"
    taskDel.innerHTML = "Delete"
    taskBx.addEventListener('mouseenter', ButtonAppear)
    taskBx.addEventListener('mouseleave', ButtonGone)
    taskDone.addEventListener("click", DoneAction)
    taskDel.addEventListener("click", DeleteAction)
    taskBx.append(taskTe)
    taskBx.append(taskActionBar)
    taskActionBar.append(taskDone)
    taskActionBar.append(taskDel)
    document.getElementById("TaskBox").prepend(taskBx)
}
const complTaskadding = (complTask) => {
    const taskTe = document.createElement('p')
    taskTe.innerHTML = complTask
    document.getElementById("CompletedBox").append(taskTe)
    taskTe.className = "mainFont text-lg text-center p-1 line-through"
}
const EnteringInput = () => {
    cout("JS: you just add some thing")
    const taskIn = document.getElementById("TaskInput").value

    if (emptyAlert(taskIn)) {
        taskbxCons(taskIn)
        pastData.incompleteArr.push(taskIn)
        localStorage.setItem('userData', JSON.stringify(pastData))

        document.getElementById("TaskInput").value = ""
    }

}
pastData.incompleteArr.map(x => {
    if (emptyCheck(x)) {
        taskbxCons(x)
    }
})
pastData.completeArr.map(x => {
    if (emptyCheck(x)) {
        complTaskadding(x)
    }
})