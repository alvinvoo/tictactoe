// JavaScript Document
$(document).ready(function() {
  var x = "x"
  var o = "o"
  var t = "△"
  var count = 0;

  let score = {
    'x': 0,
    'o': 0,
  }

  const reset = () => {
    $("#game li").text("+");
    $("#game li").removeClass('disable')
    $("#game li").removeClass('o')
    $("#game li").removeClass('x')
    $("#game li").removeClass('btn-primary')
    $("#game li").removeClass('btn-info')
  }

  $("#reset").click(function () {
    $("#game li").text("+");
    reset()
    count = 0
  });

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
      } else if (count == 9){
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
    // extendable winning combos: for e.g. if you want a 15 x 15 tic-tac-toe, just adjust array
    winningCombo = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]]

    return winningCombo.reduce((winComboAcc, combo) => {
      oneCombo = combo.reduce((comboAcc, c) => {
        return comboAcc && $(`#slot${c}`).hasClass(who)
      }, true)
      return winComboAcc || oneCombo
    }, false)
  }

  $('#game li').click(function(){
    console.log("count ? " + count)

    //state machine
    //1. check previous move 2. if valid, move 3. check win or tie
    if(checkPrevMove(this)){ move(this) }
    checkWinOrTie()
  });
});
