const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 11;
const STRONG_ATTACK_VALUE = 15;
const HEAL_VALUE = 10;
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;


adjustHealthBars(chosenMaxLife);

function action(mode) {
  let damage;
  if (mode === "ATTACK"){
    damage = dealMonsterDamage(ATTACK_VALUE);
  } else if (mode === "STRONG_ATTACK"){
    damage = dealMonsterDamage(STRONG_ATTACK_VALUE);
  } else if (mode === "HEAL"){
    let healValue = HEAL_VALUE;
    currentPlayerHealth += healValue;
    if(currentPlayerHealth > chosenMaxLife){
      healValue = HEAL_VALUE - (currentPlayerHealth - chosenMaxLife);
      currentPlayerHealth = chosenMaxLife; 
    }
    increasePlayerHealth(healValue);
    damage = 0;
  }
  
  currentMonsterHealth -= damage;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && hasBonusLife){
    currentPlayerHealth += playerDamage;
    hasBonusLife = false;
    removeBonusLife();
    setPlayerHealth(currentPlayerHealth);
    alert("You would be dead, but the bonus life saved you.");    
  }
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
     alert("You won!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0){
    alert("You lost!")
  }  else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0){
    alert("You are both dead.")
  }
}

function attackHandler() {
  action("ATTACK");
}

function strongAttackHandler() {
  action("STRONG_ATTACK");
}

function healPlayerHandler(){
  action("HEAL");
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", attackHandler);
healBtn.addEventListener("click", healPlayerHandler);
