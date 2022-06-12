// JavaScript Document
$(document).ready(function() {
  let count = 0
  let boardLen = 3
  //let winningCombo = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]]
  let winningCombo = []
  let players = {
    'o': {score: 0, turn: 0, meta: 'disable o btn-primary'},
    'x': {score: 0, turn: 1, meta: 'disable x btn-info'},
  }

  // create a square board
  // adjust the board span (width)
  // update the winning combo
  const initBoard = (len = 3) => {
    $("#game").empty()
    winningCombo = []

    for(i=1; i<=(len*len); i++){
      $("#game").append(`<li id="slot${i}" class="btn span1">+</li>`)
    }
    // adjust css span3 and new_span
    newSpanWidth = len * 62 + (len - 1) * 20;
    span3Width = newSpanWidth - (len * 2)
    $(".new_span").css("width", newSpanWidth)
    $(".span3").css("width", span3Width)

    // update winning combo
    // 1. n rows 2. n columns 3. two diagonals
    let g = []
    for(i=1; i<=(len*len); i++){
      g.push(i) 
    }

    for(i=0; i<len; i++){
      winningCombo.push(g.slice(i*len, (i+1)*len))
    }

    let d1 = [], d2 = []
    for(i=0; i<len; i++){
      d1.push(winningCombo[i][i])
      d2.push(winningCombo[i][len-1-i])
    }

    let g1 = []
    for(i=1; i<=len; i++){
      for(j=i; j<=(len*(len-1)+i); j+=len){
        g1.push(j)
      }
    }

    for(i=0; i<len; i++){
      winningCombo.push(g1.slice(i*len, (i+1)*len))
    }

    winningCombo.push(d1, d2)
  }

  const reset = () => {
    $("#game li").text("+");
    $("#game li").removeClass('disable')
    $("#game li").removeClass('o')
    $("#game li").removeClass('x')
    $("#game li").removeClass('btn-primary')
    $("#game li").removeClass('btn-info')

    $("#whofirst").prop('disabled', false)
    $("#gridSize").prop('disabled', false)
  }

  const checkPrevMove = (com) => {
    for(player in players){
      if(winCond(player)) {
        alert(player.toUpperCase() + ' has won the game. Start a new game')
        reset()
        return false
      }
    }
    if ($(com).hasClass('disable'))
    {
      alert('Already selected')
      return false
    }
    return true
  }

  const checkWinOrTie = () => {
    for(player in players){
      if (winCond(player))
      {
        alert(player.toUpperCase() + ' wins')
        count = 0
        players[player]['score']++
        $(`#${player}_win`).text(players[player]['score'])
      } 
    }
    if (count == (boardLen * boardLen)){
      alert('Its a tie. It will restart.')
      reset()
      count = 0
    }
  }

  const move = (com) => {
    for(player in players){
      if(count % 2 == players[player]['turn']){
        count++
        $(com).text(player)
        $(com).addClass(players[player]['meta'])
        break;
      }
    }
  }

  const winCond = (who) => {
    return winningCombo.reduce((winComboAcc, combo) => {
      oneCombo = combo.reduce((comboAcc, c) => {
        return comboAcc && $(`#slot${c}`).hasClass(who)
      }, true)
      return winComboAcc || oneCombo
    }, false)
  }

  const clickAction = (evt) => {
    // slot clicked, disable game options
    $('#whofirst').prop('disabled', true)
    $('#gridSize').prop('disabled', true)
   
    //state machine
    //1. check previous move 2. if valid, move 3. check win or tie
    if(checkPrevMove(evt.target)){ move(evt.target) }
    checkWinOrTie()
  }

  initBoard(boardLen) 

  $("#whofirst").change(function(a) {
    // only 2 players, so can swap like this
    for(player in players){
      if(player == a.target.value){
        players[player]['turn'] = 0
      } else {
        players[player]['turn'] = 1
      }
    }
  });

  $("#gridSize").change(function(a) {
    boardLen = +a.target.value
    initBoard(boardLen)
    $("#game li").click(clickAction)
  });

  $("#reset").click(function () {
    $("#game li").text("+");
    reset()
    count = 0
  });

  $("#game li").click(clickAction);
});
