// Apply same technique in product.js
let origList = []

// Global variables
const bsSwitch = {'b': true}
const obj = {'isAscend': true}
let priceTog = [0]
let avTog = [0]
let sizeTog = [0]

window.onload = function () {
    const parser = new DOMParser();
    const descArr = document.getElementsByClassName('productbox-desc');

    for (let i = 0; i < descArr.length; i++) {
        let toParse = descArr[i].innerText;
        let doc = parser.parseFromString(toParse, 'text/html');

        let newP = document.createElement('p');
        newP.innerHTML = doc.body.innerHTML;

        descArr[i].replaceChildren();

        descArr[i].appendChild(newP);
    }

    const fIcon = document.getElementById('filter-icon');
    
    // TODO: When out of view, collapse the box
    fIcon.addEventListener("click", (e) => {
        
        const box = document.querySelector("#sort-box")

        console.log(box.style.visibility == 'hidden')
        if (box.style.visibility == 'hidden'){
            box.setAttribute('style', 'visibility: visibile');
        }
        else{
            box.setAttribute('style', 'visibility: hidden')
        }

    })

    d = document.getElementsByClassName("productbox");

    for (let i = 0; i< d.length; i++){
        origList.push(d[i])
    }


}


function replaceMainProductChildren(toReplace){

    let mainProduct = document.getElementById('productlist-main');

    mainProduct.replaceChildren();

    console.log(toReplace)

    for(let i = 0 ; i < toReplace.length; i++){
        mainProduct.appendChild(toReplace[i])
    }
}

// Reset everytime one of the filter's been pressed
function sortAlphabeticalReset(){
    obj.isAscend = true
    var sortBtn = document.getElementById('sort-alphabetically');
    sortBtn.innerText = 'A-Z'

    sortBtn.classList.remove('focused');
}

function filterButtonReset(key){
    var fbtn = document.getElementsByClassName('filter');

    for(let i = 0; i < fbtn.length; i++){

        fbtn[i].classList.remove("focused")
    }

    switch (key) {
        case 'bs':
            obj.isAscend = true
            priceTog[0] = avTog[0]= sizeTog[0] = 0
            replaceMainProductChildren(origList)
            break;
        case 'pri':
            obj.isAscend = bsSwitch.b = true
            avTog[0] = sizeTog[0] = 0
            replaceMainProductChildren(origList)
            break;
        case 'av':
            obj.isAscend = bsSwitch.b = true
            sizeTog[0] = priceTog[0] = 0
            replaceMainProductChildren(origList)
            break;
        case 's':
            obj.isAscend = true
            priceTog[0] = avTog[0] = 0
            replaceMainProductChildren(origList)
            break;
        case 'a':
            bsSwitch.b = true
            priceTog[0] = avTog[0] = sizeTog[0] = 0
            replaceMainProductChildren(origList)
            break
    }
}

function sortAlphabetical(){
    var productBox = document.getElementsByClassName('productbox');
    var sortBtn = document.getElementById('sort-alphabetically');
    let names = []
    for (let i = 0; i < productBox.length; i++){
        names.push(productBox[i].querySelector('.productbox-right').querySelector('#productbox-name').innerText)
    }

    filterButtonReset('a')

    if (obj.isAscend){
        names.sort((a,b) => {
            return a.localeCompare(b)
        });

        obj.isAscend = false;

        sortBtn.innerText = 'A-Z';
    }
    else{
        names.sort((a,b) => {
            return a.localeCompare(b)
        });
        names.reverse()

        obj.isAscend = true;
        sortBtn.innerText = 'Z-A';
    }

    // Darken permanently the button
    sortBtn.classList.add('focused');

    // New array
    var newProdBox = []
    for(let i = 0; i < names.length; i++){
        
        for (let x = 0;  x < productBox.length; x++){

            if (productBox[x].querySelector('.productbox-right').querySelector('#productbox-name').innerText == names[i]){
                newProdBox.push(productBox[x]);
                break
            }

        }

    }
    // Replace children 

    replaceMainProductChildren(newProdBox);
}



function bestSellers(){
    var productBox = document.getElementsByClassName('productbox');
    var btn = document.getElementById('bs');
    var bestArr = []

    sortAlphabeticalReset()
    filterButtonReset('bs')


    for(let i = 0; i < productBox.length; i++){
        if (productBox[i].querySelector("#bestSeller") != null){
            bestArr.push(productBox[i])
        }
    }

    
    if (bsSwitch.b){

        replaceMainProductChildren(bestArr);

        btn.classList.add('focused');
        bsSwitch.b = false
    }

    else{

        replaceMainProductChildren(origList)

        btn.classList.remove('focused')
        bsSwitch.b = true
    }

}



function price(){
    var productBox = document.getElementsByClassName('productbox');
    var btn = document.getElementById('pri');
    var prices = []

    sortAlphabeticalReset()
    filterButtonReset('pri')




    for(let i = 0; i < productBox.length; i++){
        prices.push(productBox[i])
    }

    if (priceTog[0] == 0){

        prices.sort((a,b) => {
            one = Number(a.querySelector("#lprice").value)
            two = Number(b.querySelector("#lprice").value)

            return two-one
        })

        priceTog[0] += 1
        btn.classList.add('focused');
    }
    else if (priceTog[0] == 1){

        prices.sort((a,b) => {
            one = Number(a.querySelector("#lprice").value)
            two = Number(b.querySelector("#lprice").value)

            return two-one
        })

        prices.reverse()

        priceTog[0] += 1
    }

    else{
        prices = origList
        priceTog[0] = 0
        btn.classList.remove('focused')
    }

    replaceMainProductChildren(prices)

}

function availability(){
    var productBox = document.getElementsByClassName('productbox');
    var btn = document.getElementById('av')
    var avArr = []

    sortAlphabeticalReset()
    filterButtonReset('av')


    for(let i = 0; i < productBox.length; i++){
        if (productBox[i].querySelector('#avail')){
            avArr.push(productBox[i]);
        }
    }

    if (avTog[0] == 0){
        replaceMainProductChildren(avArr);
        avTog[0] += 1
        btn.classList.add('focused');

    }
    else{
        replaceMainProductChildren(origList);
        avTog[0] = 0
        btn.classList.remove('focused');
    }

}

function size(){
    var productBox = document.getElementsByClassName('productbox');
    var btn = document.getElementById('s');
    var sArr = []

    sortAlphabeticalReset()
    filterButtonReset('s')


    for (let i = 0; i < productBox.length; i++){
        sArr.push(productBox[i])
    }


    if (sizeTog[0] == 0){

        sArr.sort((a,b) => {
            one = Number(a.querySelector("#lsize").value)
            two = Number(b.querySelector("#lsize").value)

            return two-one
        })

        sizeTog[0] += 1
        btn.classList.add('focused');
    }
    else if (sizeTog[0] == 1){

        sArr.sort((a,b) => {
            one = Number(a.querySelector("#lsize").value)
            two = Number(b.querySelector("#lsize").value)

            return two-one
        })

        sArr.reverse()

        sizeTog[0] += 1
    }

    else{
        sArr = origList
        sizeTog[0] = 0
        btn.classList.remove('focused')
    }


    replaceMainProductChildren(sArr)



}