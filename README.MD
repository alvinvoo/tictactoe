Preview: http://45.32.99.107  
  
Improve Game Logic 
- Small fix so that when 2 players reach a "tie", the popup appears immediately instead of next click 
- Use a simple state machine to manage the 3 possible states in `clickAction`

Improve Scalability of Game
- A singleton `players` state
- Auto generate board tiles (slots) and also winning combos

Improve Players' experience
- Game can adjust board size easily 
- Either player can take the first turn 
- In terms of "infra", dockerized app for easy scaling

More Ideas
- Possible to have more than 2 players

With docker & docker-compose installed, simply run:  
```docker-compose up -d```  
and visit `localhost` in your browser  

