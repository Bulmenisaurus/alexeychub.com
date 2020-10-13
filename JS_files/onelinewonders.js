b_input_name = document.getElementById('b-day_name_inp')
b_input_message = document.getElementById('b-day_message_inp')
v_input_name = document.getElementById('valentine_name_inp')
v_input_message = document.getElementById('valentine_message_inp')


b_input_name.onchange = function(){document.getElementById('b-day_name').innerHTML = b_input_name.value ? b_input_name.value.replace(/\\n/g, 'chr(10)') : '{your name here}';}
b_input_message.onchange = function(){document.getElementById('b-day_message').innerHTML = b_input_message.value ? b_input_message.value.replace(/\\n/g, 'chr(10)')  : '{your message here}';}
v_input_name.onchange = function(){document.getElementById('valentine_name').innerHTML = v_input_name.value ? v_input_name.value.replace(/\\n/g, 'chr(10)') : '{your name here}';}
v_input_message.onchange = function(){document.getElementById('valentine_message').innerHTML = v_input_message.value ? v_input_message.value.replace(/\\n/g, 'chr(10)')  : '{your message here}';}



b_input_name.onclick = function() {b_input_name.onchange();}
b_input_message.onclick = function() {b_input_message.onchange();}
v_input_name.onclick = function() {v_input_name.onchange();}
v_input_message.onclick = function() {v_input_message.onchange();}