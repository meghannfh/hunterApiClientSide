const button = document.querySelector('button')
const input = document.querySelector('input')
const placeHolder = document.querySelector('.hxhLogoPlaceholder')
const apiURL = document.getElementById('apiURL')
const toolTip = document.getElementById('myToolTip')
const toolTipAndURL = document.getElementById('toolTipAndURL')
const docBtn = document.getElementById('docBtn')

button.addEventListener('click', apiRequest)

input.addEventListener('keydown', e => {
    if(e.code === 'Enter'){
      apiRequest()
      input.value = ''
    }
  })

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
        const hunterName = document.querySelector('input').value
        const response = await fetch(`https://web-production-91ba.up.railway.app/api/${hunterName}`)
        const data = await response.json()
        console.log(data)

        const namePlaceholder = document.querySelector('.birthName')
        const nenTypePlaceholder = document.querySelector('.nenType')
        const birthDatePlaceholder = document.querySelector('.birthDate')
        const wZodiacHolder = document.querySelector('.westernZodiac')
        const chZodiacHolder = document.querySelector('.chineseZodiac')
        const ageHolder = document.querySelector('.age')
        const birthPlaceHolder = document.querySelector('.birthPlace')
        const hunterImageHolder = document.querySelector('.hunterImage')

        const hunterImg = document.getElementById('hunterImgContainer')

        namePlaceholder.innerText = data.birthName
        nenTypePlaceholder.innerText = data.nenType
        birthDatePlaceholder.innerText = data.birthDate
        wZodiacHolder.innerText = data.zodiac[0]
        chZodiacHolder.innerText = data.zodiac[1]
        ageHolder.innerText = data.age
        birthPlaceHolder.innerText = data.birthLocation
        // hunterImageHolder.src = data.charImage

        //trying something
        hunterImg.style.backgroundImage = `url(${data.charImage})`;
        console.log(hunterImg.style.backgroundImage)

        removePlaceHolder()

    }catch(error){
        console.log(error)
    }
}

// window.addEventListener("keydown", handle, true)
//CSS ANIMATION ON PAGE LOAD

const removePlaceHolder = function() {
    placeHolder.classList.add('hide')
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
