"use strict"

const a = Object.keys(localData().favorite)
async function showProduct(itemShow){
	const data = await getAll('products')
	productsWrapper.innerHTML=''
	data.forEach((element)=>{
		if(element.category == itemShow || itemShow === 'all'){
			const article = document.createElement('article');
			article.classList.add('product-unit');
			const divHeading = document.createElement('div')
			divHeading.classList.add('heading')
			const spanPrice = document.createElement('span')
			spanPrice.textContent = `$${element.price}`
			const spanFavorite = document.createElement('span')
			const favoriteCheck = Object.keys(localData().favorite)
			favoriteCheck.forEach(item=>{if(
				item == element.id)spanFavorite.classList.add('color-heart')
			})
			spanFavorite.addEventListener('click', ()=>{
				const riszshopp = localData()
				if(!riszshopp.favorite[element.id]){
					riszshopp.favorite[element.id] = element
					spanFavorite.classList.add('color-heart')
				}else{
					riszshopp.favorite[element.id] = undefined
					spanFavorite.classList.remove('color-heart')
				}
				localStorage.setItem('riszshopp', JSON.stringify(riszshopp))
				countItems('favorite')
			})
			spanFavorite.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
			<path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
		</svg>`
			divHeading.append(spanPrice,spanFavorite)
	
			const divBox = document.createElement('div')
			divBox.classList.add('box')
			const img = document.createElement('img')
			img.setAttribute('src', element.image)
			divBox.appendChild(img)
	
			const divInfo = document.createElement('div')
			divInfo.classList.add('info')
			const p = document.createElement('p')
			p.textContent = element.title
			const spanCard = document.createElement('span')
			spanCard.classList.add('icon')
			spanCard.addEventListener('click', ()=>{
				notificationProductAdd(element)
				const riszshopp = localData()
				if(!riszshopp.cartShop[element.id]){
					riszshopp.cartShop[element.id] = element
				}
				localStorage.setItem('riszshopp', JSON.stringify(riszshopp))
				countItems('card')
				
			})
			spanCard.innerHTML = `<i class="fa fa-shopping-cart"></i>`
			divInfo.append(p,spanCard)
	
			article.append(divHeading, divBox, divInfo)
			productsWrapper.appendChild(article);
		}
		}
	)
}

function notificationProductAdd(product){
	const article = document.createElement('article')
	article.classList.add('notification-product__add')
	const image = document.createElement('img')
	image.setAttribute('src', product.image)

	const div = document.createElement('div')
	const p = document.createElement('p')
	p.innerHTML = `<p>Added to your shopping cart</p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
</svg>`
	const small = document.createElement('small')
	small.textContent = product.title
	div.append(p,small)
	article.append(image,div)
	containerMainBuy.appendChild(article)
	document.addEventListener('scroll', scroll)

	function scroll(){
		console.log(mainEsc.getBoundingClientRect().top)
		if(mainEsc.getBoundingClientRect().top > 0){
			article.style.top = '55px' 
		}
		else if(mainEsc.getBoundingClientRect().top < 0){
			article.style.top = '0px'
		}
	}
	scroll()
	// setTimeout(()=>{
	// 	article.remove()
	// 	document.removeEventListener('scroll',scroll)
	// },2000)
}

window.addEventListener('hashchange', changeHash,false)

function changeHash(){
	if(location.hash == ''){showProduct('all')}
	else if(location.hash.startsWith('#electronics')){showProduct('electronics')}
  else if(location.hash.startsWith('#jewelery')){showProduct('jewelery')}
  else if(location.hash.startsWith("#women's%20clothing")){showProduct("women's clothing")}
  else if(location.hash.startsWith("#men's%20clothing")){showProduct("men's clothing")}
}
changeHash()