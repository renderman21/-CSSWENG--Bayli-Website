// Parse the description box
window.onload = function () {
    const parser = new DOMParser();
    const descDiv = document.getElementById('product-desc');
    const toParse = descDiv.innerText;
    const doc = parser.parseFromString(toParse, 'text/html');

    const parsedDesc = document.createElement('p');
    parsedDesc.innerHTML = doc.body.innerHTML;

    descDiv.replaceChildren();

    descDiv.appendChild(parsedDesc);

    const infoDiv = document.getElementById('product-additional-desc');
    const toParseInfo = infoDiv.innerText;
    const docI = parser.parseFromString(toParseInfo, 'text/html');

    const parsedInfo = document.createElement('p');
    parsedInfo.innerHTML = docI.body.innerHTML;
    parsedInfo.setAttribute('style', 'display:none;')

    infoDiv.replaceChildren();
    infoDiv.appendChild(parsedInfo);

}

function dropDownInfo() {
    const productAddDesc = document.getElementById('product-additional-desc');
    const p = (productAddDesc.childNodes)[0];

    const arrowSpan = document.getElementById('arrow-span');
    const i = (arrowSpan.childNodes)[1];
    console.log(i)

    if (p.style.display == 'none' || i.className == 'down') {
        p.style.display = 'inline';
        i.classList.remove('down');
        i.classList.add('up');
    }
    else if (p.style.display == 'inline' || i.className == 'up') {
        p.style.display = 'none';
        i.classList.remove('up');
        i.classList.add('down');
    }

}

function changeProductSize(size) {
    // Change Image Size
    const newImageSrc = document.getElementById(size + "Picture");
    const focusPicture = document.getElementById('focusedPicture');
    focusPicture.setAttribute('src', newImageSrc.getAttribute('src'));

    // TODO: Update the displayed price
}


function increment() {
    const qA = document.getElementById('quantity-amount');
    var number = Number(qA.innerText) + 1;
    const p = document.createElement('p');
    p.innerText = number;
    qA.replaceChildren();
    qA.appendChild(p)

}

function decrement() {
    const qA = document.getElementById('quantity-amount');
    var number = Number(qA.innerText) - 1;

    if(number > 0){
        const p = document.createElement('p');
        p.innerText = number;
        qA.replaceChildren();
        qA.appendChild(p)
    }
}