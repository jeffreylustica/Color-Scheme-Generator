const colorSchemeContainer = document.querySelector('#container-el')
const colorInputEl = document.querySelector('#color-input-el')
const submitBtn = document.querySelector('#submit-btn')
const selectSchemeTypeEl = document.querySelector('#select-scheme-type-el')

let colorInput = "4D0505"
let schemeType = "monochrome"

displayColorScheme()

colorInputEl.addEventListener('change', (event) => {
    colorInput = event.target.value.slice(1,7)   
})

selectSchemeTypeEl.addEventListener('change', (event) => {
    schemeType = event.target.value
})

function displayColorScheme() {
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorInput}&mode=${schemeType}&count=6`)
        .then(res => res.json())
        .then(data => {
            const colors = data.colors
            const colorSchemeHtml = colors.map( color => {
                return `
                    <div class="color-container">
                        <div class="color" style="background-color: ${color.hex.value} ;"></div>
                        <div class="tooltip">
                            <span class="tooltiptext" id="tooltiptext-el">Copy</span>
                            <input class="color-value" id="color-value-el" type="text" readonly value="${color.hex.value}">
                        </div>
                    </div>`
            }).join('')
            colorSchemeContainer.innerHTML = colorSchemeHtml
            addCopyValueFunction()
        })
}

submitBtn.addEventListener('click', (event) => {
    event.preventDefault()
    displayColorScheme()
})


// copy color value
function addCopyValueFunction() {
    const colorValueEl = document.querySelectorAll('#color-value-el')
    colorValueEl.forEach(inputValue => {
        inputValue.addEventListener('click', (event) => {
            const copyText = event.target
            const tooltipTextEl = document.querySelectorAll(".tooltiptext");       
            tooltipTextEl.forEach(tooltipText => {
                tooltipText.innerHTML = "Copied: " + copyText.value;
            })
        })

        inputValue.addEventListener("mouseout", () => {
            const tooltipTextEl = document.querySelectorAll(".tooltiptext");       
            tooltipTextEl.forEach(tooltipText => {
                tooltipText.innerHTML = "Copy";
            })
        })

    })
}


