// JavaScript Document
$(document).ready(function() {
  var x = "x"
  var o = "o"
  var t = "△"
  var count = 0
  const boardLen = 5
  //let winningCombo = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]]
  let winningCombo = []
  let score = {
    'x': 0,
    'o': 0,
  }

  // create a square board
  // adjust the board span (width)
  // update the winning combo
  const initBoard = (len = 3) => {
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

    console.log(winningCombo)
  }

  initBoard(boardLen) 

  const reset = () => {
    $("#game li").text("+");
    $("#game li").removeClass('disable')
    $("#game li").removeClass('o')
    $("#game li").removeClass('x')
    $("#game li").removeClass('btn-primary')
    $("#game li").removeClass('btn-info')
  }

  const checkPrevMove = (com) => {
    for(player in score){
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
    for(player in score){
      if (winCond(player))
      {
        alert(player.toUpperCase() + ' wins')
        count = 0
        score[player]++
        $(`#${player}_win`).text(score[player])
      } else if (count == (boardLen * boardLen)){
        alert('Its a tie. It will restart.')
        reset()
        count = 0
      }
    }
  }

  const move = (com) => {
    if (count%2 == 0) // its always O first move, so its odd count
    {
      count++
      $(com).text(o)
      $(com).addClass('disable o btn-primary')
    }
    else 
    {
      count++
      $(com).text(x)
      $(com).addClass('disable x btn-info')
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

  $("#reset").click(function () {
    $("#game li").text("+");
    reset()
    count = 0
  });

  $('#game li').click(function(){
    console.log("count ? " + count)

    //state machine
    //1. check previous move 2. if valid, move 3. check win or tie
    if(checkPrevMove(this)){ move(this) }
    checkWinOrTie()
  });
});
