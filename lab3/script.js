(function () {

  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

  for (var i = 0; i < names.length; i++) {

    var firstLetter = names[i].charAt(0).toLowerCase();

    if (firstLetter === "j") {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }
  }

  console.log("---- Additional selection: ASCII sum threshold ----");

  for (var i = 0; i < names.length; i++) {

    var sum = 0;

    for (var j = 0; j < names[i].length; j++) {
      sum += names[i].charCodeAt(j);
    }

    if (sum > 500) {
      console.log(names[i] + " (ASCII sum: " + sum + ") -> Above threshold");
    } else {
      console.log(names[i] + " (ASCII sum: " + sum + ") -> Below threshold");
    }
  }

})();