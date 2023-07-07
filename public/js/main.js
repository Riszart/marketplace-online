"use strict"
dataMark.forEach(element=>{
  const article = document.createElement('article')
  article.classList.add('item-shop')
  const img = document.createElement('img')
  img.setAttribute('src', `${element.image}`)
  const p  = document.createElement('p')
  p.innerText = element.name
  article.append(img,p)
  containerShopLogo.appendChild(article)
})

async function getCategoryIndex(){
	const {categories} = await getAll()
	categories.forEach(element=>{
    const article = document.createElement('article')
    article.classList.add('item-shop')
    const img = document.createElement('img')
    img.setAttribute('src', `${element.imge_category}`)
    const p  = document.createElement('p')
    p.innerText = element.name
    article.append(img,p)
    containerCategoryLogo.appendChild(article)
	})
}

async function showProduct(){
	const {products} = await getAll()
  let count = 0
  products.forEach((element)=>{
    if(count <= 5){
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
			sectionPrice.innerHTML = `<span>$</span><span>${element.price}</span>`
			
			article.append(sectionImg,sectionName,sectionPrice)
			containerProductItems.appendChild(article)
			count++
		}
	})
}
showProduct()
getCategoryIndex()


infoClick.addEventListener('click',()=>{
	infoText.classList.remove('hide-component')
})
infoClose.addEventListener('click',()=>{
	infoText.classList.add('hide-component')
})