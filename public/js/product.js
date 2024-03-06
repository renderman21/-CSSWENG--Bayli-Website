// Parse the description box
window.onload = function(){
    const parser = new DOMParser();
    const descDiv = document.getElementById('product-desc');
    const toParse = document.getElementById('product-desc').innerText;
    const doc = parser.parseFromString(toParse, 'text/html');

    const parsedDesc = document.createElement('p');
    parsedDesc.innerHTML = doc.body.innerHTML;

    descDiv.replaceChildren();

    descDiv.appendChild(parsedDesc);

    
}