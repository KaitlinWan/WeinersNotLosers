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

var wordList = $("#words")[0];
console.log(wordList.innerHTML);
// Sorted list of the 500 most common English words.
let words = [
  "the", "name", "of", "very", "to", "through", "and", "just", "a",
  "form", "in", "much", "is", "great", "it", "think", "you", "say",
  "that", "help", "he", "low", "was", "line", "for", "before", "on",
  "turn", "are", "cause", "with", "same", "as", "mean", "I", "differ",
  "his", "move", "they", "right", "be", "boy", "at", "old", "one",
  "too", "have", "does", "this", "tell", "from", "sentence", "or",
  "set", "had", "three", "by", "want", "hot", "air", "but", "well",
  "some", "also", "what", "play", "there", "small", "we", "end", "can",
  "put", "out", "home", "other", "read", "were", "hand", "all", "port",
  "your", "large", "when", "spell", "up", "add", "use", "even", "word",
  "land", "how", "here", "said", "must", "an", "big", "each", "high",
  "she", "such", "which", "follow", "do", "act", "their", "why", "time",
  "ask", "if", "men", "will", "change", "way", "went", "about", "light",
  "many", "kind", "then", "off", "them", "need", "would", "house",
  "write", "picture", "like", "try", "so", "us", "these", "again",
  "her", "animal", "long", "point", "make", "mother", "thing", "world",
  "see", "near", "him", "build", "two", "self", "has", "earth", "look",
  "father", "more", "head", "day", "stand", "could", "own", "go",
  "page", "come", "should", "did", "country", "my", "found", "sound",
  "answer", "no", "school", "most", "grow", "number", "study", "who",
  "still", "over", "learn", "know", "plant", "water", "cover", "than",
  "food", "call", "sun", "first", "four", "people", "thought", "may",
  "let", "down", "keep", "side", "eye", "been", "never", "now", "last",
  "find", "door", "any", "between", "new", "city", "work", "tree",
  "part", "cross", "take", "since", "get", "hard", "place", "start",
  "made", "might", "live", "story", "where", "saw", "after", "far",
  "back", "sea", "little", "draw", "only", "left", "round", "late",
  "man", "run", "year", "don't", "came", "while", "show", "press",
  "every", "close", "good", "night", "me", "real", "give", "life",
  "our", "few", "under", "stop", "open", "ten", "seem", "simple",
  "together", "several", "next", "vowel", "white", "toward", "children",
  "war", "begin", "lay", "got", "against", "walk", "pattern", "example",
  "slow", "ease", "center", "paper", "love", "often", "person",
  "always", "money", "music", "serve", "those", "appear", "both",
  "road", "mark", "map", "book", "science", "letter", "rule", "until",
  "govern", "mile", "pull", "river", "cold", "car", "notice", "feet",
  "voice", "care", "fall", "second", "power", "group", "town", "carry",
  "fine", "took", "certain", "rain", "fly", "eat", "unit", "room",
  "lead", "friend", "cry", "began", "dark", "idea", "machine", "fish",
  "note", "mountain", "wait", "north", "plan", "once", "figure", "base",
  "star", "hear", "box", "horse", "noun", "cut", "field", "sure",
  "rest", "watch", "correct", "color", "able", "face", "pound", "wood",
  "done", "main", "beauty", "enough", "drive", "plain", "stood", "girl",
  "contain", "usual", "front", "young", "teach", "ready", "week",
  "above", "final", "ever", "gave", "red", "green", "list", "oh",
  "though", "quick", "feel", "develop", "talk", "sleep", "bird", "warm",
  "soon", "free", "body", "minute", "dog", "strong", "family",
  "special", "direct", "mind", "pose", "behind", "leave", "clear",
  "song", "tail", "measure", "produce", "state", "fact", "product",
  "street", "black", "inch", "short", "lot", "numeral", "nothing",
  "class", "course", "wind", "stay", "question", "wheel", "happen",
  "full", "complete", "force", "ship", "blue", "area", "object", "half",
  "decide", "rock", "surface", "order", "deep", "fire", "moon", "south",
  "island", "problem", "foot", "piece", "yet", "told", "busy", "knew",
  "test", "pass", "record", "farm", "boat", "top", "common", "whole",
  "gold", "king", "possible", "size", "plane", "heard", "age", "best",
  "dry", "hour", "wonder", "better", "laugh", "true", "thousand",
  "during", "ago", "hundred", "ran", "am", "check", "remember", "game",
  "step", "shape", "early", "yes", "hold", "hot", "west", "miss",
  "ground", "brought", "interest", "heat", "reach", "snow", "fast",
  "bed", "five", "bring", "sing", "sit", "listen", "perhaps", "six",
  "fill", "table", "east", "travel", "weight", "less", "language",
  "morning", "among"];

  //////////////////////////////////////////

  // Knuth-Fisher-Yates Shuffle
  // http://bost.ocks.org/mike/shuffle/
  function shuffle(array) {
    let m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  // Add words to word-section

  var addWords = function(args) {
    // clear existing word-section
    let wordSection = $("#word-section")[0];
    console.log(wordSection);
    wordSection.innerHTML = "";
    $("#typebox")[0].value = "";

    for (let i = wordList.length; i > 0; i--) {
      let words = wordList;
      let wordSpan = `<span>${words[i]}</span>`;
      wordSection.innerHTML += wordSpan;
    }
    // mark first word as current-word
    wordSection.firstChild.classList.add("current-word");

  }

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
  let inventory = {
    hotdogs: 0,
    multiplier: 1,
    shops: 0,
    grandmas: 0
  };

  //Updates the number of hot dogs in inventory
  var getNumDogs = function(){

    if(wordData.correct == 0){
      inventory.hotdogs = 0
    }
    else{
      inventory.hotdogs += (inventory.multiplier);
    }
    //target.innerHTML = `<p> Number of hotdogs: ${inventory.hotdogs}</p>`;
  };

  //Updates the multiplier in inventory
  var getMultiplier = function(){

    if(wordData.streak == 0){
      inventory.multiplier = 1;
    }
    else if(wordData.streak % 2 == 0){
      inventory.multiplier = Math.floor((wordData.streak / 2));
    }
    //target.innerHTML += `<p> Multiplier: ${inventory.multiplier} </p>`;
  };

  var getNumShops = function(cost){
    if(inventory.hotdogs >= cost){
    inventory.shops += 1;
    inventory.hotdogs -= cost;
    console.log("Added a shop");
    //Display is called since user should see shop
    //in the inventory right after clicking btn
    display();
  }
};

var getNumGrandmas = function(cost){

  if(inventory.hotdogs >= cost){
  inventory.grandmas += 1;
  inventory.hotdogs -= cost;
  console.log("Added a grandma");
  //Display is called since user should see shop
  //in the inventory right after clicking btn
  display();
}
};

  //Displays the inventory on the main page
  var display = function(){
    let target = $("#inventory")[0];
    target.innerHTML = "<h4>Inventory</h4>";
    console.log(inventory.hotdogs);
    target.innerHTML += `<p> Number of hotdogs: ${Math.floor(inventory.hotdogs)}</p>`;
    target.innerHTML += `<p> Multiplier: ${inventory.multiplier} </p>`;
    target.innerHTML += `<p> Shops: ${inventory.shops} </p>`;
    target.innerHTML += `<p> Grandmas: ${inventory.grandmas} </p>`;
    let head = $("#numTop")[0];
    head.innerHTML = `<p> Number of hotdogs: ${Math.floor(inventory.hotdogs)}</p>`;
  }
  /******************************************
  After hitting <space> if value == current-word, mark as correct-word
  else, mark as incorrect-word
  if value.length != current-word[:value.length] (typing the word wrong), mark as incorrect-word
  else, mark as current-word
  *******************************************/

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
      console.log(inventory.hotdogs)
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

    // <span>'s on the next line have a greater offsetTop value
    // than those on the top line.
    // Remove words until the first word on the second line
    // is the fistChild of word-section.
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
          inventory.hotdogs += (inventory.shops/7);
          inventory.hotdogs += 3*(inventory.grandmas/7);
          display();
          //For every second, a shop will produce 1 hotdog
          let timePad = (time < 10) ? ("0" + time) : time; // zero padded
          $("#timer > span")[0].innerHTML = `0:${timePad}`;
        }
      }, 1000);
    } else if (one == "0:00") {return false;}
    return true;
  }

  var calculateWPM = function(data) {
    let {seconds, correct, incorrect, total, typed} = data;
    let min = (seconds / 60);
    let wpm = Math.ceil((typed / 5) - (incorrect) / min);
    let accuracy = Math.ceil((correct / total) * 100);

    if (wpm < 0) {wpm = 0;}     // prevent negative wpm from incorrect words

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
    if (accuracy > 80) {wpmClass.add("correct-word-c");}
    else { wpmClass.add("incorrect-word-c");}

    console.log(wordData);
  }

  var typingTest = function(e) {
    console.log("in tyoing test");
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
        checkWord(word);    // checks for typing errors while you type
        // <space> submits words
        if (kcode == 32) {
          submitWord(word);  // keep track of correct / incorrect words
          clearLine();  // get rid of old words
          $("#typebox")[0].value = ""; // clear typebox after each word
        }
        wordData.typed += 1; // count each valid character typed
      }else {
        // Display typing test results.
        calculateWPM(wordData);
      }
    }
  }

  var restartTest = function() {
    $("#typebox")[0].value = "";
    location.reload();
  }
