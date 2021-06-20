
const lst = window.location.href.split('/')
const id = lst[lst.length-1];

console.log(`/api/posts/${id}`);
const editPostHandler = async (event) => {
    event.preventDefault();
    
    const description = document.querySelector('#post-text').value.trim();
    
        const lst = window.location.href.split('/')
        const id = lst[lst.length-1];
        console.log(id);
        
    if (description) {
        const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ description}),
        headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
        document.location.replace('/dashboard');
        } else {
        alert(response.statusText);
        }
    }
    };

const deletePostHandler = async (event) =>{
    event.preventDefault();
    console.log('deleting post');
    
    const lst = window.location.href.split('/')
    const id = lst[lst.length-1];
    //const description = document.querySelector('#post-text').value.trim();

    
        const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        });
    
        if (response.ok) {
        document.location.replace('/dashboard');
        console.log('delete successful');
        } else {
        alert(response.statusText);
        }
    
    
}
document    
    .querySelector('.edit-post-form')
    .addEventListener('submit', editPostHandler);
document.querySelector('#delete-post')
    .addEventListener('click', deletePostHandler);