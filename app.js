//const userValue = prompt('Válassz a köetkezők közül: kő, papír, olló');
//const computerValue = ["kő", "papír", "olló"][Math.floor(Math.random() * 3)];  // számítógép ezekből választhat

// a játék alertes megvalósítás:  

// if (computerValue === userValue) {
//     alert(` ${userValue} - ${computerValue} - Döntetlen`)
// } else if (userValue === "kő") {
//     if (computerValue === "papír") {
//         alert(` ${userValue} - ${computerValue} - Számítógép nyert`)
//     } else /*(computerValue === "olló") */ {
//         alert(` ${userValue} - ${computerValue} - Felhasználó nyert`)
//     }
// } else if (userValue === "papír") {
//     if (computerValue === "olló") {
//         alert(` ${userValue} - ${computerValue} - Számítógép nyert`)
//     } else /*(computerValue === "kő") */ {
//         alert(` ${userValue} - ${computerValue} - Felhasználó nyert`)
//     }
// } else if (userValue === "olló") {
//     if (computerValue === "kő") {
//         alert(` ${userValue} - ${computerValue} - Számítógép nyert`)
//     } else /*(computerValue === "papír") */ {
//         alert(` ${userValue} - ${computerValue} - Felhasználó nyert`)
//     }
// } else {
//     alert('Az érték nem megfelő')
// }

//-----------------------------------------------------------------------------------------------------------------------------
//  a játék stylussal ellátott kivitelezése:

//célszerű három részre osztani az funkcionalitást:
// felül vannak a kiszelektált elemek
// alatta a megírt funkciók
// legalul vannak a renderelő függvények és atok meghívásai.



// kiszelektáljuk az  app klasszú komponenst!
const APP = document.querySelector('#app');


// ezzel a függvénnyel létrehozzuk a kezdő oldalt ami a játék "fő" menüje. 
function renderMainMenu() {
    // készítünk egy gombot amit egy változóba mentünk.
    const btn = document.createElement('button');

    // a gomb tartalmának megadunk egy szöveget.
    btn.innerHTML = "Új játék";

    // a gomb klassz listájához hozzáadunk egy új klasszt.
    btn.classList = 'btn';

    // a gombhoz hozzáadunk egy eseményfigyelőt, klikk eseményre. 
    btn.addEventListener('click', () => {
        // a klikk eseménynél le fog futni a következő függvény:
        renderGameBoard();
    });

    APP.appendChild(btn);
};



// a kiszelektált komponenesnek a tartalmába beleírja a template literálként megvalósított HTML tartalamt: 
function renderGameBoard() {

    // létrehozok egy div elemet amit változóba mentek
    const container = document.createElement('div');
    // a létrehozott elem kleszzlistjéhez hozzáadom a container klaszzt
    container.classList = 'container';



    // a létrehozott elem tartalamként megadok egy html tartalmat ami a 3 képet tartalmazza
    container.innerHTML = `
    <div class="item">
        <img src="./assets/rock-hand.png" alt="kő" data-value="kő">
    </div>
    <div class="item">
        <img src="./assets/paper-hand.png" alt="papír" data-value="papír">
    </div>
    <div class="item">
        <img src="./assets/scissors-hand.png" alt="olló" data-value="olló">
    </div>
    `;



    // a konténerhez hozzáadok egy eseményfigyelőt klikk eseményre. 
    // klikk eseménynek van egy beépített tulajdonság értéke: event!!!!
    // a klikk eventjét át tudjuk adni az utánna lévő callback függvénynek:
    container.addEventListener('click', (event) => {
        // voltaképp egy sok elemből álló objektumot kapunk az eventtel:
        //console.log(event);

        // ezek közül nekünk a target kulcs alatt lévő kell
        // ez visszadta azt a html objektumot amire kattintottunk:
        //console.log(event.target);

        // ezen targeten belül is szátalan tulajdonség van, itt nekünk a setdata kell majd:
        // viszont itt a html elemkhez hozzá kell adni a data tulajdonságot mert ha nincs akkor csak undefined értéket kapunk. 
        //  (data-valaminév="valamiérték") => a datset értékkel ennek a datanak kapjuk meg a kulcs érték párját ami itt a valaminév = valamiérték!!! 
        //  console.log(event.target.dataset);

        // ebből kiszedhetjük csak a value értéket:
        //console.log(event.target.dataset.value);


        // itt megnézzük hogy ez az érték létezik e. ( ha esetleg máshova kattintunk akkor undefined értéket írna ki.)
        if (event.target.dataset.value) {
            // ha létezik akkor kiírjuk a konzolra
            console.log(event.target.dataset.value);
        }
    });





    // az app elem tartalmába hejezejk egy html kódot:
    APP.innerHTML = `<h2>Válassz a következők közül:</h2>`;
    // majd gyermek elemkén hozzáadom a container elemt. 
    APP.appendChild(container);


};






// meghívjuk a menu renderelő függvényt
renderMainMenu();





