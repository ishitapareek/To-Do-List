const detailsFromLocalStore = JSON.parse(localStorage.getItem("details"))
let details 

if (detailsFromLocalStore) {
    details = detailsFromLocalStore
}

function changePassword() {

    let usernameEl = document.getElementById("username-box").value
    let newPassworldEl = document.getElementById("new-password-box").value

    
    for (index = 0; index < details.length; index++) { 
        if (usernameEl == details[index][0]) {

            details[index][1] = newPassworldEl
            localStorage.setItem("details", JSON.stringify(details))

            let entryMsg = document.getElementById("new-details")
            let entryHTML = `<p id="entry-msg">Password changed. <a href="../login-page/login-page.html">Log in</a> again.</p>`
            entryMsg.insertAdjacentHTML("beforeend", entryHTML)

            //console.log('correct')

            return
        } 
    }

    //console.log('incorrect')
    let errorMsg = document.getElementById("new-details")
    let errorHTML = `<p id="error-msg">Username does not exist. Sign Up.</p>`

    errorMsg.insertAdjacentHTML("beforeend", errorHTML) 

}