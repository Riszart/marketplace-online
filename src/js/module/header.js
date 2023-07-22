"use strict";
import {user,showNav,body,shop,index} from './selector'
import {getAll} from './global'

export async function getCategory(){
	const {categories} = await getAll()	//category
	categories.forEach(({name})=>{
		const li = document.createElement('li')
		li.addEventListener('click', ()=>{
			location.hash = `${decodeURIComponent(name)}`
		})
		li.textContent = name
		user.containerCategoryUl.appendChild(li)
	})
}

export function navHeader(){
  showNav.addEventListener('click', () => {
    user.containerCategory.classList.toggle('inactive');
    user.settingUser.classList.add('inactive')
  });
  
  user.optionProfileUser.addEventListener('click', () => {
    user.settingUser.classList.toggle('inactive');
    user.containerCategory.classList.add('inactive')
  });
  
  user.containerLogInSVG.addEventListener('click',()=>{
    user.logInInitContent.classList.add('inactive')
    body.classList.remove('overflow-hide')
  })
  user.loginUser.addEventListener('click',()=>{
    inactiveClass()
    user.logInInitContent.classList.remove('inactive')
    body.classList.add('overflow-hide')
  })
  
  index.mainEsc.addEventListener('click', ()=>{inactiveClass()})
  document.addEventListener('keydown', (event)=>{
    if(event.code === "Escape")inactiveClass()
  })
}

function inactiveClass(){
	user.containerCategory.classList.add('inactive')
	user.settingUser.classList.add('inactive');
}

export function complete(){
	if(typeof (JSON.parse(localStorage.getItem('riszshopp'))._user.username) !== 'string')return
	if(typeof (JSON.parse(localStorage.getItem('riszshopp'))._user._id) !== 'number')return
	const {username} = JSON.parse(localStorage.getItem('riszshopp'))._user
	const {email} = JSON.parse(localStorage.getItem('riszshopp'))._user
	user.loginUser.remove()
	user.containerLoginUserP.innerText = username
	user.signUpUser.remove()

	const PName = document.createElement('p')
	PName.textContent = email
	index.countUser.appendChild(PName)
	const div = document.createElement('div')
	div.classList.add('count-user__profile')
	index.countUser.appendChild(div)

	const liOne = document.createElement('li')
	liOne.textContent = 'add product'
	const liTwo = document.createElement('li')
	liTwo.textContent = 'delete product'
	index.loginSectionProduct.append(liTwo, liOne)

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
	user.settingUser.appendChild(ul)
}



//----------------------
