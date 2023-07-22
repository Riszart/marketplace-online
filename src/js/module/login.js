import {user,body} from './selector'
import {getAll} from './global'


export function loginModule(){
	user.logInAccept.disabled = true

	user.containerLogIn.addEventListener('input',()=>{
		if(user.containerLogIn.checkValidity()){
			user.logInAccept.disabled = false
			user.logInAccept.classList.add('change-background')
		}else{
			user.logInAccept.disabled = true
			user.logInAccept.classList.remove('change-background')
		}
	})
	
	user.logInAccept.addEventListener('click',async (event)=>{
		event.preventDefault()
		let {users} = await getAll()
		const identify = users.find(element=>element.email === user.emailLogIn.value)
		if(typeof identify === 'object'){
			user.emailLogIn.classList.remove('error')
			if(identify.password === user.passwordLogIn.value){
				user.passwordLogIn.classList.remove('error')
				let riszshopp = JSON.parse(localStorage.getItem('riszshopp'))
				riszshopp._user = identify
				localStorage.setItem('riszshopp', JSON.stringify(riszshopp))
				user.logInInitContent.classList.add('inactive')
				body.classList.remove('overflow-hide')
				complete()
			}else {
				user.passwordLogIn.classList.add('error')
			}
		}else{
			user.emailLogIn.classList.add('error')
		}
	})
}
