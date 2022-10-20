//========
// gameBoard class
//========

class gameBoard{
  constructor(level, multiplayer){
    this.level= level;
    this.size = 0;
    this.move = 0;
    this.moves = [];
    this.squares = [];
    this.gameboard = document.querySelector("#domGame");
    this.movesBTN = null;
    this.domButtons = [];
    this.validMoves = [];
    this.invalidMoves = [];
    this.multiplayer = multiplayer;
    this.players = [{name:"Player 1", id:"a", move: 0, moves: [], validMoves:[],invalidMoves:[]},{name:"Player 2", id:"b", move: 0, moves: [], validMoves:[],invalidMoves:[]}];
    this.player = null;
    this.opponent = null;
    //https://alephnode.io/07-event-handler-binding/ to fix "this" being read as referring to event object instead of class scope on event
    this.boundValidMoves = this.returnValidMoves.bind(this);
    this.boundListMoves = this.listMoves.bind(this);
  }
  //evaluates the chosen level and sets the size of the gameboard
  setSize(){
    switch(this.level){
      case "level 1":
        this.size = 25;
        break;
      case "level 2":
        this.size= 36;
        break;
      case "level 3":
        this.size = 49;
        break;
      case "level 4":
        this.size = 64;
        break;
      case "level 5":
        this.size = 81;
        break;
      case "level 6":
        this.size = 100;
        break;
      case "legend":
        this.size = 676;
        break;
    }
  }
  //takes square root of size and creates a one parent array with <n> nested arrays within it then populates each nested array with objects modeling each square
  createColumns(){
    let root = Math.sqrt(this.size);
    for (let i=0;i<root;i++){
      this.squares.push([]);
    }
    this.squares.forEach(()=>{
      let newDiv = document.createElement('div');
      newDiv.setAttribute("class","column");
      this.gameboard.appendChild(newDiv);
      }
    )
    let columns = document.querySelectorAll(".column");
    this.squares.forEach(elem=>{
      for (let i=0;i<this.squares.length;i++){
        //elem.push(i)
        elem.push(
          {
            //rank sets ASCI number for rank letter. need to figure out how to escape this
            rank: String.fromCharCode(97+this.squares.indexOf(elem)),
            file: i+1,
            rf: null,
            id: `${this.squares.indexOf(elem)}_${i}`,
            x: this.squares.indexOf(elem),
            y: i
        }
        )
        //set rank file to be equal to rank value and file value
        elem[i].rf= `${elem[i].rank}${elem[i].file}`;
        //create buttons (squares) and append them to columns (starting from [0] in columns array, appending each item in child array in squares starting at [0]) with attributes mapped from proeprties on objects in columns arrays
        let newButton = document.createElement('button');
        newButton.setAttribute('id',`${elem[i].rf}`);
        newButton.innerHTML= `<span>${elem[i].rf}</span>`;
        newButton.setAttribute('data-x',elem[i].x);
        newButton.setAttribute('data-y',elem[i].y);
        columns[this.squares.indexOf(elem)].appendChild(newButton);
        
      }
    })
    //assign the value of this.domButtons to be a nodelist of all buttons inside #domGame
    this.domButtons = document.querySelectorAll('#domGame button');
  }
  //multiplayer only: set player and opponent depending on value of (this.move-1)%2
  setPlayer(){
    this.player = ((this.move-1)%2===0) ? this.players[0]:this.players[1];
    this.opponent = ((this.move-1)%2===0) ? this.players[1]:this.players[0];
    document.querySelector(`#${this.opponent.id}`).setAttribute("class","activePlayer");
    document.querySelector(`#${this.player.id}`).setAttribute("class","inactivePlayer");
  }
  //very hefty method that needs to be refactored
  returnValidMoves(e){
    this.move++;
    //condition for valid knight moves
    let x = parseInt(e.currentTarget.dataset.x);
    let y = parseInt(e.currentTarget.dataset.y);
    let domButtons = Array.from(this.domButtons)
    let knightMoves = domButtons.reduce((a,elem)=>{
      if(
        parseInt(elem.dataset.x) === x-2 && parseInt(elem.dataset.y) === y-1 ||
        parseInt(elem.dataset.x) === x-2 && parseInt(elem.dataset.y) === y+1 ||
        parseInt(elem.dataset.x) === x-1 && parseInt(elem.dataset.y) === y-2 ||
        parseInt(elem.dataset.x) === x-1 && parseInt(elem.dataset.y) === y+2 ||
        parseInt(elem.dataset.x) === x+2 && parseInt(elem.dataset.y) === y-1 ||
        parseInt(elem.dataset.x) === x+2 && parseInt(elem.dataset.y) === y+1 ||
        parseInt(elem.dataset.x) === x+1 && parseInt(elem.dataset.y) === y-2 ||
        parseInt(elem.dataset.x) === x+1 && parseInt(elem.dataset.y) === y+2
        ){
          a[0].push(elem);
        }else{
          a[1].push(elem);
        }
        return a;   
    },[[],[]]
  );
  if(this.multiplayer){
      //determine who is player and who is opponent
      this.setPlayer();
      
      //declare local player and opponent vars equal to set value on class
      let player=this.player;
      let opponent=this.opponent;
      //remove disabled attribute of buttons considered invalid for previous player
      this.invalidMoves.forEach(elem=>elem.removeAttribute('disabled'));
      //add to player move;
      player.move++;
      //validMoves = player valid moves
      this.validMoves = player.validMoves;
      //invalid moves is = to player invalid moves and opponent moves
      this.invalidMoves = [...opponent.moves,...player.invalidMoves];
      //set attribute of current square to order, set inner html to span with player order and replace the x/y attributes with 'played'
      e.currentTarget.setAttribute("data-order", player.move);
      e.currentTarget.innerHTML = `<span>${player.move}</span>`;
      e.currentTarget.dataset.x=`played${player.id}`;
      e.currentTarget.dataset.y=`played${player.id}`;
      //push played square to player moves array
      player.moves.push(e.currentTarget);
      //and to moves array
      this.moves.push(e.currentTarget);
      //set an active data attribute on the current square for styling purposes
      if(player.moves.length>=2){
        player.moves[player.moves.length-2].setAttribute("data-active",false);
      }
      player.moves[player.moves.length-1].setAttribute("data-active",true)
      //update player's validMoves and invalidMoves then push them to class validMoves/invalidMoves
      player.validMoves = knightMoves[0];
      player.invalidMoves = knightMoves[1];
      this.invalidMoves = [...player.moves, ...opponent.invalidMoves];
    }
    //single player
    else{
      //remove disabled attribute on buttons previously invalid
      this.invalidMoves.forEach(elem=>elem.removeAttribute('disabled'));
      //update new valid/invalid moves
      this.validMoves = knightMoves[0];
      this.invalidMoves = knightMoves[1];
      //update order, x, and y attributes on targeted element
      e.currentTarget.setAttribute("data-order", this.move);
      e.currentTarget.innerHTML = `<span>${this.move}</span>`;
      e.currentTarget.dataset.x='played';
      e.currentTarget.dataset.y='played';
      //push target to moves array
      this.moves.push(e.currentTarget);
    }
    //disable all elements in invalidMoves array
    this.disableInvalid();
    //evaluate whether or not the game is over
    this.isGameOver();
  }
  isGameOver(){
    if(this.multiplayer){
      if(this.move>2){
        if(this.opponent.validMoves.length===0){
          this.domButtons.forEach(elem=>elem.setAttribute("disabled", true));
          this.player.moves.forEach(elem=>elem.removeAttribute('data-active'));
          this.player.moves.forEach(elem=>elem.setAttribute('class','win'));
          this.opponent.moves.forEach(elem=>elem.removeAttribute('data-active'))
          this.opponent.moves.forEach(elem=>elem.setAttribute('class','loser'));
          document.querySelector(`#${this.opponent.id}`).setAttribute("class","loser");
          document.querySelector(`#${this.player.id}`).setAttribute("class","winner");
        }
        else if(this.opponent.validMoves.length===1 && 
                this.player.moves.includes(this.opponent.validMoves[0])
                ){
          this.domButtons.forEach(elem=>elem.setAttribute("disabled", true));
          this.player.moves.forEach(elem=>elem.removeAttribute('data-active'));
          this.player.moves.forEach(elem=>elem.setAttribute('class','win'));
          this.opponent.moves.forEach(elem=>elem.removeAttribute('data-active'))
          this.opponent.moves.forEach(elem=>elem.setAttribute('class','loser'));
          document.querySelector(`#${this.opponent.id}`).setAttribute("class","loser");
          document.querySelector(`#${this.player.id}`).setAttribute("class","winner");
        } 
        else if(this.player.validMoves.length===0){
          this.domButtons.forEach(elem=>elem.setAttribute("disabled", true));
          this.player.moves.forEach(elem=>elem.removeAttribute('data-active'));
          this.player.moves.forEach(elem=>elem.setAttribute('class','loser'));
          this.opponent.moves.forEach(elem=>elem.removeAttribute('data-active'))
          this.opponent.moves.forEach(elem=>elem.setAttribute('class','win'));
          document.querySelector(`#${this.opponent.id}`).setAttribute("class","winner");
          document.querySelector(`#${this.player.id}`).setAttribute("class","loser");
        }
        else if(this.player.validMoves.length===1 && 
                this.opponent.moves.includes(this.player.validMoves[0])
                ){
          this.domButtons.forEach(elem=>elem.setAttribute("disabled", true));
          this.player.moves.forEach(elem=>elem.removeAttribute('data-active'));
          this.player.moves.forEach(elem=>elem.setAttribute('class','loser'));
          this.opponent.moves.forEach(elem=>elem.removeAttribute('data-active'))
          this.opponent.moves.forEach(elem=>elem.setAttribute('class','win'));
          document.querySelector(`#${this.opponent.id}`).setAttribute("class","winner");
          document.querySelector(`#${this.player.id}`).setAttribute("class","loser");
        } 
      }
    }
    else{
      if (this.move === this.size){
        this.moves.forEach(elem=>elem.setAttribute('class','win'))
      }
      else if (this.validMoves.length===0){
        this.moves.forEach(elem=>elem.setAttribute('class','lose'))
      }
    }
  }
  disableInvalid(){
    this.invalidMoves.forEach(elem=>elem.setAttribute('disabled',''))
  }
  listMoves(){
    //if there is a section element existing as a child of #domGame, toggle class "moves"
    if(document.querySelector("#domGame section")){
      document.querySelector("#domGame section").classList.toggle("moves");
    }
    //else create a section element, set class attribute to "hidden moves" and append to #domElement
    else{
    let section = document.createElement("section");
    section.setAttribute("class","hidden moves")
    this.gameboard.appendChild(section);
    }
    //assign section to variable, set its innerHTML empty, then create a span for each element in moves array
    let section = document.querySelector("#domGame section")
    section.innerHTML = '';
    let h3 = document.createElement("h3");
    h3.innerText = "Moves Log";
    section.appendChild(h3);
    if(this.moves.length){
      this.moves.forEach(elem=>{
        
        let span = document.createElement("span");
        span.innerText = `${elem.dataset.order}: ${elem.id}`;
        section.appendChild(span)
      }
      )
    }else{
        let span = document.createElement("span");
        span.innerText = `No moves to list for this game`;
        section.appendChild(span)
    }
  }
  setSquareListeners(){
    this.domButtons.forEach(elem=>elem.addEventListener('click',this.boundValidMoves));
  
  }
  createAndSetMovesBTN(){
    this.movesBTN = document.createElement("button");
    this.movesBTN.innerText="...";
    this.movesBTN.setAttribute("id","movesBTN");
    document.querySelector("#controls div").prepend(this.movesBTN);
    this.movesBTN.addEventListener("click",this.boundListMoves);
  }
}

//========
// Creates a game when called (with or without an event)
//========

const makeGame = (e) =>{
  //clear out inner HTML of domGame so squares aren't being appended infinitely upon reset
  document.querySelector("#domGame").innerHTML = '';
  //remove resetButton so buttons aren't added infinitely upon reset
  document.querySelector("#controls div").removeChild(document.querySelector("#controls div").firstChild);
  //
  document.querySelector("#a").setAttribute("class","activePlayer");
  document.querySelector("#b").setAttribute("class","inactivePlayer");
  //declare currentValue
  let currentValue;
  //if function called outside of event, set currentValue to default selected element in HTML, else if target of event has a name attribute, change currentValue to equal value of currentTarget, update the difficulty display, and close the dropdown menu
  if (e===undefined){
    currentValue = document.querySelector('input[name="difficulty"]:checked').value;
  }else if (e.currentTarget.name==="difficulty"){
    //currentValue = false;
    currentValue = e.currentTarget.value;
    document.querySelector("#difficultyDisplay p").innerText = e.currentTarget.value;
    document.querySelector(".options").classList.toggle("expandedDifficulty");
    document.querySelector("#difficultyDisplay p").classList.toggle("down");
  }
  //create new instance of gameBoard class
  let game = new gameBoard(document.querySelector('input[name="difficulty"]:checked').value, document.querySelector('input[name="multiplayer"]:checked'))
  game.setSize();
  game.createColumns();
  game.createAndSetMovesBTN();
  game.setSquareListeners()
}

//========
// Creates a game when page loads
//========

makeGame();

//========
// Other event listeners
//========

//on click of reset button or input buttons, run makeGame function
document.querySelector("#resetBTN").addEventListener('click',makeGame);
document.querySelectorAll('input[name="difficulty"]').forEach(elem=>elem.addEventListener('click',makeGame));
//on click of difficulty display, toggle expandedDifficulty class on options list and "down" on difficulty display classLight
document.querySelector("#difficultyDisplay").addEventListener("click", ()=>{
  document.querySelector('.options').classList.toggle("expandedDifficulty");
  document.querySelector("#difficultyDisplay p").classList.toggle("down")
  }
)
//add event listener to toggle multiplayer
document.querySelector("#multiToggle").addEventListener("change",()=>{
  makeGame();
  document.querySelector("#players").classList.toggle("expanded");
});

//add event listener to toggle light/dark theme
document.querySelector("#toggle").addEventListener('click', ()=>{
  if(document.getElementsByTagName( 'html' )[0].className === "lightmode"){
    document.getElementsByTagName( 'html' )[0].classList.toggle("lightmode");
    document.querySelector("#toggle").setAttribute("class","moveLeft");
  }else{
    document.getElementsByTagName( 'html' )[0].classList.toggle("lightmode");
    document.querySelector("#toggle").setAttribute("class","moveRight");
  }
})

//add event listener to svg in header that, if clicked, rotates board 180deg (credit: Matt Sweeney for the idea)
document.querySelector("#game header svg").addEventListener("click", ()=>{
  document.querySelector("#gradientBorder").classList.toggle("rotate");
})
