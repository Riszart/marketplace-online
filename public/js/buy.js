"use strict"
function loadCard(){
  contentItemsCartShop.innerText = ''
  const cardBuy = Object.values(localData().cartShop)
  cardBuy.forEach(element =>{
    // console.log(element)

    const article = document.createElement('article')
    article.classList.add('grid-contend')
    
    const divRight = document.createElement('div')
    divRight.classList.add('cart-info')
    const img = document.createElement('img')
    img.setAttribute('src', element.image)
    const divProduct = document.createElement('div')
    const p =  document.createElement('p')
    p.textContent = element.title
    const small = document.createElement('small')
    small.textContent = `$ ${element.price.toFixed(2)}`
    const br = document.createElement('br')
    const a = document.createElement('a')
    a.textContent = 'Remove'
    console.log(element.id)
    a.addEventListener('click',()=>{
      const riszshopp = localData()
      riszshopp.cartShop[element.id] = undefined
      localStorage.setItem('riszshopp', JSON.stringify(riszshopp))
      countItems('card')
      loadCard()
    })
    divProduct.append(p,small,br,a)
    divRight.append(img,divProduct)
    const divLeft = document.createElement('div')
    divLeft.classList.add('flex-contend')
    divLeft.classList.add('price-quantity')
    const input = document.createElement('input')
    input.setAttribute('type', 'number')
    input.setAttribute('value', '1')

    const pLeft = document.createElement('p')
    pLeft.classList.add('count-product')
    const spanSing = document.createElement('span')
    spanSing.textContent = '$ '
    const spanCount = document.createElement('span')
    spanCount.classList.add('price-product')
    spanCount.textContent = element.price.toFixed(2)

    pLeft.append(spanSing,spanCount)
    divLeft.append(input,pLeft)

    article.append(divRight,divLeft)
    contentItemsCartShop.appendChild(article)
    input.addEventListener('change',()=>{
      if(input.value <= 0){
        input.value = 0
      }
      spanCount.textContent = element.price * input.value
      total()
    })
  })
  if(contentItemsCartShop.innerHTML === ''){
    const div = document.createElement('div')
    div.classList.add('cart-void')
    div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
  </svg>
  <p class='cart-void'>empty shopping cart</p>`
    contentItemsCartShop.appendChild(div)
  }
  total()
}
function total(){
  const countProduct = document.querySelectorAll('.price-product')
  let priceSubTotal = 0
  countProduct.forEach(element=>{
    priceSubTotal = Number(element.innerText) + Number(priceSubTotal)
  })
  let tax = (priceSubTotal*0.05).toFixed(2)
  let priceSub = priceSubTotal.toFixed(2)
  let discountCount = 0.00
  let Shipping = 0.00

  taxSpan.textContent = tax
  price.textContent = `$ ${priceSub}`
  shippingCost.textContent = Shipping
  discount.textContent = discountCount
  totalSpan.textContent = (Number(tax) + Number(priceSub)+ Number(discountCount)+ Number(Shipping)).toFixed(2)
}
loadCard()