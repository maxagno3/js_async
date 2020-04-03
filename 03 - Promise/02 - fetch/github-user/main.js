// Your code goes here
let inputSearch = document.querySelector('input');
let user = document.querySelector('.flex-user_info')
let gitAPI = "http://api.github.com/users/"; //name,company,location,image,followers count, following count, repo count,blog(company URL)
let followerList = document.querySelector('.repo-grid');
let newObj = {};
let followerArray = [];
let repoArray = [];

//From where the data is being taken
function mainFunction () {
    event.preventDefault();

    if(inputSearch.value.trim()) {
        userName = inputSearch.value;
        fetchData(userName, gitAPI);
        inputSearch.value = '';
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
        console.log(userData,"data");
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
        userName = '';
        })
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Followers Data
    let followData = fetch(followersAPI).then(response => {
        return response.json();
    }).then(userFollow => {
        for (let i=0; i < 5; i++){
            if(!userFollow[i]) {
                break;
            }
            followerArray.push({ username: userFollow[i].login, followerImage: userFollow[i].avatar_url});
        }
    }).then(elem => {

        show({followerArr: followerArray})});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Repo Data
    let repoData = fetch(repoAPI).then(response => {
        return response.json();
    }).then(userRepo => {
        for (let i = 0; i < 5; i++) {
            if (!userRepo[i]) {
                break;
            }
            repoArray.push({ repoName: userRepo[i].name, repoFork: userRepo[i].forks_count });
        }
    }).then(elem => {
        console.log(repoArray);
        show({ repoArr: repoArray })
    });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function show(obj) {
    for(let key in obj) {
        newObj[key] = obj[key];
    }
    // console.log('check', obj.followerArr && !document.querySelector('.followers-flex').innerHTML.trim());

    if(obj.followerArr && !document.querySelector('.followers-flex').innerHTML.trim()) {
        
        for (i=0; i< obj.followerArr.length; i++){
          let followDiv = document.querySelector(`.follower${i+1}`);
          
            followDiv.innerHTML = `<img src="${obj.followerArr[i].followerImage}" alt="no image" class="repo-image">
            <span class="highlight">${obj.followerArr[i].username}</span>`;
        }
        // newObj = {};
    }

    if (obj.repoArr && !document.querySelector('.repo').innerHTML.trim()) {
        console.log(newObj.repoArr, 'show2');
        
        for (i = 0; i < obj.repoArr.length; i++) {
        // let class = ".repo" + i;
            let repoDiv = document.querySelector(`.repo${i + 1}`);
            console.log(repoDiv, 'repoDiv');

            repoDiv.innerHTML = `<h3 class="repo-name">${obj.repoArr[i].repoName}</h3>
            <i class="fas fa-code-branch repo-icon"> ${obj.repoArr[i].repoFork}</i>`;
        }
    }
    
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