const buttons = document.querySelectorAll('.btn')
const inputs = document.querySelectorAll('.inpt')
const placeHolder = document.querySelector('.hxhLogoPlaceholder')
const secondaryInput = document.querySelector('.apiExplanation')
const apiURL = document.getElementById('apiURL')
const toolTip = document.getElementById('myToolTip')
const toolTipAndURL = document.getElementById('toolTipAndURL')
const docBtn = document.getElementById('docBtn')

buttons.forEach(button => button.addEventListener('click', apiRequest))

inputs.forEach(input => input.addEventListener('keydown', e => {
  if(e.code === 'Enter'){
    apiRequest()
    input.value = ''
  }
}))

let timer;

document.addEventListener('input', e => {
  const el = e.target;
  
  if( el.matches('[data-color]') ) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      document.documentElement.style.setProperty(`--color-${el.dataset.color}`, el.value);
    }, 100)
  }
})

async function apiRequest(){
    try{
      let hunterName;
      if(secondaryInput.classList.contains('hide')){
        hunterName = document.getElementById('main-input').value
      } else if(placeHolder.classList.contains('hide')){
        hunterName = document.getElementById('second-input').value
      }
        const response = await fetch(`https://hunterxhunter-api.up.railway.app/api/${hunterName}`)
        const data = await response.json()

        const namePlaceholder = document.querySelector('.birthName')
        const nenTypePlaceholder = document.querySelector('.nenType')
        const birthDatePlaceholder = document.querySelector('.birthDate')
        const wZodiacHolder = document.querySelector('.westernZodiac')
        const chZodiacHolder = document.querySelector('.chineseZodiac')
        const ageHolder = document.querySelector('.age')
        const birthPlaceHolder = document.querySelector('.birthPlace')

        const hunterImg = document.getElementById('hunterImgContainer')

        namePlaceholder.innerText = data.birthName
        nenTypePlaceholder.innerText = data.nenType
        birthDatePlaceholder.innerText = data.birthDate
        wZodiacHolder.innerText = data.zodiac[0]
        chZodiacHolder.innerText = data.zodiac[1]
        ageHolder.innerText = data.age
        birthPlaceHolder.innerText = data.birthLocation

        //trying something
        hunterImg.style.backgroundImage = `url(${data.charImage})`;

        removePlaceHolder()

    }catch(error){
        console.log(error)
    }
}

// window.addEventListener("keydown", handle, true)
//CSS ANIMATION ON PAGE LOAD

const removePlaceHolder = function() {
    placeHolder.classList.add('hide')
    secondaryInput.classList.remove('hide')
    // hunterName = document.getElementById('second-input').value
    // return hunterName
}

docBtn.addEventListener('click', ()=>{
  document.querySelector('.apiURL').classList.toggle('slideIn')
  if(apiURL.classList.contains('slideIn')){
    docBtn.innerText = "Hide"
  } else {
    docBtn.innerText = "using this API"
  }
})

apiURL.addEventListener('click', ()=>{
  toolTip.innerText = "copied!";
  var textToCopy = document.getElementById('apiURL').innerText.slice(0, 60);
  console.log(textToCopy)
  navigator.clipboard.writeText(textToCopy)
  console.log(document.querySelector('.docInfoContainer').offsetTop)
})

toolTipAndURL.addEventListener('mouseout', () => {
  toolTip.innerText = 'click to copy API URL'
})
