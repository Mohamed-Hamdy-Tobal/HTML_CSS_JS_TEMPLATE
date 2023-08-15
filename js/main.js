// For Check If There Is A Color On Local Storage
let mainColor = localStorage.getItem("mainColor")

// Check If It is null
if (mainColor) {
    // Set The Color On Root From Local Storage
    document.documentElement.style.setProperty("--main-color", mainColor)

    // Loop On Element that has class active
    document.querySelectorAll(".colors-list li").forEach(ele => {
        ele.classList.remove("active")

        // Check if the color on any element loop is equal to the main color in local storage
        if (ele.dataset.color == mainColor) {
            ele.classList.add("active")
        }
    })
}

// Random Background Option
let backgroundOption = true

// Variable To Control The Background Interval
let backgroundInterval;

// Check In The Beginning Of Reload If There Is Value In Local Storage Item
let backgroundLocalOption = localStorage.getItem("background_option")

// Check if is not empty
if (backgroundLocalOption) {

    if (backgroundLocalOption == 'true') {
        backgroundOption = true
    } else {
        backgroundOption = false
    }

    document.querySelectorAll(".settings-box .random-background span").forEach(ele => {
        ele.classList.remove("active")
    }) 
    
    if (backgroundLocalOption == 'true') {
        document.querySelector(".settings-box .random-background .yes").classList.add("active")
    } else {
        document.querySelector(".settings-box .random-background .no").classList.add("active")
    }
}

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

        // Set The Color On Local Storage
        localStorage.setItem("mainColor", li.dataset.color)

        // Loop On Element that has class active
        li.parentElement.querySelectorAll(".active").forEach(ele => {
            ele.classList.remove("active")
        })
        // Add Class active to the clickable element
        li.classList.add("active")
    }
})



// Switch Random Background Option
let randomBackSpan = document.querySelectorAll(".settings-box .random-background span")

// Loop On List span
randomBackSpan.forEach(span => {

    // For Click In Each span
    span.onclick = function() {

        // Loop On Element that has class active
        span.parentElement.querySelectorAll(".active").forEach(ele => {
            ele.classList.remove("active")
        })
        // Add Class active to the clickable element
        span.classList.add("active")

        if (span.dataset.background == "yes") {
            backgroundOption = true;
            randomBackground()
            // Add True To Local Storage
            localStorage.setItem("background_option", true)
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval)
            // Add False To Local Storage
            localStorage.setItem("background_option", false)
        }
    }
})

// -------------------------------------------------------------------------

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page")

// Add a click event listener to the landing page
landingPage.addEventListener("click", function() {
    let randomBackgroundOption = document.querySelector(".settings-box .random-background");
    if (backgroundOption) {
        backgroundOption = false;
        clearInterval(backgroundInterval);
        randomBackgroundOption.querySelector(".yes").classList.remove("active")
        randomBackgroundOption.querySelector(".no").classList.add("active")
        // Add False To Local Storage
        localStorage.setItem("background_option", false)
    } else {
        backgroundOption = true;
        randomBackground();
        randomBackgroundOption.querySelector(".yes").classList.add("active")
        randomBackgroundOption.querySelector(".no").classList.remove("active")
        // Add True To Local Storage
        localStorage.setItem("background_option", true)
    }
});

// Get Array Of Images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"]

// Set Time For Random Images
function randomBackground() {
    
    if (backgroundOption === true) {

        backgroundInterval = setInterval(() => {
            // To Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length)
        
            landingPage.style.backgroundImage = `url("images/${imgsArray[randomNumber]}")`
        }, 5000)
    }
}
randomBackground()