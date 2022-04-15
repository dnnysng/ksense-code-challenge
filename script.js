const users = document.querySelector('#users')
const posts = document.querySelector('#posts')
const usersContainer = document.querySelector('.usersContainer')
const postsContainer = document.querySelector('.postsContainer')

// loads the users into the table
window.onload = async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const users = await response.json()
    users.forEach(({ id, username, name, email }) => {
      usersContainer.innerHTML += `<tr onclick='showPosts(${id})' class='user'}>
        <td>${username}</td>
        <td>${name}</td>
        <td>${email}</td>
      </tr>`
    })
  }
  catch (error) {
    console.error(`Could not get users: ${error}`);
  }
}

// shows posts
function showPosts(id, name) {
  posts.classList.remove('hidden')
  users.classList.add('hidden')
  getPosts(id);
}

// gets the posts
async function getPosts(id) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const posts = await response.json()
    postsContainer.innerHTML += `<button onclick='backToUsers()'>Back To Users</button>`
    const usersPosts = posts.filter(post => post.userId === id)
    usersPosts.forEach(({ id, title, body }) => {
      postsContainer.innerHTML += `<div key=${id} class='post'>
        <span class='title'>${title}</span>
        <p class='body'>${body}</p>
      </div>`
    })
  }
  catch (error) {
    console.error(`Could not get posts: ${error}`);
  }
}

// goes back to users table
function backToUsers() {
  posts.classList.add('hidden')
  users.classList.remove('hidden')
  postsContainer.innerHTML = ''
}
