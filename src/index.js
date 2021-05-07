document.addEventListener("DOMContentLoaded", function() {
    loadImages();
    loadBreeds();
  })
  let breeds = []
  function loadImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  
    return fetch(imgUrl)
      .then(resp => resp.json())
      .then(results => {
        results.message.forEach(image => addImage(image))
      });
  }
  
  function addImage(picUrl) {
    const container = document.getElementById("dog-image-container");
    const newImage = document.createElement('img');
    newImage.src = picUrl;
    container.appendChild(newImage);
  }
  
  function loadBreeds() {
    return fetch('https://dog.ceo/api/breeds/list/all')
      .then(resp => resp.json())
      .then(results => {
        const breeds = Object.keys(results.message);
        addBreeds(breeds);
      });
  }
  
  function addBreeds(breeds) {
    const ul = document.getElementById("dog-breeds");
    breeds.forEach(breed => {
      const li = document.createElement("li");
      li.innerText = breed;
      ul.appendChild(li);
      li.addEventListener("click", function(event) {
        event.target.style.color = "blue";
      });
    });
    const dogBreeds = document.getElementById('dog-breeds')
    const dropDown = document.getElementById('breed-dropdown')
    function createDogList(list){
        let dogListArray = list.map(function(breed){
            return `<li>${breed}</li>`
        })
        return dogListArray.join(" ")
    }
    dropDown.addEventListener('change', function(event){
        const letter = event.target.value
        const filter = breeds.filter((dog) => dog.startsWith(letter))
        dogBreeds.innerHTML = createDogList(filter)
    })

  }