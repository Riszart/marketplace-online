//select
import "../css/global.css"
import "../css/header.css"
import "../css/footer.css"
import "../css/registration.css"
import "../css/change.css"
import {registration} from './module/selector'
import {getCategory,complete,navHeader} from './module/header'
import {navGlobal,localData} from './module/global'
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

// function
registration.conatinerSignUp.addEventListener('input', ()=>{
  if(registration.conatinerSignUp.checkValidity()){
    registration.buttomSignUp.disabled = false
    registration.buttomSignUp.classList.add('change-background')
  }else{
    registration.buttomSignUp.classList.remove('change-background')
    registration.buttomSignUp.disabled = true
  }
})
function callEvent(nameclass){
  nameclass.addEventListener('change', ()=>{
    // validateChange()
  })
}
// function changeState(nameclass){
//   if(nameclass.value == ''){
//     nameclass.classList.remove('input-content')
//     return false
//   }else{
//     nameclass.classList.add('input-content')
//     return true
//   }
// }
registration.buttomSignUp.disabled = true
callEvent(registration.conatinerSignUpDivImputName)
callEvent(registration.conatinerSignUpDivImputPhone)
callEvent(registration.conatinerSignUpDivImputEmail)
callEvent(registration.conatinerSignUpDivImputPassword)
callEvent(registration.conatinerSignUpDivImputPasswordVerify)