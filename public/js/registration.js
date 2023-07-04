//select 
const select = (className)=> document.querySelector(className)

const conatinerSignUp = select('.conatiner-sign_up')
const conatinerSignUpDivImputName = select('.conatiner-sign_up div .input-name')
const conatinerSignUpDivImputPhone = select('.conatiner-sign_up div .input-phone')
const conatinerSignUpDivImputEmail = select('.conatiner-sign_up div .input-email')
const conatinerSignUpDivImputPassword = select('.conatiner-sign_up div .input-password')
const conatinerSignUpDivImputPasswordVerify = select('.conatiner-sign_up div .input-password-verify')
const conatinerSignUpDivImputAccept = select('.conatiner-sign_up div .input-accept')
const buttomSignUp = select('.buttom__sign-up')

// function
conatinerSignUp.addEventListener('input', ()=>{
  if(conatinerSignUp.checkValidity()){
    buttomSignUp.disabled = false
    buttomSignUp.classList.add('change-background')
  }else{
    buttomSignUp.classList.remove('change-background')
    buttomSignUp.disabled = true
  }
})
function callEvent(nameclass){
  nameclass.addEventListener('change', ()=>{
    validateChange()
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
buttomSignUp.disabled = true
callEvent(conatinerSignUpDivImputName)
callEvent(conatinerSignUpDivImputPhone)
callEvent(conatinerSignUpDivImputEmail)
callEvent(conatinerSignUpDivImputPassword)
callEvent(conatinerSignUpDivImputPasswordVerify)