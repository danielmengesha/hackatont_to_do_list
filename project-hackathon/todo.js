
let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
  todo: [],
  completed: []
};

// Remove and complete icons in SVG format
let removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
let completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

renderTodoList();

// User clicked on the add button
// If there is any text inside the item field, add that text to the todo list
document.getElementById('add').addEventListener('click', function () {
  let value = document.getElementById('item').value;
  if (value) {
    addItem(value);
  }
});

document.getElementById('item').addEventListener('keydown', function (e) {
  let value = this.value;
  if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
    addItem(value);
  }
});

function addItem(value) {
  addItemToDOM(value);
  document.getElementById('item').value = '';

  data.todo.push(value);
  dataObjectUpdated();
}

function renderTodoList() {
  if (!data.todo.length && !data.completed.length)
    return;

  for (let i = 0; i < data.todo.length; i++) {
    let value = data.todo[i];
    addItemToDOM(value);
  }

  for (let j = 0; j < data.completed.length; j++) {
    let value = data.completed[j];
    addItemToDOM(value, true);
  }
}

function dataObjectUpdated() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem() {
  let item = this.parentNode.parentNode;
  let parent = item.parentNode;
  let id = parent.id;
  let value = item.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }
  dataObjectUpdated();

  parent.removeChild(item);
}

function completeItem() {
  let item = this.parentNode.parentNode;
  let parent = item.parentNode;
  let id = parent.id;
  let value = item.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }
  dataObjectUpdated();

  // Check if the item should be added to the completed list or to re-added to the todo list
  let target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

// Adds a new item to the todo list
function addItemToDOM(text, completed) {
  let list = (completed) ? document.getElementById('completed') : document.getElementById('todo');

  let item = document.createElement('li');
  item.innerText = text;

  let buttons = document.createElement('div');
  buttons.classList.add('buttons');

  let remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeSVG;

  // Add click event for removing the item
  remove.addEventListener('click', removeItem);

  let complete = document.createElement('button');
  complete.classList.add('complete');
  complete.innerHTML = completeSVG;

  // Add click event for completing the item
  complete.addEventListener('click', completeItem);

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);

  list.insertBefore(item, list.childNodes[0]);
}

/////////********************set the period cleaning on the title ********************** ////////////////////


// we retrieve the cleaning period title
let title = document.querySelector('#title');

// we declare some variables for time calculations

let date = new Date();
let day = date.getDate();
let newDate = date.setDate(day + 10);
let nextCleaningDateInMs = new Date(newDate);
let newDay = nextCleaningDateInMs.getDate();

let now = Date.now();

// 10 days period in milliseconds
console.log(newDate - now);
let mSUntilNewStart = (newDate - now);

// we set the Months names in an array to call them by name
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



//////////////************rotate flatmates every ten days**********//////////////////

// get all flatmates inside the table
let persons = document.querySelectorAll(".person");

//create a flatmate object 

let flatmate = {
  name: ["DANIEL", "JOHN", "DARIUSH"],
  starsCount: function () {

  }
}
let rooms = {
  name: ["Kitchen", "Toilet", "Corridor"],
  cleanState: function () {

  }
}


////////////*******rotate the flatmate**********/


let newArrayPersons = [];
function rotateFlatmates() {

  for (let i = 0; i < flatmate.name.length; i++) {
    newArrayPersons.push(flatmate.name[i + 1]);
  }
  newArrayPersons.pop();
  newArrayPersons.push(flatmate.name[0]);

  for (let i = 0; i < persons.length; i++) {
    persons[i].innerHTML = newArrayPersons[i];

  }
  return flatmate.name = newArrayPersons;

}


//////////////*****function to start the app*///////////////

function start() {
  title.innerHTML = `CLEANING PERIOD FROM ${day} OF ${months[date.getMonth()].toUpperCase()} TO ${newDay} OF ${months[nextCleaningDateInMs.getMonth()].toUpperCase()}`;
  console.log(title);
  rotateFlatmates();
  setInterval(function startNewPeriod() {
    title.innerHTML = `CLEANING PERIOD FROM ${day} OF ${months[date.getMonth()].toUpperCase()} TO ${newDay} OF ${months[nextCleaningDateInMs.getMonth()].toUpperCase()}`;

    rotateFlatmates();
  }, mSUntilNewStart);
};



////////////////**************add stars on click**********************//////////////////


let checkButtons = document.querySelectorAll('input[type=checkbox]');
let stars = document.querySelectorAll('.fa');



for (checkButton of checkButtons) {
  checkButton.addEventListener('click', addStar);
}


let count1 = 0;
let count2 = 0;
let count3 = 0;
function addStar(id) {
  if ((count1 === 1) && (this.id == "check-cleaning-1")) {
    alert(`You've already checked once during this cleaning period!`);
  } else if ((count2 === 0) && (this.id === "check-cleaning-1")) {
    alert(`Are you sure that you've cleaned the ${rooms.name[0]}?`);
    stars[count1].classList.add('checked');
    count1++;
  }

  if ((count2 === 1) && (this.id == "check-cleaning-2")) {
    alert(`You've already checked once during this cleaning period!`);
  } else if ((count2 === 0) && (this.id === "check-cleaning-2")) {
    alert(`Are you sure that you've cleaned the ${rooms.name[1]}?`);
    stars[count2 + 3].classList.add('checked');
    console.log(count2 + 3);
    count2++;
  }

  if ((count3 === 1) && (this.id == "check-cleaning-3")) {
    alert(`You've already checked once during this cleaning period!`);
  } else if ((count3 === 0) && (this.id === "check-cleaning-3")) {
    alert(`Are you sure that you've cleaned the ${rooms.name[2]}?`);
    stars[count3 + 6].classList.add('checked');
    console.log(count3 + 6);
    count3++;
  }
}






function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }



  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 10 * 24 * 60 * 60 * 1000);
initializeClock('clockdiv', deadline);
