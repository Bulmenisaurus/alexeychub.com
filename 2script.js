
var input = document.getElementById("command");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) { // enter key

    // All text already shown in terminal
    var terminal_text = document.getElementById("terminal_alltext").innerHTML 
    // The inputted command
    var terminal_command = document.getElementById("command").value

    event.preventDefault(); //idk what this does
    
    //outputs command
    document.getElementById("terminal_alltext").innerHTML = terminal_text + "<br>>>> " + terminal_command
    //reset input
    document.getElementById("command").value = ''
  }
});

// Post message (no >>>)
function Post(message) {
  var terminal_text = document.getElementById("terminal_alltext").innerHTML 
  document.getElementById("terminal_alltext").innerHTML = terminal_text + '<br>' + message

  return "Message posted"
}

// Edit last message
function Edit(to_edit) {
  // array with each element was split by <br>
  var text = document.getElementById("terminal_alltext").innerHTML 
  var text_array = text.split('<br>')

  before_edit = text_array.pop() // deletes last message

  text_array.push(to_edit) // Adds edit

  var edited_text = text_array.join("<br>") // Joins array into string

  document.getElementById("terminal_alltext").innerHTML = edited_text // Modifies the html

  var return_message = 'edit(' + before_edit + ' --> ' + to_edit + ')'
  return return_message
}

// Deletes X message (default is 1)
function Delete(how_many = 1) {
  // line 30
  var text = document.getElementById("terminal_alltext").innerHTML 
  var text_array = text.split('<br>')

  var count = 0
  while (count < how_many) {
    text_array.pop()
    count++
  }
  
  var edited_text = text_array.join("<br>")
  document.getElementById("terminal_alltext").innerHTML = edited_text

  return_message = how_many + " messages deleted"
  return return_message
}
