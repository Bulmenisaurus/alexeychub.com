// Execute a function when the user releases a key on the keyboard

var input = document.getElementById("command");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) { // enter key

    // All text already shown in terminal
    var terminal_text = document.getElementById("terminal_alltext").innerHTML 
    // The inputted command
    var terminal_command = document.getElementById("command").value

    event.preventDefault(); //idk what this does
    
    //outputs command
    document.getElementById("terminal_alltext").innerHTML = terminal_text + "<br><span class='user_text'>" + "»»» " + terminal_command + '</span>'
    //reset input
    document.getElementById("command").value = ''
  }
});

// Post message (no >>>)
function Post(message) {
  var terminal_text = document.getElementById("terminal_alltext").innerHTML 
  document.getElementById("terminal_alltext").innerHTML = terminal_text +  '<br>' + "<span class='bot_text'>" + message + '</span>'
  console.log(message)
  console.log('<br>' + "<span class='bot_text'>" + message + '</span>')

  return message
}

// Edit last message
function Edit(to_edit) {
  // array with each element was split by <br>
  var text = document.getElementById("terminal_alltext").innerHTML 
  var text_array = text.split('<br>')

  before_edit = text_array.pop() // deletes last message

  to_edit = "<span class='bot_text'>" + to_edit + '</span>' // formatting

  text_array.push(to_edit) // Adds edit

  var edited_text = text_array.join("<br>") // Joins array into string


  document.getElementById("terminal_alltext").innerHTML = edited_text // Modifies the html

  var return_message = 'edit(' + before_edit + ' --> ' + to_edit + ')'
  return return_message
}

// Deletes X message (default is 1)
function Delete(how_many = 1) {
  // array with each element was split by <br>
  var text = document.getElementById("terminal_alltext").innerHTML 
  var text_array = text.split('<br>')

  if (Number.isInteger(how_many)) { // if inputted an integer, delete that many message
  var count = 0
  while (count < how_many) {
    text_array.pop()
    count++
  }
  } else if (how_many=="max") { // all messages
    text_array = ['']
  } else if (how_many=='first') { //first message
    text_array[0] = ['']
  }
  
  var edited_text = text_array.join("<br>")
  document.getElementById("terminal_alltext").innerHTML = edited_text

  return_message = how_many + " messages deleted"
  return return_message
}

function terminal_init() {
  setTimeout(function(){{Post("Installing HACKORZ.exe...")}; }, 50);
  setTimeout(function(){{Post("Installing Encode.exe")}; }, 250);
  setTimeout(function(){{Edit("Installing Encode.exe.")}; }, 500);
  setTimeout(function(){{Edit("Installing Encode.exe..")}; }, 666);
  setTimeout(function(){{Edit("Installing Encode.exe...")}; }, 833);

  setTimeout(function(){{Edit("Installing Decode.exe")}; }, 1000);
  setTimeout(function(){{Edit("Installing Decode.exe.")}; }, 1250);
  setTimeout(function(){{Edit("Installing Decode.exe..")}; }, 1500);
  setTimeout(function(){{Edit("Installing Decode.exe...")}; }, 1750);

  var session_id = [...Array(30)].map(() => Math.random().toString(36)[2]).join('')
  setTimeout(function(){{Post("Connecting to valid session...")}; }, 2500);
  setTimeout(function(){{Edit("Session found!")}; }, 3000);
  setTimeout(function(){{Post(session_id)}; }, 3001);

  setTimeout(function(){{Post('Finding token...')}; }, 3200);
  setTimeout(function(){{Edit("Token found!")}; }, 3800);

  setTimeout(function(){{Post([...Array(60)].map(() => Math.random().toString(36)[2]).join(''))}; }, 3900);
  setTimeout(function(){{Post("Sending encrypted data key for HACKORZ.exe")}; }, 4000);
  setTimeout(function(){{Post("⌟ᶆᶲᶱᶪᶵᶤᶷᶶᵤᵣᶜᶲᶸᵣᶩᶲᶸᶱᶧᵣᶤᶱᵣᶨᶤᶶᶷᶨᶵᵣᶨᶪᶪᵤᵣᵫᵴᵲᵴᵳᵬ")}; }, 4500);
  setTimeout(function(){{Post("Done! You will be able to write shortly!")}; }, 5000);
  setTimeout(function(){{Delete("max")}; }, 7000);
  
  document.getElementById("command").readOnly = false;
  document.getElementById(terminal_alltext).innerHTML = "Welcome to Encrypt and Decrypt machine, or know more simply as DAE!"
}



setTimeout(terminal_init, 1500)