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
      showProductRelase(element.category)
    }
  })
}
let count = 0

getProductIs()
async function showProductRelase(category){
	const {products} = await getAll()
  products.forEach((element)=>{
    sectionProduct(containerProduct__more,element,category)
	})
}