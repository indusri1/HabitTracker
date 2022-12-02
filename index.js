document.querySelector("form").addEventListener("submit", addHabit);
const message = document.querySelector('#message')
function addHabit(event) {
  event.preventDefault();
  let inputField = document.querySelector('input')
  const habit = document.createElement('li')
  const habitTitle = document.createElement("span");
  habitTitle.textContent = inputField.value;
  habitTitle.addEventListener("click", crossOffHabit);
  habit.appendChild(habitTitle)

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", deleteHabit);
  habit.appendChild(deleteBtn);

  const list = document.querySelector("ul");
  list.appendChild(habit);
  inputField.value = ''
}

function deleteHabit(event) {
    message.textContent = `${event.target.parentNode.firstChild.textContent} deleted!`
    
    message.textContent = `Habit deleted!`

    revealMessage()

    event.target.parentNode.remove();
}

function crossOffHabit(event) {
    event.target.classList.toggle('checked')

    if (event.target.classList.contains('checked') === true) {        
        message.textContent = `${event.target.textContent} finished!`
    } else {
        message.textContent = `${event.target.textContent} added back!`
    }

    revealMessage()
}


function revealMessage() {
    
    setTimeout(() => {
        message.classList.add('hide')
    }, 1000)
}