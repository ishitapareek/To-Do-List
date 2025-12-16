let details = []
const detailsFromLocalStore = JSON.parse(localStorage.getItem("details"))

if (detailsFromLocalStore) {
    details = detailsFromLocalStore
}

function signUp() {
    //console.log('button clicked')
    let usernameEl = document.getElementById("username-box").value
    let passwordEl = document.getElementById("password-box").value
        
    details.push([usernameEl, passwordEl])
    localStorage.setItem("details", JSON.stringify(details))
    
    window.location.href = "../home-page/to-do-list.html"
}