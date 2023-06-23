let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const toyCollection = document.getElementById('toy-collection');
  const toyForm = document.querySelector('.add-toy-form');

  // Function to create a card for a toy
  const createToyCard = toy => {
    const card = document.createElement('div');
    card.classList.add('card');

    const name = document.createElement('h2');
    name.textContent = toy.name;

    const image = document.createElement('img');
    image.src = toy.image;
    image.classList.add('toy-avatar');

    const likes = document.createElement('p');
    likes.id = `likes-${toy.id}`;
    likes.textContent = `Likes: ${toy.likes}`;

    const likeButton = document.createElement('button');
    likeButton.classList.add('like-btn');
    likeButton.id = toy.id;
    likeButton.textContent = 'Like';

    // Add event listener to the like button
    likeButton.addEventListener('click', () => {
      increaseToyLikes(toy);
    });

    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(likes);
    card.appendChild(likeButton);
    toyCollection.appendChild(card);
  };

  // Function to increase a toy's likes
  const increaseToyLikes = toy => {
    const likesElement = document.querySelector(`#likes-${toy.id}`);
    const newNumberOfLikes = toy.likes + 1;

    // Send a PATCH request to update the toy's likes
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        likes: newNumberOfLikes,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Update the toy's likes in the DOM
        likesElement.textContent = `Likes: ${data.likes}`;
      })
  };

  // Make a GET request to fetch the toy objects
  fetch('http://localhost:3000/toys', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      // Iterate over the toy objects and create cards for each
      data.forEach(toy => {
        createToyCard(toy);
      });
    })

  // Handle form submission to add a new toy
  toyForm.addEventListener('submit', event => {
    // ...
  });
});


