// Using XMLHttpRequest and Promise write your own implementation of browesrs fetch method.
// 1. It takes two parameter 'url' and type of request (GET | POST)
// 2. Returns a promise
// 3. Resolve the promise when data is fetched (onload)
// 4. Reject the promise when error occured (onerror)

function fetchData(apiUrl, fetchMethod) {
  // your code goes here
  let xhr = new XMLHttpRequest;

  xhr.open(apiUrl, fetchMethod);

  xhr.onload() = function () {

    if(this.status == 200) {
      console.log(xhr.response);
    } else {
      console.log('Error');
    }

  }

  xhr.send();

  return new Promise ((resolve, reject) => {
    resolve(xhr.onload);
    reject(xhr.onerror);
  })
}

fetchData('https://api.github.com/users/', 'GET');