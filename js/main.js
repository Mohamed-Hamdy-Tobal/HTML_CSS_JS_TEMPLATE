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



// -------------------------------------------------------------------------


// For Skill Scrolling

let ourSkills = document.querySelector(".skills")

window.onscroll = function() {

    let skillsOffsetTop = ourSkills.offsetTop;  // The Distance On The Top Of Element

    let skillOuterHeight = ourSkills.offsetHeight // The Height Of THe Element Including It's padding

    let windowHeight = this.innerHeight;  //  It represents the height of the visible area within the browser window, 

    let windowScrollTop = this.pageYOffset  // The Scrolling The Page

    if (windowScrollTop > (skillsOffsetTop + skillOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span") 
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress
        })
    }
}

// -------------------------------------------------------------------------

// For Gallery
let ourGallery = document.querySelectorAll(".gallery img")
ourGallery.forEach(img => {
    img.addEventListener("click", function(e) {
        // For Overlay
        let overlay = document.createElement("div")
        overlay.className = "popup-overlay"
        document.body.appendChild(overlay)

        // For Popup Box
        let popupBox = document.createElement("div")
        popupBox.className = "popup-box"

        // For Heading From Alt
        let imageHeader = document.createElement("h3")
        let imgText = document.createTextNode(img.alt)

        // For Append
        imageHeader.appendChild(imgText)
        popupBox.appendChild(imageHeader)

        // For Popup Image
        let popupImage = document.createElement("img")
        popupImage.src = img.src

        // Append Image To Box, Append Box To Body
        popupBox.appendChild(popupImage)
        document.body.appendChild(popupBox)

        // To Create The Close Span
        let closeSpan = document.createElement("span")
        let closeText = document.createTextNode("X")
        closeSpan.appendChild(closeText)
        closeSpan.className = "close-button"
        popupBox.appendChild(closeSpan)

    })
})

// For Close The Popup
document.addEventListener("click", function(e) {
    if (e.target.className == "close-button") {
        e.target.parentElement.remove()
        document.querySelector(".popup-overlay").remove()
    }
})


// -------------------------------------------------------------------------------------------------------------

// ## For Navigation Bullets And Header Select ##

let allBullets = document.querySelectorAll(".nav-bullets .bullet")
let allLinks = document.querySelectorAll("header .links a")

function scrollToSomeWhere(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            document.querySelector(`${e.target.dataset.section}`).scrollIntoView({
                behavior: "smooth"
            })
        })
    })
    
}
scrollToSomeWhere(allBullets)
scrollToSomeWhere(allLinks)


allBullets.forEach(ele => {
    ele.addEventListener("click", (e) => {
        allBullets.forEach((ele) => {
            ele.classList.remove("active-bullet")
        })
        ele.classList.add("active-bullet")
    })
})


// Handle Active State
function handleActive(ev) {
    // Loop On Element that has class active
    ev.target.parentElement.querySelector(".active").forEach(ele => {
        ele.classList.remove("active")

        // Check if the color on any element loop is equal to the main color in local storage
        if (ele.dataset.color == mainColor) {
            ele.classList.add("active")
        }
    })
}


// For Show Or Hide Bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span")

let bulletsContainer = document.querySelector(".nav-bullets")

let bulletLocalItem = localStorage.getItem("bullets-option")

if (bulletLocalItem) {
    bulletsSpan.forEach((span) => {
        span.classList.remove("active")
    })
    if (bulletLocalItem == "show") {
        bulletsContainer.style.display = "block"
        document.querySelector(".bullets-option .yes").classList.add("active")
    } else {
        bulletsContainer.style.display = "none"
        document.querySelector(".bullets-option .no").classList.add("active")
    }
}

bulletsSpan.forEach((span) => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display == "yes") {
            bulletsContainer.style.display = "block"
            localStorage.setItem("bullets-option", "show")
            document.querySelector(".bullets-option .yes").classList.add("active")
            document.querySelector(".bullets-option .no").classList.remove("active")
        } else {
            bulletsContainer.style.display = "none"
            localStorage.setItem("bullets-option", "hide")
            document.querySelector(".bullets-option .no").classList.add("active")
            document.querySelector(".bullets-option .yes").classList.remove("active")
        }
    })
})

// ## Reset Local Storage ##
let myRest = document.querySelector(".settings-box .reset-options")
myRest.addEventListener("click", () => {
    localStorage.removeItem("mainColor")
    localStorage.removeItem("bullets-option")
    localStorage.removeItem("background_option")
    window.location.reload()
})

let myAllElements = Array.from(document.body.children).slice(3, document.body.children.length - 1)

// Function to remove "active" class from all bullets
function removeActiveClassFromBullets() {
    allBullets.forEach(bullet => {
        bullet.classList.remove('active-bullet');
    });
}


window.onscroll = function() {

    let reachedLandingPage = window.scrollY < myAllElements[0].offsetTop;
    if (reachedLandingPage) {
        removeActiveClassFromBullets();
        return; // Stop further processing if at landing page
    }

    myAllElements.forEach((section, index) => {
        let sectionOffsetTop = section.offsetTop;
        let sectionOuterHeight = section.offsetHeight;
        let windowHeight = this.innerHeight;
        let windowScrollTop = this.pageYOffset;

        if (windowScrollTop > (sectionOffsetTop + sectionOuterHeight - windowHeight)) {
            // Remove 'active-bullet' class from all bullets
            allBullets.forEach(bullet => {
            bullet.classList.remove('active-bullet');
            });

            // Add 'active-bullet' class to the corresponding bullet
            allBullets[index].classList.add('active-bullet');
        }
    });
};