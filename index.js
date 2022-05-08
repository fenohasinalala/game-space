
    

const GameBody = document.querySelector('#GameBody')
const grid = document.querySelector('#bodyGame')
const strart = document.querySelector("#startGame")

strart.addEventListener("click",function(e){
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    //document.querySelector('#bodyGame div').remove()
    //document.querySelector("#startGame").remove()
    startGame()
    
})



function startGame() {
    //squares.remove()
    //"grid" c'est le div de id bodyGame
    let placeOfAlier = 202
    let width = 15
    let direction = +1
    let timereAlien
    let score = 0
    let timescore
    let vitessAlien = 600
    //let score = document.
    
    grid.classList.remove('noActiv')
    
    function scorefunction() {
        score ++
    }
    
    for (let i = 0; i < 225; i++) {
        const caseGame = document.createElement('div');
        //"caseGame" veu dir créé un div
        grid.appendChild(caseGame)
        //apliqué "caseGame" comme enfent de "grid"
    }
    
    const squares = Array.from(document.querySelectorAll('#bodyGame div'));
    //construire un tableau dans les cases sont tout le div dans "bodyGame"
    
    let alienInvaders = [
        0,1,2,3,4,5,6,7,
        15,16,17,18,19,20,21,22,
        30,31,36,37
    ]
    
    function definirAlien() {
        for (let i = 0; i < alienInvaders.length; i++) {
            squares[alienInvaders[i]].classList.add('enemiGame') ;
            //le dive dans le array squares d'index ajoute un class "enemiGame"
        }
    }
    
    function enlevrAlien() {
        for (let i = 0; i < alienInvaders.length; i++) {
            squares[alienInvaders[i]].classList.remove('enemiGame') ;
            //le dive dans le array squares d'index ajoute un class "enemiGame"
        }
    }
    
    definirAlien()
    
    squares[placeOfAlier].classList.add('alierGame')
    
    function moveAlier(clik) {
        squares[placeOfAlier].classList.remove('alierGame')
        //enlever le class "alierGame" 
        switch (clik.key) {
            //clik.key renvoi un array contenont le nom de l'ogjet "clik"
            case 'ArrowLeft':
                //le touche lefte
                if (placeOfAlier % width !== 0) {
                    placeOfAlier -=1
                }
                break;
            case 'ArrowRight':
                //le touche lefte
                if (placeOfAlier % width !== width - 1) {
                    placeOfAlier +=1
                }
                break;
            default:
                break;
        }
        squares[placeOfAlier].classList.add('alierGame')
    }
    
    document.addEventListener('keydown', moveAlier)
    //a chaque foi qu'un "kaydown"(clic) se passe dans le "document" activer la fonction "moveAlier" de variable 
    
    function gameOver() {
        console.log("GAME OVER");
    }
    
    function moveAlien() {
        const leftLimit = alienInvaders[0] % width === 0
        const rightLimit = alienInvaders[alienInvaders.length-1] % width === width -1
        enlevrAlien()
    
        if ((leftLimit || direction==+1) && (rightLimit || direction==-1)){
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width
            }
            direction = direction*(-1)
        }else{
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += direction
            }
        }
        definirAlien()
        if (alienInvaders[alienInvaders.length-1] >= width*13){
            gameOver()
            clearTimeout(timereAlien)
            //areté la repetition "timereAlien"
        }
    }
    
    timereAlien = setInterval(moveAlien, vitessAlien)
    //refaire le fonction "movealien" tout les vitessAlien ms
    
    
    function shoot(e) {
        let laserId
        let currentlaser = placeOfAlier
        function movelaser() {
            squares[currentlaser].classList.remove("micilame")
            currentlaser -= width
            squares[currentlaser].classList.add("micilame")
            if (squares[currentlaser].classList.contains('enemiGame')) {
                squares[currentlaser].classList.remove("micilame")
                squares[currentlaser].classList.remove("enemiGame")
                squares[currentlaser].classList.add("explosionGame")
                score++
                document.getElementById("scorePoint").innerHTML = score
                clearTimeout(laserId)
                setTimeout(() => {squares[currentlaser].classList.remove("explosionGame");}, 100)
                clearTimeout(timereAlien)
                let a=[...alienInvaders.slice(0,alienInvaders.indexOf(currentlaser)),...alienInvaders.slice(alienInvaders.indexOf(currentlaser)+1)]
                if (a.length==0) { 
                    vitessAlien-=100
                    alienInvaders = [
                        0,1,2,3,4,5,6,7,
                        15,16,17,18,19,20,21,22,
                        30,31,36,37
                    ]
                }else{
                    alienInvaders=a
                }
                timereAlien = setInterval(moveAlien, vitessAlien)
                // console.log(alienInvaders.indexOf(currentlaser));
            }
            if (currentlaser<width) {
                squares[currentlaser].classList.remove("micilame")
                clearTimeout(laserId)
            }
        }
    
        switch (e.key) {
            //clik.key renvoi un array contenont le nom de l'ogjet "e"
            case 'ArrowUp':
                //le touche haut
                laserId = setInterval(movelaser, 100)
                break;
            default:
                break;
        }
    

    }
    
    document.addEventListener('keydown', shoot)
    
}




