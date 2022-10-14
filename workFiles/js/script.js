console.log("working");

class gameBoard{
  constructor(level){
    this.level= level;
    this.levels = ["level 1","level 2","level 3","level 4","level 5","level 6"]
    this.size = 0;
    this.squares = [];
    this.gameboard = document.querySelector("#domGame");
    this.domButtons = [];
    this.validMoves = [];
    this.invalidMoves = [];
    //https://alephnode.io/07-event-handler-binding/ to fix "this" being read as referring to event object instead of class scope on event
    this.boundValidMoves = this.returnValidMoves.bind(this);
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
    }
  }
  //takes square root of size and creates a one parent array with <n> nested arrays within it then populates each nested array with values 0 through <n>
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
    console.log(columns)
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
        //create buttons and append them to columns (starting from [0] in columns array, appending each item in child array in squares starting at [0])
        let newButton = document.createElement('button');
        newButton.setAttribute('id',`${elem[i].rf}`);
        newButton.innerText= `${elem[i].rf}`;
        newButton.setAttribute('data-x',elem[i].x);
        newButton.setAttribute('data-y',elem[i].y);
        columns[this.squares.indexOf(elem)].appendChild(newButton);
        
      }
    })
    this.domButtons = document.querySelectorAll('#domGame button');
  }
  returnValidMoves(e){
    this.validMoves = [];
    this.invalidMoves.forEach(elem=>elem.removeAttribute('disabled'));
    console.log('clicked');
    let x = parseInt(e.currentTarget.dataset.x);
    console.log(x);
    let y = parseInt(e.currentTarget.dataset.y);
    console.log(y);
    console.log(this.domButtons)
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
    e.currentTarget.dataset.x='played';
    e.currentTarget.dataset.y='played';
    this.validMoves = knightMoves[0];
    this.invalidMoves = knightMoves[1];
    this.disableInvalid();
  }
  disableInvalid(){
    this.invalidMoves.forEach(elem=>elem.setAttribute('disabled',''))
  }
  setSquareListeners(){
    this.domButtons.forEach(elem=>elem.addEventListener('click',this.boundValidMoves))
  }

}

const game = new gameBoard("level 1");
game.setSize();
game.createColumns();
game.setSquareListeners();

