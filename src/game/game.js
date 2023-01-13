let game = {

    lockMode: false,
    fistCard: null,
    secondCard: null,

    setCard: function(id){

        let card = this.cards.filter(card => card.id === id)[0]//pegando e comparando id
        console.log(card)
        if(card.flipped || this.lockMode) {//checando cartas
            return false
        }

        if(!this.fistCard) {//se for null
            this.fistCard = card
            this.fistCard.flipped = true
            return true
        }else{
            this.secondCard = card
            this.secondCard.flipped = true
            this.lockMode = true
            return true
        }
    },

    checkMatch: function(){
        if(!this.fistCard || !this.secondCard){
            return false
        }
        return this.fistCard.icon === this.secondCard.icon
    },

    clearcards: function(){
        this.fistCard = null
        this.secondCard = null
        this.lockMode = null
    },

    unflipCards(){
        this.fistCard.flipped = null
        this.secondCard.flipped = null
        this.clearcards()
    },

    checkGameOver(){
        return this.cards.filter(card => !card.flipped).length === 0 // retorna true caso nao haja nenhuma carta flipada
    },

    techs: [
        "bootstrap",
        "css",
        "electron",
        "firebase",
        "html",
        "javascript",
        "jquery",
        "mongo",
        "node",
        "react"],
    cards: null,
    
    createCardsFromTechs: function(){//funcao para criar o array com todas as cartas
        this.cards =[]
    
        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech))
        })          
        
        this.cards = this.cards.flatMap(pair=>pair)//funcao map para retornar 20 cartas
        
        this.shuffleCards()
        
        return this.cards
    },
    
    createPairFromTech: function (tech){//funcao para criar dois cards iguais
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        },{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }]
    },
    
    createIdWithTech: function (tech){//funcao para criar o id
        return tech + parseInt(Math.random() *1000 )
    },

    shuffleCards: function (cards){ 
        let currentIndex = this.cards.length
        let randomIndex = 0
    
        while(currentIndex !== 0) {//eqt for dfrt de 0
            randomIndex = Math.floor(Math.random() * currentIndex)
            //pegando sempre a ultima carta  com o floo para embaralhar
            currentIndex--
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    },

    flipCard: function(cardId, gameOverCallBack, noMatchCallBack){
        if(this.setCard(cardId)) {            
            if(this.secondCard){                
                if(this.checkMatch()){
                    this.clearcards()
                    if(this.checkGameOver()){
                     //gameOver  
                     gameOverCallBack() 
                    }
                }else{
                    setTimeout(()=>{
                    //no match
                    this.unflipCards()
                    noMatchCallBack()
                    }, 1000)
                }
            }
        }
    }
}

export default game
