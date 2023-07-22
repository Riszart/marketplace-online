import {index,shop} from './selector'
import axios from 'axios'

const API_URL = process.env.API_URL

export async function getAll() {
	const {data} = await axios.get(API_URL)
	return data
}

export function localData(){
	if(!localStorage.getItem('riszshopp')){
		localStorage.setItem('riszshopp', JSON.stringify({favorite: {},cartShop: {},_user:{}}))
	}
	return JSON.parse(localStorage.getItem('riszshopp'))
}

export function countItems(items){
	const riszshopp = localData()
	if(items === 'favorite'){
		shop.contentFavoriteNumber.innerText = Object.values(riszshopp.favorite).length
	}
	if(items === 'card'){
		shop.figureCount.innerText = Object.values(riszshopp.cartShop).length
	}
}

export function navGlobal(){
  window.addEventListener('hashchange',()=>{
    const hostLocal = location.pathname.split('/')
		console.log(`${location.pathname}`)
      if(hostLocal[hostLocal.length-1] !== "/shop.html"){
				hostLocal.pop()
				hostLocal.push('shop.html')
				let newLocation  = `${location.origin}${hostLocal.join('/')}${location.hash}`
        window.open(newLocation,'_self')
      }
  })

  index.logoPrincipal.addEventListener('click', ()=>{
    window.open(`${location.origin}/index.html`,'_self')
  })
}

export function sectionProduct(count,conatiner,element,section){
	if(section == element.category){
		if(count <= 5){
      count++
			const article = document.createElement('article')
			article.classList.add('products-index__show')
			const sectionImg = document.createElement('section')
			sectionImg.classList.add('products-index__image')
			const img = document.createElement('img')
			img.setAttribute('src', element.image)
			img.addEventListener('click', ()=>{
				goProductDetail(element.id_product)
			})
			sectionImg.appendChild(img)

			const sectionName = document.createElement('section')
			sectionName.classList.add('products-index__name')
			const pName = document.createElement('p')
			pName.textContent = element.title
			sectionName.appendChild(pName)

			const sectionPrice = document.createElement('section')
			sectionPrice.classList.add('products-index__price')

			const divPrice = document.createElement('div')
			divPrice.innerHTML = `<span>$</span><span>${element.price}</span>`

			const divCart = document.createElement('span')
			divCart.classList.add('icon')
			divCart.addEventListener('click', ()=>{
				const riszshopp = localData()
				if(!riszshopp.cartShop[element.id_product]){
					riszshopp.cartShop[element.id_product] = element
				}
				localStorage.setItem('riszshopp', JSON.stringify(riszshopp))
				countItems('card')
			})
			divCart.innerHTML = `<i class="fa fa-shopping-cart"></i>`

			sectionPrice.append(divPrice, divCart)
			
			article.append(sectionImg,sectionName,sectionPrice)
			conatiner.appendChild(article)
			count++
		}
	}
}

export function goProductDetail(id_product){
	const urlProduct = location.pathname.split('/')
	if(urlProduct[urlProduct.length-1] === 'index.html'){
		urlProduct.pop()
		urlProduct.push('html')
	}else {
		urlProduct.pop()
	}
	window.open(`${location.origin}${urlProduct.join("/")}/product.html#${id_product}`)
}