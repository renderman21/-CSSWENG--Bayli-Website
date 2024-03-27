// Apply same technique in product.js
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

}