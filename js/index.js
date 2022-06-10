// JavaScript Document
$(document).ready(function() {
  var x = "x"
  var o = "o"
  var count = 0;
  var o_win = 0;
  var x_win = 0;

  const reset = () => {
    $("#game li").text("+");
    $("#game li").removeClass('disable')
    $("#game li").removeClass('o')
    $("#game li").removeClass('x')
    $("#game li").removeClass('btn-primary')
    $("#game li").removeClass('btn-info')
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
    // return $("#one").hasClass(who) && $("#two").hasClass(who) && $("#three").hasClass(who) || 
    //   $("#four").hasClass(who) && $("#five").hasClass(who) && $("#six").hasClass(who) || 
    //   $("#seven").hasClass(who) && $("#eight").hasClass(who) && $("#nine").hasClass(who) || 
    //
    //   $("#one").hasClass(who) && $("#four").hasClass(who) && $("#seven").hasClass(who) || 
    //   $("#two").hasClass(who) && $("#five").hasClass(who) && $("#eight").hasClass(who) || 
    //   $("#three").hasClass(who) && $("#six").hasClass(who) && $("#nine").hasClass(who) || 
    //
    //   $("#one").hasClass(who) && $("#five").hasClass(who) && $("#nine").hasClass(who) || 
    //   $("#three").hasClass(who) && $("#five").hasClass(who) && $("#seven").hasClass(who)
  }

  $('#game li').click(function(){
    console.log("count ? " + count)
    if (winCond('o'))
    {
      alert('O has won the game. Start a new game')
      reset()
    }
    else if (winCond('x'))
    {
      alert('X wins has won the game. Start a new game')
      reset()
    }
    else if (count == 9) // TODO: tie needs some work. Only pops message on next click.
    {
      alert('Its a tie. It will restart.')
      reset()
      count = 0
    }
    else if ($(this).hasClass('disable'))
    {
      alert('Already selected')
    }
    else if (count%2 == 0) // its always O first move, so its odd count
    {
      count++
      $(this).text(o)
      $(this).addClass('disable o btn-primary')
      if (winCond('o'))
      {
        alert('O wins')
        count = 0
        o_win++
        $('#o_win').text(o_win)
      }
    }
    else  
    {
      count++
      $(this).text(x)
      $(this).addClass('disable x btn-info')
      if (winCond('x'))
      {
        alert('X wins')
        count = 0
        x_win++
        $('#x_win').text(x_win)
      }
    }

  });
  $("#reset").click(function () {
    $("#game li").text("+");
    reset()
    count = 0
  });
});
