class Puissance4{

  constructor(arrayPlayer){
      this.rows = 6
      this.cols = 7
      this.game = document.querySelector('#game');
      this.joueurs = arrayPlayer
      this.joueurTurn = this.joueurs[0]
      this.gameBoard()
      this.listener()
  }

  gameBoard(){
      for (let col = 0; col < this.cols; col++) {
          let gameCol = document.createElement("div")

          this.game.appendChild(gameCol)
          gameCol.classList.add('col')
          gameCol.setAttribute('data-col', col)

          for (let row = 1; row < this.cols; row++) {
              let gameRow = document.createElement("div")
              gameCol.appendChild(gameRow)
              gameRow.classList.add('row', 'row-empty')
              gameRow.setAttribute('data-row', row)
          }
      }
  }

     listener(){

      const game = this.game
      let gameCols = document.querySelectorAll('.col');

      gameCols.forEach(function (col){
          col.addEventListener('click',function(e){

          })
      })
      this.game.addEventListener('click', (event)=>{
          for(let i = event.target.parentNode.children.length -1 ; i >=0 ; i--){
              if(event.target.parentNode.children[i].classList.contains('row-empty')){
                  event.target.parentNode.children[i].classList.remove('row-empty')
                  event.target.parentNode.children[i].classList.add(this.joueurTurn.getColor())
                  this.checkWin(event.target.parentNode.children[i])
                  this.switchPlayer()
                  return
              }
          }
      })
  }

  switchPlayer(){

    if(this.joueurTurn == this.joueurs[0]){
        this.joueurTurn = this.joueurs[1]
    }else{
        this.joueurTurn = this.joueurs[0]
    }
  }

  checkWin(divJouer){
    let count = 1
    //let leftDiagCount = 1
    this.checkVertical(divJouer)
    count = this.checkHorizontalGauche(divJouer, count)
    this.checkHorizontalDroite(divJouer,count)
    this.checkDiagonalBasGauche(divJouer)
    this.checkDiagonalBasDroite(divJouer)
  }

  checkVertical(divJouer){
    let count = 1
    let idDivJouer = divJouer.getAttribute('data-row')-1
    let col = divJouer.parentNode.children

    while(col[idDivJouer +1] !== undefined){
      if(col[idDivJouer +1].classList.contains(this.joueurTurn.getColor()) == divJouer.classList.contains(this.joueurTurn.getColor())){
        count++
        divJouer = col[idDivJouer +1]
        idDivJouer = divJouer.getAttribute('data-row')-1
        if (count === 4) {
          return alert("Player " + this.joueurTurn.getColor() + " Win!")
        }
      }else{
        break
      }
    }
  }

  checkHorizontalDroite(divJouer, count){
    
    let idRowJouer = parseInt(divJouer.getAttribute('data-row')) // row de la col jouer
    let arrayRow = divJouer.parentNode.children // tout les row de notre col jouer
    let arrayCol = divJouer.parentNode.parentNode.children // toute les colones 
    let idColJouer = parseInt(divJouer.parentNode.getAttribute('data-col')) // id de la col jouer
    let countColAfter = 1
    
    while(arrayCol[idColJouer -countColAfter] !== undefined &&
          arrayCol[idColJouer -countColAfter].children[idRowJouer -1].classList.contains(this.joueurTurn.getColor()) == arrayCol[idColJouer].children[idRowJouer -1].classList.contains(this.joueurTurn.getColor())){
          countColAfter++
          count++
        if (count === 4) {
          return alert("Player " + this.joueurTurn.getColor() + " Win!")
      }
    }
  }

  checkHorizontalGauche(divJouer, count){
  
    let idRowJouer = parseInt(divJouer.getAttribute('data-row')) // row de la col jouer
    let arrayRow = divJouer.parentNode.children // tout les row de notre col jouer
    let arrayCol = divJouer.parentNode.parentNode.children // toute les colones 
    let idColJouer = parseInt(divJouer.parentNode.getAttribute('data-col')) // id de la col jouer
    let countColBefore = 1
 
    while(arrayCol[idColJouer +countColBefore] !== undefined &&
          arrayCol[idColJouer +countColBefore].children[idRowJouer -1].classList.contains(this.joueurTurn.getColor()) == arrayCol[idColJouer].children[idRowJouer -1].classList.contains(this.joueurTurn.getColor())){
          countColBefore++
          count++
        if(count === 4) {
          return alert("Player " + this.joueurTurn.getColor() + " Win!")
        }
    }
    return count
  }
  checkDiagonalBasGauche(divJouer){

    let idRowJouer = parseInt(divJouer.getAttribute('data-row')-1) // row de la col jouer INT
    let arrayCol = divJouer.parentNode.parentNode.children // toute les colones ARRAY
    let idColJouer = parseInt(divJouer.parentNode.getAttribute('data-col')) // id de la col jouer INT
    let countColDiagBefore =  1 // --
    let countRowDiagAfter = 1 // ++
    let leftDiagCount = 1

    // console.log("id de la row jouer",divJouer);
    // console.log("id au dessu de la row jouer",arrayCol[idColJouer].children[idRowJouer-2]);
    // console.log("id de la row jouer , enfant de la col du tab col moins le compteur",arrayCol[idColJouer -1].children[idRowJouer+1]);
   // console.log("TEST COL - 1 ROW + 2",arrayCol[idColJouer -1].children[idRowJouer]);
    // console.log("Compteur diagonale droit",leftDiagCount);
    // console.log("Compteur colBefore", countColDiagBefore);
    // console.log("Compteur rowAfter",countRowDiagAfter);

    while(
      arrayCol[idColJouer - countColDiagBefore] !== undefined &&
      arrayCol[idColJouer - countColDiagBefore].children[idRowJouer +countRowDiagAfter] !== undefined && 
      arrayCol[idColJouer- countColDiagBefore].children[idRowJouer+countRowDiagAfter].classList.contains(this.joueurTurn.getColor()) == divJouer.classList.contains(this.joueurTurn.getColor())
    ){
      countColDiagBefore++
      countRowDiagAfter++
      leftDiagCount++
      console.log(leftDiagCount);
      // console.log("Compteur colBefore BOUCLE", countColDiagBefore);
      // console.log("Compteur rowAfter BOUCLE",countRowDiagAfter);
      // console.log("Compteur diagonale droit boucle",leftDiagCount);
      
          if(leftDiagCount === 4) {
            setTimeout(() => {
              
              return alert("Player " + this.joueurTurn.getColor() + " Win!")
            }, 30);
        }
    }

  }

  checkDiagonalBasDroite(divJouer){ // IN PROGRESS

    let idRowJouer = parseInt(divJouer.getAttribute('data-row')-1) // row de la col jouer INT
    let arrayCol = divJouer.parentNode.parentNode.children // toute les colones ARRAY
    let idColJouer = parseInt(divJouer.parentNode.getAttribute('data-col')) // id de la col jouer INT
    let countColDiagBefore =  1 // --
    let countRowDiagAfter = 1 // ++
    let leftDiagCount = 1

    // console.log("id de la row jouer",divJouer);
    // console.log("id au dessu de la row jouer",arrayCol[idColJouer].children[idRowJouer-2]);
    // console.log("id de la row jouer , enfant de la col du tab col moins le compteur",arrayCol[idColJouer -1].children[idRowJouer+1]);
   // console.log("TEST COL - 1 ROW + 2",arrayCol[idColJouer -1].children[idRowJouer]);
    // console.log("Compteur diagonale droit",leftDiagCount);
    // console.log("Compteur colBefore", countColDiagBefore);
    // console.log("Compteur rowAfter",countRowDiagAfter);

    while(
      arrayCol[idColJouer - countColDiagBefore] !== undefined &&
      arrayCol[idColJouer - countColDiagBefore].children[idRowJouer -countRowDiagAfter] !== undefined && 
      arrayCol[idColJouer- countColDiagBefore].children[idRowJouer -countRowDiagAfter].classList.contains(this.joueurTurn.getColor()) == divJouer.classList.contains(this.joueurTurn.getColor())
    ){
      countColDiagBefore++
      countRowDiagAfter++
      leftDiagCount++
      console.log(leftDiagCount);
      // console.log("Compteur colBefore BOUCLE", countColDiagBefore);
      // console.log("Compteur rowAfter BOUCLE",countRowDiagAfter);
      // console.log("Compteur diagonale droit boucle",leftDiagCount);
      
          if(leftDiagCount === 4) {
            setTimeout(() => {
              
              return alert("Player " + this.joueurTurn.getColor() + " Win!")
            }, 30);
        }
    }

  }
}