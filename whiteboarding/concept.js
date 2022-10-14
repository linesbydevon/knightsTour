class gameBoard{
  constructor(level){
    this.level= level;
    this.levels = ["level 1","level 2","level 3","level 4","level 5","level 6"]
    this.size = 0;
    this.squares = [];
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
      }
    })
  }

}

const game = new gameBoard("level 5");
game.setSize();
game.createColumns();
console.log(game.squares)
