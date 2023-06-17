let jogo = Jogo.newGame;
console.log(jogo);

let countTurn = 0;
let ptsCpu = 0;
let ptsPlayer = 0;
let ptsEmpate = 0;
let jogadaPlayer;
let jogadaCpu;
let goPlay = 0; //Para auziliar no setInterval

const divPlayer = document.getElementById("player");
const divPtsPlayer = document.getElementById("ptsPlayer");
const divPtsCpu = document.getElementById("ptsCpu");
const divPtsEmpate = document.getElementById("ptsEmpate");
const myBody = document.querySelector("body");
const turnos = document.getElementById("turnos"); // <- Apresentar resultado e turnos jogados
const btnStatus = document.getElementById("status"); // <- Botões

divPlayer.innerText = jogo.getNamePlayer;
divPtsPlayer.innerText = jogo.getPtsPlayer;
divPtsEmpate.innerText = jogo.getPtsEmpate;
divPtsCpu.innerText = jogo.getPtsCpu;

/////MOCK PARA TESTAR OBJETO DO JOGO/////
// jogo.setNamePlayer = "Osmar";
// jogo.setPtsPlayer = 2;
// jogo.setPtsCpu = 1;
// jogo.setGame = true;
// jogo.setTurn = 3;

//Solicitando nome do jogador
    jogo.setNamePlayer = prompt("Nome do jogador:");
    console.log(jogo.getNamePlayer);

    //Só recebe o nome do jogador se for diferente de nulo ou não comece com barra de espaço
    if(jogo.getNamePlayer != null && jogo.getNamePlayer != String().startsWith(" ")) {
        divPlayer.innerText = jogo.getNamePlayer;
    } else {
        jogo.setNamePlayer = "Jogador";
    }

btnStatus.addEventListener("click", ()=>{
    jogo = Jogo.newGame;
    console.log(jogo);

    countTurn = 0;
    ptsCpu = 0;
    ptsPlayer = 0;
    ptsEmpate = 0;

    divPlayer.innerText = jogo.getNamePlayer;
    divPtsPlayer.innerText = jogo.getPtsPlayer;
    divPtsEmpate.innerText = jogo.getPtsEmpate;
    divPtsCpu.innerText = jogo.getPtsCpu;
    
    alert("Esta é a primeira rodada!\nPara finalizar o jogo basta apertar no botão 'Cancelar' na tela de escolha de jogada.\nBoa sorte!");
    btnStatus.style.display = "none";
    turnos.style.display = "block";
    turnos.innerHTML = "Nº de jogadas: " + jogo.getTurn;
    jogo.setGame = true;
    runGame();
});


function runGame() { // Função para simular loop, porém com tempo de atraso.
    setTimeout(() => {
        jogada(); //Aqui inicia-se o loop do game
    }, 2000);
}

function jogada() {
    //do {
        jogadaPlayer = Number(prompt("Escolha:\n1 - Pedra\n2 - Papel\n3 - Tesoura\n===> Para sair, pressione 'Cancelar' ou insira qualquer outro caracter"));
        console.log(jogadaPlayer);
        
            if(jogadaPlayer == 1 || jogadaPlayer == 2 || jogadaPlayer == 3){
                jogadaCpu = Math.floor(Math.random() * 3) + 1;
            
                checkPlayAndSetPoint(jogadaPlayer, jogadaCpu);
                //Contagem de turnos
                countTurn++;
                jogo.setTurn = countTurn;
                turnos.innerHTML = "Nº de jogadas: " + jogo.getTurn;
                //console.log(jogo.getTurn);
                runGame(); //Chamando o novo turno
            } else {
                if(!confirm("Deseja continuar jogando?")){
                    jogo.setGame = false;
                    alert("Fim do jogo!\n" + victory());
                    turnos.innerHTML = "Nº de jogadas: " + jogo.getTurn + "<hr>" + victory() + "<br><br>";
                } 
        }
    //} while(jogo.getGame);
}

function checkPlayAndSetPoint(player, cpu) {
    let message = jogo.getNamePlayer + " => " + getMove(jogadaPlayer) + "\n" +
                "cpu => " + getMove(jogadaCpu) + "\n*******************\n";

    if(player == 1 && cpu == 2 || player == 2 && cpu == 1) {
        message += "Papel envolve Pedra!";
    } else if(player == 2 && cpu == 3 || player == 3 && cpu == 2) {
        message += "Tesoura corta Papel!";
    } else if(player == 3 && cpu == 1 || player == 1 && cpu == 3) {
        message += "Pedra quebra Tesoura!";
    }
    
    if(player == cpu) {
        alert(message + "\nEmpate! Ninguém pontuou.");
        ptsEmpate++;
        jogo.setPtsEmpate = ptsEmpate;
        divPtsEmpate.innerText = jogo.getPtsEmpate;
    } else if(player == 1 && cpu == 2) {
        alert(message + "\nPonto para CPU!");
        ptsCpu++;
        jogo.setPtsCpu = ptsCpu;
        divPtsCpu.innerText = jogo.getPtsCpu;
    } else if(player == 2 && cpu == 3) {
        alert(message + "\nPonto para CPU!");
        ptsCpu++;
        jogo.setPtsCpu = ptsCpu;
        divPtsCpu.innerText = jogo.getPtsCpu;
    } else if(player == 3 && cpu == 1) {
        alert(message + "\nPonto para CPU!");
        ptsCpu++;
        jogo.setPtsCpu = ptsCpu;
        divPtsCpu.innerText = jogo.getPtsCpu;
    } else {
        alert(message + "\nPonto para "+ jogo.getNamePlayer +"!");
        ptsPlayer++;
        jogo.ptsPlayer = ptsPlayer;
        divPtsPlayer.innerText = jogo.getPtsPlayer;
    }
}

function victory() {
    btnStatus.innerHTML = "Jogar novamente?";
    btnStatus.style.display = "block";
    btnStatus.style.margin = "auto";

    if(jogo.ptsPlayer == jogo.ptsCpu) {
        return "Empatou!";
    } else if(jogo.ptsPlayer > jogo.ptsCpu) {
        return "Vitória de "+jogo.getNamePlayer+"!";
    } else {
        return "Derrota! Computador venceu!";
    }
}


function getMove(move) {
    switch(move) {
        case 1: return "Pedra";
        case 2: return "Papel";
        case 3: return "Tesoura";
    }
}