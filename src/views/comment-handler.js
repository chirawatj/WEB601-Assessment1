// get relevant elements
const commentsContainer = document.getElementById('comments-container');
const commentForm = document.getElementById('comment-form');
const formName = document.getElementById('form-name');
const formMessage = document.getElementById('form-message');

// get comments from database
const getComments = async () => {
    // fetch creates a request object and returns a promise
    // params: url, options (method, headers, etc.)
    const response = await fetch('/comments'); // get comments
    const comments = await response.json(); // convert response to json

    commentsContainer.innerHTML = ''; // clear comments container

    // create html element for each comment
    Object.keys(comments).forEach(commentId => {
        comment =  comments[commentId]
        const commentElement = document.createElement('div'); // create comment element
        commentElement.classList.add('comment'); // add comment class
        // add comment html and details
        commentElement.innerHTML = `
            <div class="comment-top">
                <h4>${comment.username}</h4>
                <button type="button" class="update-btn" data-id=${commentId}>Update</button>
                <button type="button" class="delete-btn" data-id=${commentId}>Delete</button>
            </div>
            <p>${comment.message}</p>
        `;
        commentsContainer.appendChild(commentElement); // add comment to comments container
    });

    // add comment form to comments container
    const commentForm = document.createElement('div');
    commentForm.setAttribute('id', 'comment-form');
    commentForm.innerHTML = `
        <h4>New Comment</h4>
        <input type="text" id="form-name" placeholder="Display Name" maxlength="20">
        <textarea id="form-message" placeholder="Comment" maxlength="100"></textarea>
        <button type="submit" class="post-btn">Post</button>
    `;
    commentsContainer.appendChild(commentForm);

    console.log('Retrieved and displayed comments');
};

// add comments
commentsContainer.addEventListener('click', async (event) => {
    
    const target = event.target; // get the element that was clicked
    const formName = document.getElementById('form-name');
    const formMessage = document.getElementById('form-message');
    const username = formName.value
    const message = formMessage.value
    if (target.classList.contains('post-btn')) {
    if (username.trim() === '' || message.trim() === '') {
        alert('Please enter both a name and a comment.');
        return;
    }
    const response = await fetch('/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, message })
    });
    if (response.ok) {
        const addedComments = await response.json();
        getComments(addedComments);
        formName.value = '';
        formMessage.value = '';
    } else {
        alert('Failed to add comment. Please try again.');
    }}
});

// delete comments
commentsContainer.addEventListener('click', async (event) => {
    const target = event.target; // get the element that was clicked
    
    if (target.classList.contains('delete-btn')) {
        const commentId = target.getAttribute('data-id'); // get the id of the comment to delete
        console.log('Deleting comment with id', commentId)
        const response = await fetch(`/comments/${commentId}`, {method: 'DELETE'}); // delete the comment

        if (response.status === 204) { // 204 = success, no content
            console.log(`Comment with id ${commentId} deleted`);
            getComments(); // get comments from database and display
        } else {
            console.log(`Error deleting comment with id ${commentId}`);
        }
    }
});

// update comments functionality
// need an event listener for button clicks for update
// need to get the id of the comment to update
// need to send the id to the server
// update displayed comments


commentsContainer.addEventListener('click', async (event) => {
    const target = event.target; // get the element that was clicked
    if (target.classList.contains('update-btn')) {
        
        const commentId = target.getAttribute('data-id');
        // Get the existing comment text from the <p> element
        const existingCommentText = target.parentElement.parentElement.querySelector('p').textContent;

        // Prompt the user for a new comment text, pre-filled with the existing text
        const newComment = prompt('Edit the comment:', existingCommentText);

            if (newComment !== null) {
                const response = await fetch(`/comments/${commentId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: newComment }),
                })
                if (response.status === 204) { // 204 = success, no content
                    console.log(`Comment with id ${commentId} updated`);
                    getComments(); // get comments from database and display
                } else {
                    console.log(`Error updating comment with id ${commentId}`);
                }
            }
        }
});


// get comments from database and display on page load
getComments();
console.log('Loading comments');

