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


// 1. elemek szelektálása, konstansok létrehozása:
// kiszelektáljuk az  app klasszú komponenst!
const APP = document.querySelector('#app');

const Hands = {
    kő: "./assets/rock-hand.png",
    papír: "./assets/paper-hand.png",
    olló: "./assets/scissors-hand.png",
}

//2. változtató vagy segéd függvények:


// számítógép választása:
function getComputerValue() {
    return ["kő", "papír", "olló"][Math.floor(Math.random() * 3)];
};


//  megkapjuk a két választott értéket mind a felhasználótól mind a számítógéptől, majd kiszámítjuk ki nyert.
async function handleGame(userValue) {
    // megkapjuk a számítógép választását és elmentjük egy változóba.
    const computerValue = getComputerValue();
    // tesztként kliíratom a két értéket a konzolra:
    console.log('számítógép: ' + computerValue + ' , ', 'user: ' + userValue);

   await renderAnimation();
    //a két értéket átadjuk az eredményt generáló függvénynek, ez kirendereli a két válsztáshoz tartozó kezet
    renderResult(userValue, computerValue);

    // győztes kirenderelése:

    // létrehozunk egy h2-es elemet
    const heading = document.createElement("h2");
    heading.classList.add("heading");
    // a létrehozott elembe beleírjuk a  győztest. Ezt egy függvényből kapjuk, string érték!
    heading.innerText = handleWinner(userValue, computerValue);
    // hozzáadjuk az app elemhez gyerekelemként a győztest.
    APP.appendChild(heading);
    // új játék gomb renderelése
    renderNewGameBtn(APP)
};


// a gyóztes kiválasztása:
function handleWinner(userValue, computerValue) {
    // szelektálunk, ha mindkét érték ugyan az akkor visszadjuk a döntetlen szót stringként!
    // ha nincs else ág és csak egy értéket adunk vissza akkor ígyis lehet írni:
    if (userValue === computerValue) return "Döntetlen!";
    // ------- 



    let result = true; // létrehozok egy változót aminek igaz értéket adok


    // a szelekcióban változtatunk a result értékén:
    // ha user kőt választ akkor:
    if (userValue === "kő") {
        // ha a számítógép nem papírt választ akkor marad true( tehát ha ollót választ), ha papírt választ akkor false lesz a result értéke.
        result = computerValue !== "papír"
    } else if (userValue === "olló") {
        result = computerValue !== "kő"
    } else /* userValue === "Papír" */ {
        result = computerValue !== "olló"

    };


    //  a szelekcióból visszakapunk egy result boolien értéket. Ternális operátorral eldöntjuk , hogy melyik sztringet adjuk vissza:
    return result ? "Gratulálok, te nyertél!" : " Sajnos most nem nyertél!"
}


//3. renderelő függvények:
// ezzel a függvénnyel létrehozzuk a kezdő oldalt ami a játék "fő" menüje. 
// atributumként megadunk egy elemt amihez gyerekelemként hozzáadja a gombot
function renderNewGameBtn(element) {
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

    element.appendChild(btn);
};



// a kiszelektált komponenesnek a tartalmába beleírja a template literálként megvalósított HTML tartalamt:
// valamint megkapjuk a user választását:
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
            // meghívom a játék kezelő függvényt és átadom a felhasználó döntésének értékét. 
            handleGame(event.target.dataset.value);
        }
    });


    // az app elem tartalmába hejezejk egy html kódot:
    APP.innerHTML = `<h2>Válassz a következők közül:</h2>`;
    // majd gyermek elemkén hozzáadom a container elemt. 
    APP.appendChild(container);
};

// játék animáció renderelése az eredmény előtt
function renderAnimation() {
    APP.innerHTML = `
    <div class="container">
        <div class="user animation">
            <img src=${Hands.kő} alt="kéz"/>
        </div>
        <div class="computer animation">
            <img src=${Hands.kő} alt="kéz"/>
        </div>
    </div>
    `
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(true);
        }, 1700)
    })
}




// a választásokat rendereljük ki a HTML oldalra
function renderResult(userValue, computerValue) {
    // elmentjük a felhasználó válaszához tartozó kép elérési útját: 
    const userImg = Hands[userValue];
    // elmentjük a számítógép válaszához tartozó kép elérési útját
    const computerImg = Hands[computerValue];
    // tesztként kiíratkjuk konzolra:
    console.log(' számítógép: ' + computerImg + ' , ', 'user: ' + userImg);


    APP.innerHTML = `
    <div class="container">
        <div class="user">
            <img src=${userImg} alt="kéz"/>
        </div>
        <div class="computer">
            <img src=${computerImg} alt="kéz"/>
        </div>
    </div>
    `
}




// meghívjuk a menu renderelő függvényt, megadjuk melyik elemhez adja a gombot.(APP)
renderNewGameBtn(APP)





