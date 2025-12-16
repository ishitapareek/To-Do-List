const detailsFromLocalStore = JSON.parse(localStorage.getItem("details"))
let details 

if (detailsFromLocalStore) {
    details = detailsFromLocalStore
}

function Login() {

    let usernameEl = document.getElementById("username-box").value
    let passwordEl = document.getElementById("password-box").value

    
    for (index = 0; index < details.length; index++) { 
        if (usernameEl == details[index][0] && passwordEl == details[index][1]) {
            //console.log('correct')
            window.location.href = "../home-page/to-do-list.html"
            return
        }
        
    }

    //console.log('incorrect')
    let errorMsg = document.getElementById("login-details")
    let errorHTML = `<p id="error-msg">Username or password is incorrect.</p>`

    errorMsg.insertAdjacentHTML("beforeend", errorHTML);
}