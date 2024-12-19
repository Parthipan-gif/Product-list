let iconcart = document.querySelector('.icon-cart')
let closecart= document.querySelector('.close')
let body=document.querySelector('body')
let listproducthtml = document.querySelector('.listproduct')
let listcarthtml= document.querySelector('.listcart')
let iconcartspan = document.querySelector('.icon-cart span')

let listproduct=[]
let cart=[]

iconcart.addEventListener('click', () => {
    body.classList.toggle('showcart');
})
closecart.addEventListener('click', () =>{
    body.classList.toggle('showcart')
})

const addDataToHTML = () => {
    listproducthtml.innerHTML ='';
    if (listproduct.length > 0){
        listproduct.forEach(data => {
            let newproduct = document.createElement('div')
            newproduct.classList.add('item')
            newproduct.dataset.id = data.id;
            newproduct.innerHTML = `
                <img src="${data.image.desktop}" alt="">
                <h2>${data.name}</h2>
                <h2>${data.category}</h2>
                <div class="price">${data.price}</div>
                <button class="addcart">Addcart</button>
            `;
            listproducthtml.appendChild(newproduct)
            
        });
    }
}

listproducthtml.addEventListener('click',(event) =>{
    let positionclick = event.target
    if (positionclick.classList.contains('addcart')){
        let product_id = positionclick.parentElement.dataset.id;
        addtocart(product_id)
    }
})

const addtocart = (product_id) => {
    let positionthisproductincart= cart.findIndex((value)=> value.product_id==product_id)

    if(cart.length <=0){
        cart=[
            {
                product_id: product_id,
                quantity:1
            }
        ]
    }
    else if(positionthisproductincart < 0){
        cart.push({
            product_id: product_id,
            quantity:1
        })
    }
    else{
        cart[positionthisproductincart].quantity = cart [positionthisproductincart].quantity + 1
    }
    addcarttohtml();

}

const addcarttohtml = () => {
    listproducthtml.innerHTML = ''
    if (cart.length > 0){
        cart.forEach(cartitem => {
            let newcart = document.createElement('div')
            newcart.classList.add('item');
            newcart.innerHTML =`
                <div class="image">
                     <img src="${listproduct.find(product => product_id== cartitem.product_id).image.desktop}" alt="">
                </div>
                 <div class="totalprice">
                    ${listproduct.find (product => product.id == cartitem.product_id).price}
                </div>
                    <div class="quantity">
                        <span class="minus"><</span>
                        <span>${cartitem.quantity}</span>
                        <span class="plus">></span>
                    </div > 
            `;
        listcarthtml.appendChild(newcart)
        });
    }
}




const initApp = () =>{
    fetch('data.json')
    .then(response => response.json())
    .then(data =>{
        listproduct = data;
        addDataToHTML();
    })
}
initApp();