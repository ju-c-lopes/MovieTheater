var seat = [[],[],[],[],[],[]]
var selSeat = -1
var selected = false
var mySeat = -1

// Cria o array bidimensional para as fileiras do cinema e os mostra na janela
function createRoom() {
    for ( var i = 0; i < 6; i++){
        for (var j = 0; j < 9; j++){
            var boole = Math.random() >= 0.5
            seat[i][j] = boole
            if(seat[i][j]){
                setSeats(i, j + 1, 'available')
            } else {
                setSeats(i, j + 1, 'unavailable')
            }
        }
    }
}

// Função para pegar os elementos html e definir a imagem ao devido id
function setSeats(row, chair, status){
    document.getElementById(`seat${row}${chair}`).src = `img/seat_${status}.png`
    status = status.charAt(0).toUpperCase() + status.slice(1)
    document.getElementById(`seat${row}${chair}`).alt = `${status} seat`
}

// Retorna o status de uma cadeira clicada
function setStatus(i, j) {
    if (seat[i][j]){
        selSeat = (i * 10) + (j + 1)
    } else {
        selSeat = -1
    }
    return selSeat
}

// Mostra um popup com o status da cadeira
function seeStatus(row, chair) {
    if (seat[row][chair - 1]){
        document.getElementById(`popup${row}${chair}`).style.visibility = 'visible'
        document.getElementById(`popup${row}${chair}`).style.animation = 'show 2s'
        document.getElementById(`popup${row}${chair}`).innerText = 'Available'
    } else {
        document.getElementById(`popup${row}${chair}`).style.visibility = 'visible'
        document.getElementById(`popup${row}${chair}`).style.animation = 'show 2s'
        document.getElementById(`popup${row}${chair}`).innerText = 'Unavailable'
    }
}

// esconde o popup ao sair da cadeira
function eraseStatus(row, chair){
    document.getElementById(`popup${row}${chair}`).style.visibility = 'hidden'
}

// Função para dar as opções ao usuário de acordo com o status da cadeira
function clickStatusSeat(row, chair) {
    if (!selected){
        if (setStatus(row, chair - 1) != -1){
            if (!threeSeats(row, chair - 1)){
                oneSeat()
            }
        } else {
            setId('hidden', 'a1', 'hidden', 'c1', 'hidden', 'a2')
            setId('hidden', 'c2', 'visible', 'alert', 'visible', 'getout')
            document.getElementById('display').innerText = ''
            document.getElementById('txt').innerHTML = 'Sorry, this seat is unavailable'
            document.getElementById('alert').style.width = '300px'
        }
    } else {
        if(mySeat == setStatus(row, chair - 1)){
            setSeats(row, chair, 'selected')
        }
        setId('visible', 'alert', 'visible', 'getout')
        document.getElementById('alert').style.visibility = 'visible'
        document.getElementById('getout').style.visibility = 'visible'
        document.getElementById('display').innerText = ''
        document.getElementById('txt').innerHTML = 'Enjoy your movie'
        document.getElementById('alert').style.width = '150px'
    }
}

// Verifica a opção para 3 cadeiras por mais espaço
function threeSeats(row, chair){
    var ver = false
    if (seat[row][chair - 1] && seat[row][chair] && seat[row][chair + 1]){
        setId('visible', 'a1', 'visible', 'c1', 'hidden', 'a2')
        setId('hidden', 'c2', 'visible', 'alert')
        document.getElementById('alert').style.width = '300px'
        document.getElementById('alert').style.height = 'auto'
        document.getElementById('display').innerText = `${row}${chair + 1}`
        document.getElementById('txt').innerHTML = "Around this seat, there's 3 seats options<br>Would you like to get a large seat?<br><em>(This option will cost three seats)</em>"
        ver = true
    }
    return ver
}

// Ações após o usuário aceitar ou rejeitar a opção de 3 cadeiras
function choiceThreeSeats(option) {
    var row = Number.parseInt(selSeat / 10)
    var chair = selSeat % 10
    switch(option){
        case 'accept':
            setSeats(row, chair - 1, 'select')
            setSeats(row, chair, 'select')
            setSeats(row, chair + 1, 'select')
            selected = true
            mySeat = `${row}${chair}`
            setId('hidden', 'a1', 'hidden', 'c1')
            setId('hidden', 'alert', 'visible', 'view')
            document.getElementById('view').style.width = '200px'
            document.getElementById('your').innerText = `${row}${chair}`
            document.getElementById('txtend').innerHTML = '<strong><em>Your seat</em></strong>'
            disablePopup()
            break
        case 'cancel':
            setId('hidden', 'a1', 'hidden', 'c1')
            setId('visible', 'a2', 'visible', 'c2')
            document.getElementById('display').innerText = `${row}${chair}`
            document.getElementById('txt').innerHTML = 'Do you want to buy this seat?'
            document.getElementById('alert').style.height = 'auto'
            break
    }
}

// Se tiver rejeitado 3 cadeiras, então pergunta ao usuário a opção da cadeira clicada
function choiceOneSeat(option){
    var row = Number.parseInt(selSeat / 10)
    var chair = selSeat % 10
    switch(option){
        case 'accept':
            setSeats(row, chair, 'select')
            selected = true
            mySeat = `${row}${chair}`
            setId('hidden', 'a1', 'hidden', 'c1', 'hidden', 'a2')
            setId('hidden', 'c2', 'hidden', 'alert', 'visible', 'view')
            document.getElementById('view').style.width = '170px'
            document.getElementById('your').innerText = `${row}${chair}`
            document.getElementById('txtend').innerHTML = '<strong><em>Your seat</em></strong>'
            disablePopup()
            break
        case 'cancel':
            setId('hidden', 'a1', 'hidden', 'c1')
            setId('hidden', 'a2', 'hidden', 'c2', 'hidden', 'alert')
            break
    }
}

// Pergunta ao usuário se ele aceita a cadeira
function oneSeat(){
    var row = Number.parseInt(selSeat / 10)
    var chair = selSeat % 10
    setId('visible', 'alert', 'hidden', 'a1', 'hidden', 'c1')
    setId('visible', 'a2', 'visible', 'c2')
    document.getElementById('display').innerText = `${row}${chair}`
    document.getElementById('txt').innerHTML = 'Do you want to buy this seat?'
    document.getElementById('alert').style.width = '300px'
    document.getElementById('alert').style.height = 'auto'
}

// Caso o usuário clicar em uma cadeira indisponivel
function getout(){
    setId('hidden', 'getout', 'hidden', 'a1', 'hidden', 'c1')
    setId('hidden', 'a2', 'hidden', 'c2', 'hidden', 'alert')
}

// Desabilita os popus após o usuário fazer sua escolha
function disablePopup(){
    for (var i = 0; i < seat.length; i++){
        for (var j = 0; j < seat[i].length; j++){
            document.getElementById(`seat${i}${j + 1}`).removeAttribute('onmouseover')
        }
    }
}

// Encurtar código para visibility
function setId(value1, id1, value2='', id2='', value3='', id3=''){
    for (var i = 1; i <= 3; i++){
        switch(i){
            case 1:
                document.getElementById(id1).style.visibility = value1
                break
            case 2:
                if(id2 != ''){
                    document.getElementById(id2).style.visibility = value2
                }                
                break
            case 3:
                if(id3 != ''){
                    document.getElementById(id3).style.visibility = value3
                }
                break
        }
    }
}