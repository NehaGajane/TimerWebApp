const hr = document.getElementById("hoursInput");
const min = document.getElementById("minutesInput");
const sec = document.getElementById("secondsInput");
const set = document.getElementById("set");
const container = document.querySelector(".timersContainer");
const stopSound = document.getElementById("timer-end");


function noTimerCheck(){
    if(container.childElementCount == 0){

        //when there is no timer active
        const noTimerMsg = document.createElement("p");
        noTimerMsg.textContent = "You have no timers currently!";
        document.querySelector(".noTimer").appendChild(noTimerMsg);
    }
    else {
        document.querySelector(".noTimer").innerHTML = "";
    }
}

noTimerCheck();


function formatTime(hours,minutes,seconds) {
    return (
        padZero(hours) +' '+' '+':' +' '+' '+
        padZero(minutes) +' '+' '+':'+' '+' '+
        padZero(seconds)
    );
}

//place zero at the begining if input is less than 10
function padZero(num){
    return num < 10 ? '0' + num : num;
}

set.addEventListener('click', () => {
    const hours = parseInt(hr.value) || 0;
    const minutes = parseInt(min.value) || 0;
    const seconds = parseInt(sec.value) || 0;

    //calculate time total
    let totalTimeInSec = hours * 3600 + minutes * 60 + seconds;
    
    //timer element 
    const activeTimer = document.createElement("div");
    activeTimer.classList.add("timerElementCount");
    let text = document.createElement("p");
    text.innerText = "Time Left: ";
    let p = document.createElement("p");
    p.textContent = formatTime(hours, minutes, seconds);

    //delete btn 
    const deleteButton = document.createElement('button');
    deleteButton.classList.add("deleteBtn");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', ()=> {
        activeTimer.remove(text,activeTimer,deleteButton);
        clearInterval(intervalId);
        noTimerCheck();
    });

    
    // Append the timer element to the container 
    activeTimer.append(text,p,deleteButton);
    container.append(activeTimer);
   
    noTimerCheck();

    // Start timer using setInterval
    const intervalId = setInterval( ()=> {
        if(totalTimeInSec > 0){
            totalTimeInSec--;

            // update active timer 
            p.textContent = formatTime(
                Math.floor(totalTimeInSec / 3600),
                Math.floor((totalTimeInSec % 3600) / 60),
                totalTimeInSec % 60
            );
        } else {
            clearInterval(intervalId);
            activeTimer.classList.add("isFinished");
            text.textContent = "";
            p.textContent = "Timer is Up !";
            deleteButton.textContent = "Stop";
            stopSound.play();   
        }
    },1000);
    
    deleteButton.addEventListener('click',()=>{
        stopSound.pause();
    });

});
