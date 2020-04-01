// Your code goes here
let inputSearch = document.querySelector('input');
let user = document.querySelector('.flex-user_info')
let gitAPI = "http://api.github.com/users/"; //name,company,location,image,followers count, following count, repo count,blog(company URL)
let newObj = {};
let followerArray = [];

//From where the data is being taken
function mainFunction () {
    event.preventDefault();

    if(inputSearch.value.trim()) {
        userName = inputSearch.value;
        fetchData(userName, gitAPI);
        inputSearch.value = ''
    }
}

// Fetch API
function fetchData (userName, gitAPI) {
    gitAPI += userName;
    let followersAPI = `https://api.github.com/users/${userName}/followers`;
    let repoAPI = `https://api.github.com/users/${userName}/repos`;

    // User Data
    let getAPI = fetch(gitAPI).then(response => {
        return response.json();
    }).then(userData => {
        console.log(userData);
        newObj.name = userData.name;
        newObj.image = userData.avatar_url;
        newObj.login = userData.login;
        newObj.location = userData.location;
        newObj.blog = userData.blog;
        newObj.bio = userData.bio;
        newObj.followers = userData.followers;
        newObj.following = userData.following;
        newObj.repos = userData.public_repos;
        console.log(newObj)
        createUI(newObj)
        })
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Followers Data
    let followData = fetch(followersAPI).then(response => {
        return response.json();
    }).then(userFollowers => console.log(userFollowers));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Repo Data
    let repoData = fetch(repoAPI).then(response => {
        return response.json();
    }).then(userRepo => console.log(userRepo));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}


//Create UI
function createUI (newObj) {
    let userInfo = `<div>
    <img src="${newObj.image}" alt="no image" class="main-image">
    </div>
    <div class="wrapper-user_info">
    <h2 class="user-info_name">${newObj.name || ''}<span class="highlight">${newObj.login || ''}</span></h2>
    <h3>${newObj.bio || ''} <span class="highlight"></span></h3>
    <h3><i class="fas fa-user-friends"></i>Company Name</h3>
    <h3><i class="fas fa-map-marker-alt"></i>${newObj.location || ''}</h3>
    <i class="fas fa-link"></i><span class="highlight">${newObj.blog || ''}</span>
    
    <div class="user-numbers followers">
              <div>
                <p>${newObj.followers}</p>
                <p>Followers</p>
              </div>
              
              <div>
                <p>${newObj.following}</p>
                <p>Following</p>
              </div>

              <div>
                <p>${newObj.repos}</p>
                <p>Repositories</p>
              </div>

            </div>`

    user.innerHTML = userInfo;
}

inputSearch.addEventListener('click', mainFunction);