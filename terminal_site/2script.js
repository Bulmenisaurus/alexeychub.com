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
    if (parseInt(document.getElementById("var").innerHTML) > 0) {
      if (!['e', 'd'].includes(document.getElementById('command').value[0]) && document.getElementById("var")==2) { // if input[0] not d or e, restart
        console.log(document.getElementById('command').value[0])
        Post('restarting...')
        setup_script()
        document.getElementById("var").innerHTML = 1
      } else {
        document.getElementById("var").innerHTML = 2
        if (document.getElementById('command').value[0] == 'e') {
          var action = 'encode'
        } else {
          var action = 'decode'
        }
      }
      if (document.getElementById("var").innerHTML == 2) {
        Post("What message would you like to " + action + "?")
        document.getElementById("command").placeholder = "<your message here>"
        document.getElementById("var").innerHTML = 3
      } else if (document.getElementById("var").innerHTML == 3) {
        var text = document.getElementById('command').value
        if (action == 'encode') {
          var uni_text = text.hexEncode()

        }
      }
    }
    //reset input
    document.getElementById("command").value = ''
  }
});

// Post message (no '>>>')
function Post(message, wait=0) {
  function dostuff() {
    var terminal_text = document.getElementById("terminal_alltext").innerHTML 
    document.getElementById("terminal_alltext").innerHTML = terminal_text + '<br>' + "<span class='bot_text'>" + message + '</span>'
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
      text_array.shift()
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
  Post("Installing Encode.exe", 150)
  Edit("Installing Encode.exe.", 200)
  Edit("Installing Encode.exe..", 250)
  Edit("Installing Encode.exe...", 300)

  Edit("Installing Decode.exe", 500)
  Edit("Installing Decode.exe.", 550)
  Edit("Installing Decode.exe..", 600)
  Edit("Installing Decode.exe...", 650)

  var session_id = [...Array(30)].map(() => Math.random().toString(36)[2]).join('')
  Post("Connecting to valid session...", 900)
  Edit("Session found!", 910)
  Post(session_id, 1200)

  Post('Finding token...', 1300)
  Edit("Token found!", 1500)

  Post([...Array(60)].map(() => Math.random().toString(36)[2]).join(''), 1550)
  Post("Sending encrypted data key for HACKORZ.exe", 1700)
  Post("⌟ᶆᶲᶱᶪᶵᶤᶷᶶᵤᵣᶜᶲᶸᵣᶩᶲᶸᶱᶧᵣᶤᶱᵣᶨᶤᶶᶷᶨᶵᵣᶨᶪᶪᵤᵣᵫᵴᵲᵴᵳᵬ", 1900)
  Post("Done! You will be able to write shortly!", 3500)
  Delete("max", 3700)
  
  function unlock() {
  document.getElementById("command").readOnly = false;
  document.getElementById('terminal_alltext').innerHTML = "Welcome to Decrypt and Encrypt machine, or know more simply as DAE!"
  }

  setTimeout(unlock, 3800)
}

function setup_script() {
  document.getElementById('var').innerHTML = 2
  Post('Would you like to decode or encode a message?')
  document.getElementById("command").placeholder = "(encode/decode)"
}

String.prototype.hexEncode = function(){
  var hex, i

  var result = []
  for (i=0; i<this.length; i++) {
      hex = this.charCodeAt(i).toString(16)
      result.push(("000"+hex).slice(-4))
  }
  return result
}

String.prototype.hexDecode = function(){
  var j
  var hexes = this.match(/.{1,4}/g) || []
  var back = ""
  for(j = 0; j<hexes.length; j++) {
      back += String.fromCharCode(parseInt(hexes[j], 16))
  }

  return back
}

function encrypt(to_encrypt, offset=Math.floor(Math.random() * 140_000)+10_000) {
  var encoded = ((offset+1500).toString(16)).hexDecode()
    for (i=0; i<to_encrypt.length; i++)
      var letter_encrypted = parseInt((to_encrypt[i]).hexEncode(), 16) + offset).toString(16).hexDecode()
      
    return encoded
}




setTimeout(terminal_init, 1500)
setTimeout(setup_script, 5400)

/* var=0 no input yet
var=1 inputError, restarting
var=2 await encode/decode
var=3 await message
*/