
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

    infoDiv.replaceChildren();
    infoDiv.appendChild(parsedInfo);

    const sizeButton = document.getElementsByClassName('size-button');

    // The largest size will always be chosen
    sizeButton[0].classList.add('btn-focus');

    for(let i = 0; i < sizeButton.length; i++){
        sizeButton[i].addEventListener("click", (e)=>{

            e.currentTarget.classList.add('btn-focus');
            for(let a = 0; a < sizeButton.length; a++){
                if (sizeButton[a] == e.currentTarget){
                    // Skip
                    continue
                }

                if(sizeButton[a].classList.contains('btn-focus')){
                    sizeButton[a].classList.remove('btn-focus');
                }
            }

        });
    }

}

function dropDownInfo() {
    const productAddDesc = document.getElementById('product-additional-desc');
    const p = (productAddDesc.childNodes)[0];

    const arrowSpan = document.getElementById('arrow-span');
    const i = (arrowSpan.childNodes)[1];

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

async function fetchProduct(id){
    var product;

    await fetch(`/get-product/${id}`)
    .then((response) => {return response.text()})
    .then((data) => {
        product = data;
    })
    .catch((error) => {
        console.error(error);
    })

    return JSON.parse(product);
}

async function changeProductSize(size, id) {
    // Change Image Size
    const newImageSrc = document.getElementById(size + "Picture");
    const focusPicture = document.getElementById('focusedPicture');
    focusPicture.setAttribute('src', newImageSrc.getAttribute('src'));

    let getSize;

    switch (size) {
        case 'L':
            getSize = 'Large';

            break;
        case 'M':
            getSize = 'Medium';

            break;
        case 'S':
            getSize = 'Small';

            break;
    }

    var retProduct = await fetchProduct(id)
    const priceBox = document.getElementById('price');
    priceBox.innerText = retProduct[0]['Product Price'][getSize];

    // Set back to 1 on quantity
    const qA = document.getElementById('quantity-amount');
    const p = document.createElement('p');
    p.innerText = 1;
    qA.replaceChildren();
    qA.appendChild(p);


}

async function changeProductSizeViaPic(size, id){
    // Note: If there are review pics. Do not include it

    const newImageSrc = document.getElementById(size);
    const focusPicture = document.getElementById('focusedPicture');
    focusPicture.setAttribute('src', newImageSrc.getAttribute('src'));

    let getSize;

    switch (size) {
        case 'LPicture':
            getSize = 'Large';

            break;
        case 'MPicture':
            getSize = 'Medium';

            break;
        case 'SPicture':
            getSize = 'Small';

            break;
    }

    var retProduct = await fetchProduct(id);
    const priceBox = document.getElementById('price');
    priceBox.innerText = retProduct[0]['Product Price'][getSize];

    // Set back to 1 on quantity
    const qA = document.getElementById('quantity-amount');
    const p = document.createElement('p');
    p.innerText = 1;
    qA.replaceChildren();
    qA.appendChild(p);

    // TODO: Change the sizes 
}

