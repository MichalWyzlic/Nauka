const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 11;
const STRONG_ATTACK_VALUE = 15;
const HEAL_VALUE = 10;
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const MODE_HEAL = "HEAL";

const LOG_EVENT_PLAYER_ATTACK = "EVENT_PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "EVENT_PLAYER_STRONG_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "EVENT_PLAYER_HEAL";
const LOG_EVENT_MONSTER_ATTACK = "EVENT_MONSTER_ATTACK";
const LOG_EVENT_GAME_OVER = "EVENT_GAME_OVER";

let enteredValue = prompt("Maximum life for you and the monster.", "100");

let chosenMaxLife = parseInt(enteredValue);
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

let battleLog = [];

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry;
  logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}
adjustHealthBars(chosenMaxLife);

function action(mode) {
  let damage;
  if (mode === MODE_ATTACK) {
    damage = dealMonsterDamage(ATTACK_VALUE);
    writeToLog(
      LOG_EVENT_PLAYER_ATTACK, 
      damage, 
      currentMonsterHealth, 
      currentPlayerHealth
      );
  } else if (mode === MODE_STRONG_ATTACK) {
    damage = dealMonsterDamage(STRONG_ATTACK_VALUE);
    writeToLog(
      LOG_EVENT_PLAYER_STRONG_ATTACK, 
      damage, 
      currentMonsterHealth, 
      currentPlayerHealth
      );
  } else if (mode === MODE_HEAL) {
    let healValue = HEAL_VALUE;
    currentPlayerHealth += healValue;
    if (currentPlayerHealth > chosenMaxLife) {
      healValue = HEAL_VALUE - (currentPlayerHealth - chosenMaxLife);
      currentPlayerHealth = chosenMaxLife;
    }
    increasePlayerHealth(healValue);
    damage = 0;
    writeToLog(
      LOG_EVENT_PLAYER_HEAL, 
      healValue, 
      currentMonsterHealth, 
      currentPlayerHealth
      );
  }

  currentMonsterHealth -= damage;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK, 
    playerDamage, 
    currentMonsterHealth, 
    currentPlayerHealth
    );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    currentPlayerHealth += playerDamage;
    hasBonusLife = false;
    removeBonusLife();
    setPlayerHealth(currentPlayerHealth);
    alert("You would be dead, but the bonus life saved you.");
  }
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");
    writeToLog(
      LOG_EVENT_GAME_OVER, 
      "Player won", 
      currentMonsterHealth, 
      currentPlayerHealth
      );
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost!");
    writeToLog(
      LOG_EVENT_GAME_OVER, 
      "Player lost", 
      currentMonsterHealth, 
      currentPlayerHealth
      );
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("You are both dead.");
    writeToLog(
      LOG_EVENT_GAME_OVER, 
      "Draw", 
      currentMonsterHealth, 
      currentPlayerHealth
      );
    reset();
  }
}

function attackHandler() {
  action(MODE_ATTACK);
}

function strongAttackHandler() {
  action(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  action(MODE_HEAL);
}

function printLogHandler(){
  console.log(battleLog);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler)
