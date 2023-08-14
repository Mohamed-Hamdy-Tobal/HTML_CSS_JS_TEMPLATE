// -- For Settings --
let setting = document.querySelector(".settings-box")
let gear = document.querySelector(".settings-box .toggle-setting i")

gear.onclick = function() {
    // Toggle The Setting Icon
    this.classList.toggle("fa-spin")
    // Toggle The Setting Box
    setting.classList.toggle("open")
}

// - For Select Color -
let colorLi = document.querySelectorAll(".settings-box .option-box .colors-list li")

// Loop On List Items
colorLi.forEach(li => {

    // For Click In Each Item
    li.onclick = function() {

        // Set The Color On Root
        document.documentElement.style.setProperty("--main-color", li.dataset.color)
    }
})

// -------------------------------------------------------------------------


// Select Landing Page Element
let landingPage = document.querySelector(".landing-page")

// Get Array Of Images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"]

// Set Time For Random Images
setInterval(() => {

    // To Get Random Number
    let randomNumber = Math.floor(Math.random() * imgsArray.length)

    landingPage.style.backgroundImage = `url("images/${imgsArray[randomNumber]}")`
}, 5000)

