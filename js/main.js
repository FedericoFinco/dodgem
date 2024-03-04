console.log("prova")
const selectionEle = document.getElementById("chooseNumber")
const generator = document.getElementById("generator")
const mainEle= document.getElementById("mainGrid")
const turnCounterEle= document.querySelector(".turnCounter")
const errorEle= document.querySelector(".error")
const scoreboardEle= document.querySelector(".scoreboard")
let cars=[]
let desiredGrid=3
let turnCounter=0
let desiredNumber
let blueArrived=0
let redArrived=0

//aggiungo al bottone gioca le funzioni che creano il campo in base alla selezione e avviano i turni
generator.addEventListener("click", function(){
    mainEle.innerHTML=""
    desiredNumber=Number(selectionEle.value)

    pippo(desiredNumber)
    
    createPlayground()

    colorTurnCounter()
        
})

//funzione che modifica il dom per tenere conto del punteggio
function scoreboard(blue,red){
    scoreboardEle.innerHTML=""
    scoreboardEle.innerHTML=`<p class="blue">i blue hanno messo ${blue} macchine.</p><p class="red">i rossi hanno messo ${red} macchine.</p>`
}

//funzione che gestisce la comparsa dei messaggi di errore e la loro eliminazione
function errMove(message){   
    errorEle.innerHTML=`<h3>${message}</h3>`

    setTimeout(remErrMove, 2000)
}

function remErrMove(){
    errorEle.innerHTML=``
}

//funzione che controlla se un player ha vinto e in caso positivo stampa su schermo 
function victoryCheck(){
    if (redArrived==desiredNumber-1){
        mainEle.innerHTML="" 
        const message = document.createElement("div") 
        message.innerHTML="<h2>vince il player Rosso</h2>"
        mainEle.appendChild(message)
        return true
    }
    else if (blueArrived==desiredNumber-1){
        mainEle.innerHTML="" 
        const message = document.createElement("div") 
        message.innerHTML="<h2>vince il player Blu</h2>"
        mainEle.appendChild(message)
        return true
    }else{
        return false
    }
}

//funzione che tiene conto dei turni e colora gli elementi del dom in base al player attuale
function colorTurnCounter(){
    if (turnCounter%2==0){
        turnCounterEle.innerHTML=`<h2>Turno dei Blu</h2>`
        turnCounterEle.classList.remove("red")
        turnCounterEle.classList.add("blue")
    }else{
        turnCounterEle.innerHTML=`<h2>Turno dei Rossi</h2>`
        
        turnCounterEle.classList.remove("blue")
        turnCounterEle.classList.add("red")
    }
}

//funzione che gestisce la creazione del campo, che va effettuata ogni volta che un player effettua una nuova mossa.
function createPlayground() {
    //per prima cosa si controlla che un player non abbia vinto
    if (victoryCheck()){
        victoryCheck()
        blueArrived=0
        redArrived=0
    }else{
        //se un player non ha vinto allora aggiorno la scoreboard e setto il turno
        scoreboard(blueArrived, redArrived)
        colorTurnCounter()
        //pulisco il dom dagli elementi precedenti e ne creo di nuovi in base all'array bidimensionale che tiene traccia delle mosse dei player
        mainEle.innerHTML=""
        const grid = document.createElement("div")
        grid.classList.add("grid")
        mainEle.appendChild(grid)

        for (let index = 0; index < cars.length; index++) {
            const element = cars[index];
            
            for (let c = 0; c < element.length; c++) {
                //ho creato due righe e due colonne di contorno al mio campo da gioco contenenti delle "x". questo per tenere traccia di quando i player portano delle macchine al traguardo(riga superiore per i blu colonna destra per i rossi) e quando invece cercano di fare delle mosse non permesse 
                if (cars[index][c]=="x") {
                    //quindi se c'è una "x" a schermo non printo nulla
                }else if (cars[index][c]=="redcar"){
                    //altrimenti se trovo "redcar" creo il mio div con le classi per le dimensioni in base al campo, dopo di che inserisco l'immagine della macchina e le frecce per muoverla che poi avranno le loro funzioni onclick
                    grid.innerHTML+=`
                    <div class = "square box${desiredGrid} deb${c} debB${index}">
                        <img class="redcar" src="./img/Red-car-on-transparent-background-PNG.png" alt="">
                        <div class="arrowUp"><i class="fas fa-arrow-up"></i></div>
                        <div class="arrowLeft"><i class="fas fa-arrow-left"></i></div>
                        
                        
                        <div class="arrowRight"><i class="fas fa-arrow-right"></i></div>
                    </div>`
                    
                }else if (cars[index][c]=="bluecar"){
                    grid.innerHTML+=`
                    <div class="square box${desiredGrid} deb${c} debB${index}">
                        <div class="arrowUpB"><i class="fas fa-arrow-up"></i></div>
                        <img class="bluecar" src="./img/PngItem_3530748.png" alt="">
                        <div class="carB"></div>
                        <div class="arrowRightB"><i class="fas fa-arrow-right"></i></div>
                        <div class="arrowDownB"><i class="fas fa-arrow-down"></i></div>
                    </div>`
                    // <i class="fas fa-car-alt blue"></i>
                }else{
                    //se non è nessuno dei due tipi di macchina invece crea il div vuoto ma pure sempre con le dimensioni per la griglia
                    grid.innerHTML+=`
                    <div class = "square box${desiredGrid} ${c} ${index}">
                        
                        <div class="car">${cars[index][c]}</div>
                     
                    </div>`
                }
                
            }
            
        }
        console.log("stampo")
        //in un secondo momento faccio il for per inserire gli eventi dato che forse l'aggiunta al dom è un operazione asincrona e non funzionava bene facendo sia la creazione degli elementi che l'assegnazione dell'evento nello stesso ciclo
        for (let i = 0; i < cars.length; i++) {
            const element = cars[i];
            for (let c = 0; c < element.length; c++) {
                const box = element[c];
                //ho gestito i turni dando come eventi quelli del movimento, se la macchina è del colore del turno corrente e cambia il turno , altrimenti la funzione fa solamente comparire il messaggio di errore per il turno
                if (cars[i][c]=="redcar"){
                    console.log(`sono nel for guardo el .box${desiredGrid}.deb${c}.debB${i}`)
                    var el1 = document.querySelector(`.box${desiredGrid}.deb${c}.debB${i} .arrowUp`)
                    var el2 = document.querySelector(`.box${desiredGrid}.deb${c}.debB${i} .arrowLeft`)
                    var el4 = document.querySelector(`.box${desiredGrid}.deb${c}.debB${i} .arrowRight`)
                    console.log(el1)
                    el1.addEventListener("click", function(){
                        console.log(`sono nel listener .box${desiredGrid}.deb${c}.debB${i}`)
                        console.log(`arroup sono l'el ${i} ${c}`)
                        console.log(cars)
                        if (turnCounter%2!=0) {
                            //se il movimento è verso la zona di vittoria viene eliminato l'elemento dall'array e si aggiorna il contatore delle macchine uscite
                            if (i-1==0) {

                                turnCounter++
                                cars[i][c]=""
                                redArrived++
                            }
                            if (checkDestination(i-1, c)  ){
                                cars[i-1][c] = cars[i][c]
                                cars[i][c] = ""
                                console.log(cars)
                                turnCounter++
                            
                            }
                        }else{
                            errMove("è il turno dei blu")
                        }
                        createPlayground()
                    })
                    
                    el2.addEventListener("click", function(){
                        console.log(`sono nel listener .box${desiredGrid}.deb${c}.debB${i}`)
                        console.log(`arroup sono l'el ${i} ${c}`)
                        console.log(cars)
                        if (turnCounter%2!=0) {
                            if (checkDestination(i, c-1)  ){
                                cars[i][c-1] = cars[i][c]
                                cars[i][c] = ""
                                console.log(cars)
                                turnCounter++
                            
                            }
                        }else{
                            errMove("è il turno dei blu")
                        }
                        createPlayground()
                    })
                    // el3.addEventListener("click", function(){
                    //     console.log("car")
                    // })
                    el4.addEventListener("click", function(){
                        console.log(`sono nel listener .box${desiredGrid}.deb${c}.debB${i}`)
                        console.log(`arroup sono l'el ${i} ${c}`)
                        console.log(cars)
                        // if (cars[i][c+1] == "" ){
                        if (turnCounter%2!=0) {
                            if (checkDestination(i, c+1)  ){
                                cars[i][c+1] = cars[i][c]
                                cars[i][c] = ""
                                console.log(cars)
                                turnCounter++
                                // createPlayground
                            
                            }
                        }else{
                            errMove("è il turno dei blu")
                        }
                        createPlayground()
                    })
                
                }else if (cars[i][c]=="bluecar" ){
                    console.log(`sono nel for guardo el .box${desiredGrid}.deb${c}.debB${i}`)
                    var el1 = document.querySelector(`.box${desiredGrid}.deb${c}.debB${i} .arrowUpB`)
                    var el2 = document.querySelector(`.box${desiredGrid}.deb${c}.debB${i} .arrowDownB`)
                    var el4 = document.querySelector(`.box${desiredGrid}.deb${c}.debB${i} .arrowRightB`)
                    console.log(el1)
                    el1.addEventListener("click", function(){
                        console.log(`sono nel listener .box${desiredGrid}.deb${c}.debB${i}`)
                        console.log(`arroup sono l'el ${i} ${c}`)
                        console.log(cars)
                        if (turnCounter%2==0) {
                            if (checkDestination(i-1, c) ){
                                cars[i-1][c] = cars[i][c]
                                cars[i][c] = ""
                                console.log(cars)
                                turnCounter++                            
                            }
                        }else{
                            errMove("è il turno dei rossi")
                        }
                        createPlayground()
                    })
                    el2.addEventListener("click", function(){
                        console.log(`sono nel listener .box${desiredGrid}.deb${c}.debB${i}`)
                        console.log(`arroup sono l'el ${i} ${c}`)
                        console.log(cars)
                        if (turnCounter%2==0) {
                            if (checkDestination(i+1, c) ){
                                cars[i+1][c] = cars[i][c]
                                cars[i][c] = ""
                                console.log(cars)
                                turnCounter++
                            }
                        }else{
                            errMove("è il turno dei rossi")
                        }
                        createPlayground()
                    })
                    el4.addEventListener("click", function(){
                        console.log(`sono nel listener .box${desiredGrid}.deb${c}.debB${i}`)
                        console.log(`arroup sono l'el ${i} ${c}`)
                        console.log(cars)
                        if (turnCounter%2==0) {
                            if (c+1==desiredNumber+1) {
                                turnCounter++
                                cars[i][c]=""
                                blueArrived++
                            }
                            if (checkDestination(i, c+1) ){
                                cars[i][c+1] = cars[i][c]
                                cars[i][c] = ""
                                console.log(cars)
                                turnCounter++
                            }   
                        }else{
                            errMove("è il turno dei rossi")
                        }
                        createPlayground()
                    })
                
                }
            
            }
        }
    }

}

//questa funzione controlla la casella/posizione dell'array di destinazione e vede se è possibile effettuare quella mossa
function checkDestination(index1,index2){
    if (cars[index1][index2]==""){
        return true
    }else if (cars[index1][index2]=="redcar"){
        errMove("c'è una macchina rossa")
        
        return false
    }else if (cars[index1][index2]=="bluecar"){
        errMove("c'è una macchina blu" )
        return false
    }else if (cars[index1][index2]=="x"){
        errMove("non puoi andare qui" )
        return false
    }
}

function pippo(righeColonne) {
    //crea l'array bidimensionale tramite il quale è tenuta traccia della partita e viene creata la vista
    cars=[]
    desiredGrid=righeColonne
    console.log(righeColonne)
    console.log(righeColonne.target)

    for (let index = 0; index < righeColonne+2; index++) {
        let arrayRow=[]
        for (let i = 0; i < righeColonne+2; i++) {
            
            if (index==0) {
                arrayRow.push("x")
            }
            else if (index==righeColonne+1) {
                arrayRow.push("x")
            }
            else if (i==0){
                arrayRow.push("x")
            }
            else if (i==righeColonne+1) {
                arrayRow.push("x")
            }
            else if ( i+(index*(righeColonne+1))%(righeColonne+1)==1 && index!=righeColonne) {
                arrayRow.push("bluecar")
            }
            else if (i!=1 && index==righeColonne) {
                arrayRow.push("redcar")
            }
            else {
                arrayRow.push("")
            }
            
        }
        cars.push(arrayRow)
        console.log(cars)
    }
    
}





