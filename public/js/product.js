
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
    console.log(retProduct[0]['Product Price'])
    const priceBox = document.getElementById('price');
    priceBox.innerText = retProduct[0]['Product Price'][getSize];

    // Set back to 1 on quantity
    const qA = document.getElementById('quantity-amount');
    const p = document.createElement('p');
    p.innerText = 1;
    qA.replaceChildren();
    qA.appendChild(p);
}


function increment() {
    const qA = document.getElementById('quantity-amount');
    var number = Number(qA.innerText) + 1;
    const p = document.createElement('p');
    p.innerText = number;
    qA.replaceChildren();
    qA.appendChild(p)

    const price = document.getElementById('price');
    var estimate = Number(price.innerText) * number;
    price.innerText = estimate;

}

function decrement() {
    const qA = document.getElementById('quantity-amount');
    var number = Number(qA.innerText);
    if(number > 0){

        const price = document.getElementById('price');
        var estimate = Number(price.innerText) / number;
        price.innerText = estimate;

        const p = document.createElement('p');
        number -= 1;
        p.innerText = number ;
        qA.replaceChildren();
        qA.appendChild(p)
    }
}