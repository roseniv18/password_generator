const passwordEl = document.getElementById("password")
const passwordLengthSliderEl = document.getElementById("password__length-slider")
const passwordLengthEl = document.getElementById("password__length")
const uppercaseEl = document.getElementById("uppercase")
const lowercaseEl = document.getElementById("lowercase")
const numbersEl = document.getElementById("numbers")
const symbolsEl = document.getElementById("symbols")
const submitBtn = document.getElementById("password__submit-button")
const copyBtn = document.getElementById("password__copy-icon")
const popup = document.getElementById("password__copy-popup")

// Initial slider value
passwordLengthEl.innerText = passwordLengthSliderEl.value

submitBtn.addEventListener('click', (e) => {
    // Prevent the page from reloading on button submit
    e.preventDefault()

    const length = +passwordLengthSliderEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked

    // Get only the checked values
    const getCheckedValues = (lower, upper, number, symbol) => {
        const types = [{ lower }, { upper }, { number }, { symbol }].filter(type => {
            // Return only 'true' values
            return Object.values(type)[0]
        })
    
        // We only need the keys from the types array  of objects
        const typesArr = []
    
        for(let i = 0; i < types.length; i++) {
            typesArr.push(...Object.keys(types[i]))
        }
    
        return typesArr
    }
    
    const generateRandomPassword = (passwordLength) => {
        const checkedValues = getCheckedValues(hasLower, hasUpper, hasNumber, hasSymbol)
        
        if(checkedValues.length === 0) {
            alert("Please select at least one option")

            return
        }
    
        const password = []
        
        // For each iteration call a randomFunc and push it to the password array
        for(let i = 0; i < passwordLength; i++) {
            const randomFuncIndex = Math.floor(Math.random() * checkedValues.length)
            password.push( randomFunc[checkedValues[randomFuncIndex]]() )
        }
    
        return password.join('')
    }

    passwordEl.innerText = generateRandomPassword(length) || ''
})


// getRandom Functions (with the help of https://net-comber.com/charset.html)

const getRandomLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

const getRandomUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

const getRandomNumber = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

const getRandomSymbol = () => {
    // Change this to include or exclude certain symbols
    const symbols = "!@#$%^&*()_+-=<>?"
    return symbols[Math.floor(Math.random() * symbols.length)]
}

//

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

// Change slider text on change
passwordLengthSliderEl.addEventListener('input', (e) => {
    passwordLengthEl.innerText = (e.target.value)
})

copyBtn.addEventListener("click", () => {

    popup.classList.add("show")

    // Remove popup window after 3s
    setTimeout(() => {
        popup.classList.remove("show")
    }, 3000)

    // Copy password to clipboard
    navigator.clipboard.writeText(passwordEl.innerText)
})