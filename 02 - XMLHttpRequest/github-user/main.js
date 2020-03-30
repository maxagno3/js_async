// Your code goes here
let button = document.querySelector('button');
let input = document.querySelector('input[type="text"]');
let cardUser = document.querySelector('.card');
let getAPI = 'https://api.github.com/users/';

function mainFunction() {
    event.preventDefault();

    if (input.value.trim()) {
        userInfo = input.value;
        getXml(userInfo, getAPI);
    }
}

// XMLHTTP request
function getXml (userInfo, getAPI) {
    getAPI += userInfo;

    let xhr = new XMLHttpRequest();
    xhr.open('GET', getAPI , true);
    
    xhr.onload = function() {

        if (this.status == 200) {
            cardUser.style.border = '1px solid #fff';
            let obj = JSON.parse(xhr.response);
            mainUI(obj);
        }else{
            cardUser.innerHTML = "User not found :(";
        }

    }
    
    xhr.send();
}

// Creating UI
function mainUI (user) {
    
    let cardCode = `<div class="card-user">
            <img src="${user.avatar_url}" alt="">
          </div>
          <div class="card-user-info">
            <p>Name: ${user.name || user.login}</p>
            <p>Id: ${user.id}</p>
            <p>Bio: ${user.bio || ''}</p>
          </div>`;

    cardUser.innerHTML = cardCode;
}

button.addEventListener('click', mainFunction);