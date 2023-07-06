async function getProductIs(){
  const {products} = await getAll()
  products.forEach((element)=>{
    if(element.id_product == location.hash.split('#')[1]){
      containerProduct__title.textContent = element.title
      containerProduct__imageFigureImg.setAttribute('src', element.image)
      containerProduct__detailDescription.textContent = element.description
      priceProduct__count.textContent = element.price
      priceProduct__buy.textContent = element.rating.count
      productSectionH3Span.textContent = element.category
      priceProduct__ratio.textContent = element.rating.rate
      containerProduct__btn.addEventListener('click',()=>{
        const riszshopp = localData()
            if(!riszshopp.cartShop[element.id_product]){
              riszshopp.cartShop[element.id_product] = element
            }
            localStorage.setItem('riszshopp', JSON.stringify(riszshopp))
            countItems('card')
      })
      showProducts(element.category)
    }
  })
}

getProductIs()
async function showProducts(section){
	const {products} = await getAll()
  let count = 1
products.forEach((element)=>{
    if(element.category == section)
    if(count <= 5){
      const article = document.createElement('article');
      article.classList.add('products-index__show');
      const item = `
      <section class="products-index__image"><img src="${element.image}" alt=""></section>
      <section class="products-index__mark"><p></p></section>
      <section class="products-index__name"><p>${element.title}</p></section>
      <section class="products-index__price"><span>$</span><span>${element.price}</span></section>
      `;
      article.innerHTML = item;
      containerProduct__more.appendChild(article);
      count++
    }
	})
}
