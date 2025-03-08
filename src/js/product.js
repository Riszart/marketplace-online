import "../css/global.css"
import "../css/header.css"
import "../css/item.css"
import "../css/footer.css"
import "../css/change.css"
import "../css/responsive.css"

import {getCategory,complete,navHeader} from './module/header'
import {getAll,navGlobal,sectionProduct,localData} from './module/global'
import {product} from './module/selector'
import {loginModule} from './module/login'

//global
navGlobal()
localData()

// header
navHeader()
getCategory()
complete()

//login
loginModule()

//product
async function getProductIs(){
  const {products} = await getAll()
  products.forEach((element)=>{
    if(element.id_product == location.hash.split('#')[1]){
      product.containerProduct__title.textContent = element.title
      product.containerProduct__imageFigureImg.setAttribute('src', element.image)
      product.containerProduct__detailDescription.textContent = element.description
      product.priceProduct__count.textContent = element.price
      product.priceProduct__buy.textContent = element.rating.count
      product.productSectionH3Span.textContent = element.category
      product.priceProduct__ratio.textContent = element.rating.rate
      product.priceProduct__buy.addEventListener('click',()=>{
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


getProductIs()
async function showProductRelase(category){
	const {products} = await getAll()
  let count = 1
  products.forEach((element)=>{
    sectionProduct(count,product.containerProduct__more,element,category)
    count++
	})
}