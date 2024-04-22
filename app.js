const userValue = prompt('Válassz a köetkezők közül: kő, papír, olló');
const computerValue = ["kő", "papír", "olló"][Math.floor(Math.random() * 3 )];  // számítógép ezekből választhat

console.log(computerValue , userValue);

//1 két érték eggyezik
if (computerValue === userValue) {
    alert( ` ${userValue} - ${computerValue} - Döntetlen`)
}

