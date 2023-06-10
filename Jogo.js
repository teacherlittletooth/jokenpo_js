class Jogo {

    static newGame = new Jogo(); //Singleton

    constructor(namePlayer, ptsPlayer, ptsEmpate, ptsCpu, game, turn) {
        this.namePlayer = "Jogador";
        this.ptsPlayer = 0;
        this.ptsEmpate = 0;
        this.ptsCpu = 0;
        this.game = false;
        this. turn = 0;
    }

    ////////////// Os Getters e Setters em JavaScript não são como funções comuns.
    ////////////// Para chamá-los e atribuir valor pra eles, é como se fossem variáveis

    get getNamePlayer() {
        return this.namePlayer;
    }

    get getPtsPlayer() {
        return this.ptsPlayer;
    }

    get getPtsEmpate() {
        return this.ptsEmpate;
    }

    get getPtsCpu() {
        return this.ptsCpu;
    }

    get getGame() {
        return this.game;
    }

    get getTurn() {
        return this.turn;
    }

    ////////////////////////

    set setNamePlayer(value) {
        this.namePlayer = value;
    }

    set setPtsPlayer(value) {
        this.ptsPlayer = value;
    }

    set setPtsEmpate(value) {
        this.ptsEmpate = value;
    }

    set setPtsCpu(value) {
        this.ptsCpu = value;
    }

    set setGame(value) {
        this.game = value;
    }

    set setTurn(value) {
        this.turn = value;
    }
}