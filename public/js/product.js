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

    if (p.style.display == 'none' || i.className == 'down' ){
        p.style.display = 'inline';
        i.classList.remove('down');
        i.classList.add('up');
    }
    else if(p.style.display == 'inline' || i.className == 'up'){
        p.style.display = 'none';
        i.classList.remove('up');
        i.classList.add('down');
    }
    
}