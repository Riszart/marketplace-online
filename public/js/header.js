"use strict";
logInAccept.disabled = true

const API_URL = "https://gist.githubusercontent.com/Riszart/658221509a6f250f19e768f04dbf4946/raw/ba051dcfe05fe80a00c4424bc02663d67ac3b275/riszshopp-data.json"

showNav.addEventListener('click', () => {
	containerCategory.classList.toggle('inactive');
	settingUser.classList.add('inactive')
});

optionProfileUser.addEventListener('click', () => {
	settingUser.classList.toggle('inactive');
	containerCategory.classList.add('inactive')
});

containerLogInSVG.addEventListener('click',()=>{
	logInInitContent.classList.add('inactive')
	body.classList.remove('overflow-hide')
})
loginUser.addEventListener('click',()=>{
	inactiveClass()
	logInInitContent.classList.remove('inactive')
	body.classList.add('overflow-hide')
})


async function getAll() {
	const {data} = await axios.get(API_URL)
	return data
}

async function getCategory(){
	const {categories} = await getAll()	//category
	categories.forEach(({name})=>{
		const li = document.createElement('li')
		li.addEventListener('click', ()=>{
			location.hash = `${decodeURIComponent(name)}`
		})
		li.textContent = name
		containerCategoryUl.appendChild(li)
	})
}

function localData(){
	if(!localStorage.getItem('riszshopp')){
		localStorage.setItem('riszshopp', JSON.stringify({favorite: {},cartShop: {},_user:{}}))
	}
	return JSON.parse(localStorage.getItem('riszshopp'))
}

function countItems(items){
	const riszshopp = localData()
	if(items === 'favorite'){
		contentFavoriteNumber.innerText = Object.values(riszshopp.favorite).length
	}
	if(items === 'card'){
		figureCount.innerText = Object.values(riszshopp.cartShop).length
	}
}

function inactiveClass(){
	containerCategory.classList.add('inactive')
	settingUser.classList.add('inactive');
}

getCategory()
countItems('favorite')
countItems('card')

mainEsc.addEventListener('click', ()=>{inactiveClass()})
document.addEventListener('keydown', (event)=>{
	if(event.code === "Escape")inactiveClass()
})

window.addEventListener('hashchange',()=>{
	const hostLocal = location.pathname.split('/')
	hostLocal.forEach(element=>{
		if(element[hostLocal.length-1] !== "shop-products.html"){
			hostLocal.pop()
			if(hostLocal[hostLocal.length-1] !== 'html')hostLocal.push("html")
			hostLocal.push("shop-products.html")
			window.open(`${location.origin}${hostLocal.join('/')}${location.hash}`,'_self')
		}
	})
})

logoPrincipal.addEventListener('click', ()=>{
	window.open(`${location.origin}/public/index.html`,'_self')
})

// log in
logInAccept.addEventListener('click',async (event)=>{
	event.preventDefault()
	let {users} = await getAll()
	const identify = users.find(element=>element.email === emailLogIn.value)
	if(typeof identify === 'object'){
		emailLogIn.classList.remove('error')
		if(identify.password === passwordLogIn.value){
			passwordLogIn.classList.remove('error')
			let riszshopp = JSON.parse(localStorage.getItem('riszshopp'))
			riszshopp._user = identify
			localStorage.setItem('riszshopp', JSON.stringify(riszshopp))
			logInInitContent.classList.add('inactive')
			body.classList.remove('overflow-hide')
			complete()
		}else {
			passwordLogIn.classList.add('error')
		}
	}else{
		emailLogIn.classList.add('error')
	}
})
containerLogIn.addEventListener('input',()=>{
	if(containerLogIn.checkValidity()){
    logInAccept.disabled = false
    logInAccept.classList.add('change-background')
  }else{
    logInAccept.disabled = true
    logInAccept.classList.remove('change-background')
  }
})

function complete(){
	if(typeof (JSON.parse(localStorage.getItem('riszshopp'))._user.username) !== 'string')return
	if(typeof (JSON.parse(localStorage.getItem('riszshopp'))._user._id) !== 'number')return
	const {username} = JSON.parse(localStorage.getItem('riszshopp'))._user
	const {email} = JSON.parse(localStorage.getItem('riszshopp'))._user
	loginUser.remove()
	containerLoginUserP.innerText = username
	signUpUser.remove()

	const PName = document.createElement('p')
	PName.textContent = email
	countUser.appendChild(PName)
	const div = document.createElement('div')
	div.classList.add('count-user__profile')
	countUser.appendChild(div)

	const liOne = document.createElement('li')
	liOne.textContent = 'add product'
	const liTwo = document.createElement('li')
	liTwo.textContent = 'delete product'
	loginSectionProduct.append(liTwo, liOne)

	const ul = document.createElement('ul')
	const liThree = document.createElement('li')
	liThree.textContent = 'profile'
	const liFour = document.createElement('li')
	liFour.textContent = 'setting'
	const liFive = document.createElement('li')
	liFive.textContent = 'sign out'
	liFive.addEventListener('click', ()=>{
		localStorage.clear()
		location.reload()
	})

	ul.append(liThree,liFour,liFive)
	settingUser.appendChild(ul)
}
complete()

function goProductDetail(id_product){
	const urlProduct = location.pathname.split('/')
	if(urlProduct[urlProduct.length-1] === 'index.html'){
		urlProduct.pop()
		urlProduct.push('html')
	}else {
		urlProduct.pop()
	}
	window.open(`${location.origin}${urlProduct.join("/")}/product.html#${id_product}`)
}

function sectionProduct(conatiner,element,section){
	if(section == element.category){
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

//----------------------
