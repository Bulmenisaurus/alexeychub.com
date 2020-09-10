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
function Post(message, wait=0) {
  function dostuff() {
    var terminal_text = document.getElementById("terminal_alltext").innerHTML 
    document.getElementById("terminal_alltext").innerHTML = terminal_text +  '<br>' + "<span class='bot_text'>" + message + '</span>'
  }
  setTimeout(dostuff, wait);

  return message
}



function Edit(to_edit, wait=0) {

  function dostuff() {
    var text = document.getElementById("terminal_alltext").innerHTML 
    var text_array = text.split('<br>')                                 // list with each line seperated by <br>
    text_array.pop()                                                    // deletes last message
    to_edit = "<span class='bot_text'>" + to_edit + '</span>'           // formatting
    text_array.push(to_edit)                                            // Adds edit
    var edited_text = text_array.join("<br>")                           // Joins array into string  
    document.getElementById("terminal_alltext").innerHTML = edited_text // Modifies the html
  }
  setTimeout(dostuff, wait);

  var return_message = 'message edited'
  return return_message
}



// Deletes X message (default is 1)
function Delete(how_many=1, wait=0) {
  
  function dostuff() {
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
      text_array[0] = ''
    }
    var edited_text = text_array.join("<br>")
    document.getElementById("terminal_alltext").innerHTML = edited_text
  }
  setTimeout(dostuff, wait);

  return_message = how_many + " messages deleted"
  return return_message
}

function terminal_init() {
  Post("Installing HACKORZ.exe...", 50);
  Post("Installing Encode.exe", 250)
  Edit("Installing Encode.exe.", 500)
  Edit("Installing Encode.exe..", 666)
  Edit("Installing Encode.exe...", 833)

  Edit("Installing Decode.exe", 1000)
  Edit("Installing Decode.exe.", 1250)
  Edit("Installing Decode.exe..", 1500)
  Edit("Installing Decode.exe...", 1750)

  var session_id = [...Array(30)].map(() => Math.random().toString(36)[2]).join('')
  Post("Connecting to valid session...", 2500)
  Edit("Session found!", 3000)
  Post(session_id, 3001)

  Post('Finding token...', 3200)
  Edit("Token found!", 3800)

  Post([...Array(60)].map(() => Math.random().toString(36)[2]).join(''), 3900)
  Post("Sending encrypted data key for HACKORZ.exe", 4000)
  Post("⌟ᶆᶲᶱᶪᶵᶤᶷᶶᵤᵣᶜᶲᶸᵣᶩᶲᶸᶱᶧᵣᶤᶱᵣᶨᶤᶶᶷᶨᶵᵣᶨᶪᶪᵤᵣᵫᵴᵲᵴᵳᵬ", 4500)
  Post("Done! You will be able to write shortly!", 5000)
  Delete("max", 7000)
  
  document.getElementById("command").readOnly = false;
  document.getElementById('terminal_alltext').innerHTML = "Welcome to Encrypt and Decrypt machine, or know more simply as DAE!"
}




setTimeout(terminal_init, 1500)