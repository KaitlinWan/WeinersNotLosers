//Animate the element
//Waits for previous animation to end before next animation
//Credit https://github.com/anschwa/ for his javascript function
//for type testing
$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          //The ended animation
          return animations[t];
        }
      }
    })(document.createElement('div'));
    //Add the animated class to the element
    //Once the animation has ended, remove the class.
    this.addClass('animated ' + animationName).one(animationEnd, function() {
      //console.log(this.className);
      $(this).removeClass('animated ' + animationName);
      if (typeof callback === 'function') callback();
    });

    return this;
  },
});

//Gets the words from the hidden paragraph in index.html
//Makes a list from the words and adds the words to the typing section

let wordList = "";
var getWords = function() {
  var text = document.getElementById('words').innerHTML;
  wordList = text.split(" ");
  // console.log(wordList);
  //alert(wordList);
  addWords();
};

// Add words to word-section
var addWords = function(args) {
  // clear existing word-section
  let wordSection = $("#word-section")[0];
  // console.log(wordSection);
  wordSection.innerHTML = "";
  $("#typebox")[0].value = "";

  for (let i = 0; i < wordList.length; i++) {
    let words = wordList;
    // console.log("in add words");
    // console.log(words);
    let wordSpan = `<span>${words[i]}</span>`;
    wordSection.innerHTML += wordSpan;
  }
  // mark first word as current-word
  wordSection.firstChild.classList.add("current-word");

}

//Toggles the hidden paragraph that says you don't have enough hotdogs to buy item
/*var allowed = false;

function toggle() {
  //alert("toggle");
  if (document.getElementById("allowed").style.visibility === "visible" && allowed == true) {
    document.getElementById("allowed").style.visibility = "hidden"
  } else {
    document.getElementById("allowed").style.visibility = "visible"
  }
  allowed = false;
}*/

// Data pertaining to the words such as # correct
let wordData = {
  seconds: 60,
  correct: 0,
  incorrect: 0,
  streak: 0,
  total: 0,
  typed: 0
};


//Inventory of the user



var isloggedin = document.getElementById("loggedinmeta");
var hd = document.getElementById("hdmeta").getAttribute('name');
var gm = document.getElementById("gmmeta").getAttribute('name');
var sp = document.getElementById("spmeta").getAttribute('name');

let inventory = {
  hotdogs: parseInt(hd),
  multiplier: 1,
  shops: parseInt(sp),
  grandmas: parseInt(gm)
};

console.log(hd);

//Updates the number of hot dogs in inventory
var getNumDogs = function() {

  if (wordData.correct == 0) {
    inventory.hotdogs = 0;
  } else {
    inventory.hotdogs += (inventory.multiplier);
  }
  //target.innerHTML = `<p> Number of hotdogs: ${inventory.hotdogs}</p>`;
};

//Updates the multiplier in inventory
var getMultiplier = function() {

  if (wordData.streak == 0) {
    inventory.multiplier = 1;
  } else if (wordData.streak % 2 == 0) {
    inventory.multiplier = Math.floor((wordData.streak / 2));
  }
  //target.innerHTML += `<p> Multiplier: ${inventory.multiplier} </p>`;
};

var getNumShops = function(cost) {
  if (inventory.hotdogs >= cost) {
    inventory.shops += 1;
    inventory.hotdogs -= cost;
    console.log("Added a shop");
    //allowed = true;
    //Display is called since user should see shop
    //in the inventory right after clicking btn
    display();
  }

};

//Updates number of grandmas
var getNumGrandmas = function(cost) {

  if (inventory.hotdogs >= cost) {
    inventory.grandmas += 1;
    inventory.hotdogs -= cost;
    console.log("Added a grandma");
    //allowed = true;
    //Display is called since user should see shop
    //in the inventory right after clicking btn
    display();
  }
};

var doWork = function() {
    // ajax the JSON to the server
    // console.log("heyyyy");
    var getHotdogs = document.getElementById("numhotdogs");
    var numHotdogs = getHotdogs.textContent;

    var getGrandmas = document.getElementById("numgrandmas");
    var numGrandmas = getGrandmas.textContent;

    var getShops = document.getElementById("numshops");
    var numShops = getShops.textContent;

    var getMultiplier = document.getElementById("multiplier");
    var theMultiplier  = getMultiplier.textContent;

    $.ajax({
        url : "/update",
        type : "POST",
        contentType: 'application/json',
        data: JSON.stringify({
            hotdogs: numHotdogs,
            grandmas: numGrandmas,
            shops: numShops,
        }),
        crossdomain: true,
    });
    console.log(numGrandmas);

    // console.log("Hotdogs: " + numHotdogs);
    // event.preventDefault();
};

//Displays the inventory on the main page
var display = function() {
  let target = $("#inventory")[0];
  target.innerHTML = "<h4>Inventory</h4>";
  // console.log(inventory.hotdogs);
  target.innerHTML += `<p> Number of hotdogs: <p id="numhotdogs">${Math.floor(inventory.hotdogs)}</p></p>`;
  target.innerHTML += `<p> Multiplier: <p id="multiplier">${inventory.multiplier}</p></p>`;
  target.innerHTML += `<p> Shops: <p id="numshops">${inventory.shops}</p></p>`;
  target.innerHTML += `<p> Grandmas: <p id="numgrandmas">${inventory.grandmas}</p></p>`;
  let head = $("#numTop")[0];
  head.innerHTML = `<p>You have ${Math.floor(inventory.hotdogs)} hotdogs!</p>`;
}
/******************************************
After hitting <space> if value == current-word, mark as correct-word
else, mark as incorrect-word
if value.length != current-word[:value.length] (typing the word wrong), mark as incorrect-word
else, mark as current-word
*******************************************/

//Checks for word correctness
var checkWord = function(word) {
  let wlen = word.value.length;
  // how much we have of the current word.
  let current = $(".current-word")[0];
  let currentSubstring = current.innerHTML.substring(0, wlen);
  // check if we have any typing errors
  if (word.value.trim() != currentSubstring) {
    current.classList.add("incorrect-word-bg");
    return false;
  } else {
    current.classList.remove("incorrect-word-bg");
    return true;
  }
}

var submitWord = function(word) {
  // update current-word and
  // keep track of correct & incorrect words
  let current = $(".current-word")[0];
  if (checkWord(word)) {
    current.classList.remove("current-word");
    current.classList.add("correct-word-c");
    //Animates the hot dog if the typed word was correct
    $('#hotdog').animateCss('rubberBand');
    wordData.correct += 1;
    wordData.streak += 1;
    getNumDogs();
    // console.log(inventory.hotdogs)
    //getMultiplier();
  } else {
    current.classList.remove("current-word", "incorrect-word-bg");
    current.classList.add("incorrect-word-c");
    wordData.incorrect += 1;
    wordData.streak = 0;
    //getMultiplier();
    //console.log(wordData.streak)
  }
  //getNumDogs();
  getMultiplier();
  display();
  doWork();
  // update wordData
  wordData.total = wordData.correct + wordData.incorrect;

  // make the next word the new current-word.
  current.nextSibling.classList.add("current-word");
}

var clearLine = function() {
  // remove past words once you get to the next line
  let wordSection = $("#word-section")[0];
  let current = $(".current-word")[0]; // first word of second line
  let previous = current.previousSibling; // last word of first line
  let children = $(".correct-word-c, .incorrect-word-c").length;

  /* <span>'s on the next line have a greater offsetTop value
   than those on the top line.
   Remove words until the first word on the second line
   is the fistChild of word-section.*/
  if (current.offsetTop > previous.offsetTop) {
    for (let i = 0; i < children; i++) {
      wordSection.removeChild(wordSection.firstChild);
    }
  }
}

//Deals with the timer
var isTimer = function(seconds) {
  let time = seconds;
  // only set timer once
  let one = $("#timer > span")[0].innerHTML;
  if (one == "1:00") {
    let typingTimer = setInterval(() => {
      if (time <= 0) {
        clearInterval(typingTimer);
      } else {
        time -= 1;
        //Add hotdogs based on items per shop on a per second basis
        inventory.hotdogs += (inventory.shops / 7);
        inventory.hotdogs += 3 * (inventory.grandmas / 7);
        display();
        //For every second, a shop will produce 1 hotdog
        let timePad = (time < 10) ? ("0" + time) : time; // zero padded
        $("#timer > span")[0].innerHTML = `0:${timePad}`;
      }
    }, 1000);
  } else if (one == "0:00") {
    return false;
  }
  return true;
}

//Calculate the words per minute
var calculateWPM = function(data) {
  let {
    seconds,
    correct,
    incorrect,
    total,
    typed
  } = data;
  let min = (seconds / 60);
  let wpm = Math.ceil((typed / 5) - (incorrect) / min);
  let accuracy = Math.ceil((correct / total) * 100);

  if (wpm < 0) {
    wpm = 0;
  } // prevent negative wpm from incorrect words

  // template strings are pretty cool
  let results = `<ul id="results">
    <li>WPM: <span class="wpm-value">${wpm}</span></li>
    <li>Accuracy: <span class="wpm-value">${accuracy}%</span></li>
    <li id="results-stats">
    Total Words: <span>${total}</span> |
    Correct Words: <span>${correct}</span> |
    Incorrect Words: <span>${incorrect}</span> |
    Characters Typed: <span>${typed}</span>
    </li>
    </ul>`;

  $("#word-section")[0].innerHTML = results;

  // color code accuracy
  let wpmClass = $("li:nth-child(2) .wpm-value")[0].classList;
  if (accuracy > 80) {
    wpmClass.add("correct-word-c");
  } else {
    wpmClass.add("incorrect-word-c");
  }

  console.log(wordData);
}

var typingTest = function(e) {
  // console.log("in typing test");
  // Char:        Key Code:
  // <space>      32
  // <backspace>  8
  // <shift>      16
  // [A-Z]        65-90
  // [' "]        222

  // Get key code of current key pressed.
  e = e || window.event;
  let kcode = e.keyCode;
  let word = $("#typebox")[0];

  // check if empty (starts with space)
  if (word.value.match(/^\s/g)) {
    word.value = "";
  } else {
    // Only score when timer is on.
    if (isTimer(wordData.seconds)) {
      checkWord(word); // checks for typing errors while you type
      // <space> submits words
      if (kcode == 32) {
        submitWord(word); // keep track of correct / incorrect words
        clearLine(); // get rid of old words
        $("#typebox")[0].value = ""; // clear typebox after each word
      }
      wordData.typed += 1; // count each valid character typed
    } else {
      // Display typing test results.
      calculateWPM(wordData);
    }
  }
}
//Reloads page
var restartTest = function() {
  $("#typebox")[0].value = "";
  location.reload();
}
