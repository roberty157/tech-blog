const commentHandler = async (event) => {
    event.preventDefault();
  
    const text = document.querySelector('#comment-text').value.trim();
    const lst = window.location.href.split('/')
    const id = lst[lst.length-1];
    console.log(id);
    if (text) {
      const response = await fetch(`/api/comments/post/${id}`, {
        method: 'POST',
        body: JSON.stringify({ text}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };


  document
  .querySelector('.comment-form')
  .addEventListener('submit', commentHandler);