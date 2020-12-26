[bName, bMessage, bPrev, vName, vMessage, vFrom] = ['bday-recipient', 'bday-message', 'bday-preview','valentine-name', 'valentine-message', 'valentine-from'].map((e) => document.getElementById(e))
/*
bName = document.getElementById('bday-recipient')
bMessage = document.getElementById('bday-message')
vName = document.getElementById('valentine-name')
vMessage = document.getElementById('valentine-message')
vFrom = document.getElementById('valentine-from')
*/

function calcHtml(name, message){
    n = name.replace(/\\n/g, 'chr(10)')
    m = message.replace(/\\n/g, 'chr(10)')
    return {
        'b': `<span></span><span class="nb">print</span><span class="p">(</span><span class="s2">f&quot;{\'Happy B-day ${n}!\'.capitalize()}\\n{chr(60)+(l_1 := \'------~~~~~~**\') + l_1[::-1]+chr(62)}\\n\\n{\'${m}\'}\\n\\n{chr(60)+l_1+l_1[::-1]+chr(62)}&quot;</span><span class="p">)</span>`,
        'bp': `Happy b-day ${n}!<br>&lt;------~~~~~~****~~~~~~------&gt;<br><br>${m}<br><br>&lt;------~~~~~~****~~~~~~------&gt;`
    }
}



bName.onchange = function(){c=calcHtml(this.value, bMessage.value);document.getElementById('bday-result').innerHTML = c.b;bPrev.innerHTML = c.bp};
bMessage.onchange = function(){c=calcHtml(bName.value, this.value);document.getElementById('bday-result').innerHTML = c.b;bPrev.innerHTML = c.bp};

vName.onchange = function(){document.getElementById('valentine_name').innerHTML = vName.value ? vName.value.replace(/\\n/g, 'chr(10)') : '{your name here}';}
vMessage.onchange = function(){document.getElementById('valentine_message').innerHTML = vMessage.value ? vMessage.value.replace(/\\n/g, 'chr(10)')  : '{your message here}';}
vFrom.onchange = function(){document.getElementById('valentine_from').innerHTML = vFrom.value ? vFrom.value.replace(/\\n/g, 'chr(10)')  : '{from who is it?}';}
