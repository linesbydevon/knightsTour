console.log("working");

class gameBoard{
  constructor(level){
    this.level= level;
    this.levels = ["level 1","level 2","level 3","level 4","level 5","level 6"]
    this.size = 0;
    this.move = 0;
    this.moves = [];
    this.squares = [];
    this.gameboard = document.querySelector("#domGame");
    this.movesBTN = document.querySelector("#movesBTN");
    this.domButtons = [];
    this.validMoves = [];
    this.invalidMoves = [];
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
    // console.log(columns)
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
        newButton.innerHTML= `<span>${elem[i].rf}</span>`;
        newButton.setAttribute('data-x',elem[i].x);
        newButton.setAttribute('data-y',elem[i].y);
        columns[this.squares.indexOf(elem)].appendChild(newButton);
        
      }
    })
    this.domButtons = document.querySelectorAll('#domGame button');
  }
  returnValidMoves(e){
    this.move++;
    this.validMoves = [];
    this.invalidMoves.forEach(elem=>elem.removeAttribute('disabled'));
    // console.log('clicked');
    let x = parseInt(e.currentTarget.dataset.x);
    // console.log(x);
    let y = parseInt(e.currentTarget.dataset.y);
    // console.log(y);
    // console.log(this.domButtons)
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
    e.currentTarget.setAttribute("data-order", this.move)
    e.currentTarget.innerHTML = `<span>${this.move}</span>`;
    e.currentTarget.dataset.x='played';
    e.currentTarget.dataset.y='played';
    console.log(e.currentTarget);
    console.log(this.moves)
    this.moves.push(e.currentTarget);
    console.log(this.moves)
    this.validMoves = knightMoves[0];
    this.invalidMoves = knightMoves[1];
    this.disableInvalid();
    this.isGameOver();
  }
  isGameOver(){
    if (this.move === this.size){
      this.moves.forEach(elem=>elem.setAttribute('class','win'))
    }
    else if (this.validMoves.length===0){
      this.moves.forEach(elem=>elem.setAttribute('class','lose'))
    }
  }
  disableInvalid(){
    this.invalidMoves.forEach(elem=>elem.setAttribute('disabled',''))
  }
  listMoves(){
    //if there is a section element existing as a child of #domGame, toggle class "moves"
    if(document.querySelector("#domGame section")){
      document.querySelector("#domGame section").classList.toggle("moves");
      console.log("section exists, toggling classList")
    }
    //else create a section element, set class attribute to "hidden moves" and append to #domElement
    else{
    let section = document.createElement("section");
    section.setAttribute("class","hidden moves")
    this.gameboard.appendChild(section);
    console.log("no section, creating")
    }
    //assign section to variable, set its innerHTML empty, then create a span for each element in moves array
    let section = document.querySelector("#domGame section")
    section.innerHTML = '';

    this.moves.forEach(elem=>{
      
      let span = document.createElement("span");
      span.innerText = `${elem.dataset.order}: ${elem.id}`;
      section.appendChild(span)
    }
  )
  }
  setSquareListeners(){
    this.domButtons.forEach(elem=>elem.addEventListener('click',this.boundValidMoves));
    this.movesBTN.addEventListener("click",this.boundListMoves);
  }


}

const makeGame = (e) =>{
  let currentValue = document.querySelector('input[name="difficulty"]:checked').value;
  console.log(currentValue)
  document.querySelector("#domGame").innerHTML = '';
  if (e===undefined){
    console.log('no event')
  }else if (e.currentTarget.name){
    console.log("button clicked")
    currentValue = false;
    currentValue = e.currentTarget.value;
    console.log(e.currentTarget);
    document.querySelector("#difficultyDisplay p").innerText = e.currentTarget.value;
    document.querySelector(".options").classList.toggle("expandedDifficulty");
    document.querySelector("#difficultyDisplay p").classList.toggle("down");
  }
  console.log(document.querySelector('input[name="difficulty"]').value)
  //let game = new gameBoard(document.querySelector("[name='difficultySelector']").value)
  let game = new gameBoard(document.querySelector('input[name="difficulty"]:checked').value)
  game.setSize();
  game.createColumns();
  game.setSquareListeners()
}

makeGame();
document.querySelector("#resetBTN").addEventListener('click',makeGame);
//document.querySelector("[name='difficultySelector']").addEventListener('change',makeGame);
//console.log(document.querySelector('input[name="difficulty"]:checked'));
document.querySelectorAll('input[name="difficulty"]').forEach(elem=>elem.addEventListener('click',makeGame));
document.querySelector("#difficultyDisplay").addEventListener("click", ()=>{
  document.querySelector('.options').classList.toggle("expandedDifficulty");
  document.querySelector("#difficultyDisplay p").classList.toggle("down")
}
)
