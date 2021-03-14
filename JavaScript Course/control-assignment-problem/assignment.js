randomNumber1 = Math.random(); // produces random number between 0 (including) and 1 (excluding)
randomNumber2 = Math.random();

if( ((randomNumber1 > 0.7) && (randomNumber2 > 0.7)) || (randomNumber1 < 0.2) || (randomNumber2 < 0.2) ) {
    alert("The condition is fulfilled.");
};

console.log(randomNumber1);
console.log(randomNumber2);



let tablica = [ 1.1, 1.2, 1.3, 1.4];

for( let i = 3; i >= 0; i-- ){
    console.log(tablica[i]);
}

let j = 0;

while(j < 4) {
    console.log(tablica[j]);
    j ++;
}