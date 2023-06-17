//Variáveis de controle do jogo
let namePlayer = "Jogador";
let ptsPlayer = 0;
let ptsCpu = 0;
let turn = 0;
let game = false; //Controlar se o jogo continua
let choose = false; //Controlar se a jogada foi aceita no primeiro turno
let optionPlayer = null;
let optionCpu = null;

//1 - Pedra
//2 - Papel
//3 - Tesoura
//Função para nomear a jogada
function getPlay(number) {
    if(number == 1) {
        return "PEDRA ";
    }
    if(number == 2) {
        return "PAPEL ";
    }
    if(number == 3) {                
        return "TESOURA ";
    }
}

//Conições de vitória, derrota e empate
function setPoint() {
    if(optionPlayer == optionCpu) {
        return "\n/// Empate! Ninguém pontuou! ///\n";
    } else if(optionPlayer == 1 && optionCpu == 2
            || optionPlayer == 2 && optionCpu == 3
            || optionPlayer == 3 && optionCpu == 3) {
        ptsCpu++;
        return "Ponto para cpu!\n";
    } else {
        ptsPlayer++;
        return "Ponto para " + namePlayer + "!\n";
    } 
}

//Função para apresentar placar
function showPoints() {
    return "\n************* PONTUAÇÃO *************\n"
            + namePlayer + ": " + ptsPlayer +"     cpu: " + ptsCpu +"     Jogadas: " + turn
            +"\n*************************************\n"
}

//Função para mostrar o resultado final
function finalResult() {
    if(ptsPlayer == ptsCpu) {
        return "*** Empate ***";
    }
    if(ptsPlayer > ptsCpu) {
        return "*** Vitória! "+ namePlayer +", você venceu! ***";
    }
    if(ptsPlayer < ptsCpu) {
        return "*** Derrota! O computador venceu! ***";
    }
}

//Início do jogo
console.log("=============== JOKENPO ===============\n"
            +"Você jogará contra o computador!\n");

console.log("Qual o seu nome? ");

//Iniciando o evento de entrada de dados pelo terminal
//Cada vez que se aperta "Enter", é realizada a chamada deste evento
process.stdin.on("data", (enter) => {
    
    if(namePlayer === "Jogador") {
        namePlayer = enter.toString().replace(/(\r\n|\n|\r)/gm, ""); //Regex para remover caracteres de quebra de linha
        game = !game;
    }

    //Assim que o nome do jogador é inserido, este bloco será executado
    if(game) {

        //Se for o turno 0 (primeira jogada), apresenta o placar e as opções de jogada apenas.
        //Esse artifício está sendo utilizado por causa da forma como a entrada de dados é feita.
        if(turn == 0) {
            if(!choose) {
                process.stdout.write(showPoints());
                process.stdout.write("\nDigite o número da sua opção:\n(1) Pedra\n(2) Papel\n(3) Tesoura\n(9) Sair\n\n=> ");
            }
        }

        //A variável choose inicia false para que a primeira entrada de dados seja apenas para o nome.
        //A partir da segunda chamada deste evento (data) é que o valor vai para a variável optionPlayer
        (choose) ? optionPlayer = enter : choose = true;

        if(optionPlayer != null) {
            if(optionPlayer == 1 || optionPlayer == 2 || optionPlayer == 3 || optionPlayer == 9) {
                optionCpu = Math.floor(Math.random() * 3) + 1; //Aqui é lançada a opção do computador
                if(optionPlayer == 9) {
                    game = !game;
                    process.stdout.write("\nFIM DO JOGO\n");
                    process.stdout.write(showPoints());
                    process.stdout.write(finalResult());
                } else {
                    process.stdout.write("\n" + namePlayer + ": " + getPlay(optionPlayer));
                    process.stdout.write("\ncpu: " + getPlay(optionCpu));

                    if(optionPlayer == 1 && optionCpu == 2 || optionPlayer == 2 && optionCpu == 1) {
                        process.stdout.write("\n+++ Papel envolve Pedra! +++\n\n");
                    } else if(optionPlayer == 2 && optionCpu == 3 || optionPlayer == 3 && optionCpu == 2) {
                        process.stdout.write("\n--- Tesoura corta Papel! ---\n\n");
                    } else if(optionPlayer == 3 && optionCpu == 1 || optionPlayer == 1 && optionCpu == 3) {
                        process.stdout.write("\n*** Pedra quebra Tesoura ***\n\n");
                    }

                    process.stdout.write(setPoint());
                    turn++;
                    process.stdout.write(showPoints());
                    process.stdout.write("\nDigite o número da sua opção:\n(1) Pedra\n(2) Papel\n(3) Tesoura\n(9) Sair\n\n=> ");
                }
            } else {
                process.stdout.write("Opção inválida! Digite novamente: ");
            }
        }

    } else {
        process.stdin.destroy();
    }

});