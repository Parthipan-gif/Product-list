let iconcart = document.querySelector('.icon-cart');
let closecart = document.querySelector('.close');
let body = document.querySelector('body');
let listproducthtml = document.querySelector('.listproduct');
let listcarthtml = document.querySelector('.listcart');
let iconcartspan = document.querySelector('.icon-cart span');

let listproduct = [];
let cart = [];

iconcart.addEventListener('click', () => {
    body.classList.toggle('showcart');
});
closecart.addEventListener('click', () => {
    body.classList.toggle('showcart');
});

// it is add all product in front page
const addDataToHTML = () => {
    listproducthtml.innerHTML = '';
    if (listproduct.length > 0) {
        listproduct.forEach(data => {
            let newproduct = document.createElement('div');
            newproduct.classList.add('item');
            newproduct.dataset.id = data.id;
            newproduct.innerHTML = `
                <img src="${data.image.desktop}" alt="${data.name}">
                <h2>${data.name}</h2>
                <h2>${data.category}</h2>
                <div class="price">$${data.price}</div>
                <button class="addcart">Addcart</button>
            `;
            listproducthtml.appendChild(newproduct);
        });
    }
};

listproducthtml.addEventListener('click', (event) => {
    let positionclick = event.target;
    if (positionclick.classList.contains('addcart')) {
        let product_id = positionclick.parentElement.dataset.id;
        addtocart(product_id);
    }
});

const addtocart = (product_id) => {
    let positionthisproductincart = cart.findIndex((value) => value.product_id == product_id);

    if (cart.length <= 0 || positionthisproductincart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionthisproductincart].quantity = cart[positionthisproductincart].quantity + 1;
    }
    addcarttohtml();
    addcarttomemory();
};
 const addcarttomemory = () =>{
    localStorage.setItem('cart',JSON.stringify(cart))
 }





const addcarttohtml = () => {
    listcarthtml.innerHTML = '';
    let totalquantity = 0;
    if (cart.length > 0) {
        cart.forEach(cartItem => {
            totalquantity = totalquantity + cartItem.quantity;
            let newcart = document.createElement('div');
            newcart.classList.add('item');
            newcart.dataset.id = cartItem.product_id;
            newcart.innerHTML = `
                <div class="image">
                    <img src="${listproduct.find(product => product.id == cartItem.product_id).image.desktop}" alt="">
                </div>
                <div class="totalprice">$${listproduct.find(product => product.id == cartItem.product_id).price}</div>
                <div class="quantity">
                    <span class="minus"><</span> 
                    <span>${cartItem.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        listcarthtml.appendChild(newcart);
        });
    }
    iconcartspan.innerText = totalquantity;
};
listcarthtml .addEventListener('click', (event) => { {
    let positionclick = event.target;
    if (positionclick.classList.contains('minus') || positionclick.classList.contains('plus')){
        let product_id = positionclick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionclick.classList.contains('plus')){
            type = 'plus'
        }
        changequantity(product_id,type)
        }
    }

})
const changequantity = (product_id,type) => {
    let positionitemincart = cart.findIndex((value) => value.product_id == product_id)
    if (positionitemincart >= 0){
        switch (type) {
            case 'plus':
                cart[positionitemincart].quantity = cart[positionitemincart].quantity +1;
                break;
        
            default:
                let valuechange = cart[positionitemincart].quantity -1;
                if (valuechange > 0){
                    cart[positionitemincart].quantity = valuechange;

                }else{
                    cart.splice(positionitemincart,1);
                }
                break;
        }
        
    }
    addcarttomemory();
    addcarttohtml();
}
const initApp = () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            listproduct = data;
            addDataToHTML();

            if(localStorage.getItem('cart')){
                cart =JSON.parse (localStorage.getItem('cart'));
                addcarttohtml();
            }
        });
};

initApp();
