function getRandomValue(min, max){
    return Math.floor( Math.random() * (max - min) + min )
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth : 100,
            monsterHealth : 100,
            roundCounter:0,
            healCounter:0,
            result:false,
            logMessages: []
        }
    },
    computed : {
        playerHealthBar(){
            if(this.playerHealth <= 0)
                return  { width: '0%' }
            return { width: this.playerHealth + '%' }
        },
        monsterHealthBar(){
            if(this.monsterHealth <= 0)
                return  { width: '0%' }
            return { width: this.monsterHealth + '%' }
        }
    },
    watch:{
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0)
                this.result = "It's a Draw!";
            else if(value <= 0)
                this.result = "You Lost!";
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0)
                this.result = "It's a Draw!";
            else if(value <= 0)
                this.result = "You Won!";
        },
    },
    methods :{
        attackMonster(){
            this.roundCounter++;
            const attackValue = getRandomValue( 5, 10 )
            this.monsterHealth -= attackValue
            this.manageLogMessages('player', 'attack', attackValue)
            this.attackPlayer()
        },
        attackPlayer(){
            const attackValue = getRandomValue( 7, 15 )
            this.playerHealth -= attackValue
            this.manageLogMessages('monster', 'attack', attackValue)
        },
        specialAttack(){
            this.roundCounter++;
            const specialAttackValue = getRandomValue(10, 20);
            this.monsterHealth -= specialAttackValue
            this.manageLogMessages('player', 'attack', specialAttackValue)
            this.attackPlayer();
        },
        healPlayer(){
            this.healCounter++
            this.roundCounter++;
            const healValue = getRandomValue(10, 20);
            this.playerHealth += healValue;
            this.playerHealth = this.playerHealth > 100 ? 100 : this.playerHealth;
            this.manageLogMessages('player', 'heal', healValue)
            this.attackPlayer();
        },
        startOver(){
            this.playerHealth = 100
            this.monsterHealth = 100
            this.roundCounter = 0
            this.healCounter = 0
            this.result = false
            this.logMessages = []
        },
        surrender(){
            this.result = 'You Lost!'
        },
        manageLogMessages(who, what, value){
            const log = {
                by: who,
                type : what,
                val : value
            }
            this.logMessages.unshift(log);
        }
    }
})
app.mount('#game')