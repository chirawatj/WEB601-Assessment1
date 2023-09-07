const express = require('express'); // import express   
const { get } = require('http');
const router = express.Router(); // create instance of express router
const path = require('path'); // import path
const fs = require('fs').promises; // import file system
const databasePath = path.join(__dirname, '..', 'database/comments.json'); // where to find the database

// general function to get all comments which can be used by multiple routes
getComments = async () => {
    try {
        // get all comments from database
        const commentsData = await fs.readFile(databasePath, 'utf-8')
        const comments = JSON.parse(commentsData);
        console.log('Comments received')
        return comments;
    } catch (error) {
        console.log(error);
        return 'error'
    }
}

// get all comments
router.get('/comments', async (req, res) => {
    let response = await getComments();
    if (response === 'error') {
        res.status(500).json({message: 'Error getting comments'}); // 500 = internal server error
    } else {
        res.json(response); // send the comments back to the client
    } 
});

// create comment function
// which method will this be?
// receive details of new comment
// read and update database
// rewrite database

router.post('/comments', (req, res) => {
    const { name, message } = req.body;

    const newComment = { name, message };
    comments.push(newComment);
  
    fs.writeFileSync(databasePath, JSON.stringify(comments, null, 2));
  });

// update comment function
// which method will this be?
// probably need to build some sort of update form, maybe reuse the create comment form?
// receive details of updated comment and id
// read, update, write database

// router.put('/comments/:id', async (req, res) => {
//   const comments = getComments();
//   const commentId = parseInt(req.params.id);
//   const updatedComment = req.body;

//   if (commentId >= 0 && commentId < comments.length) {
//       comments[commentId] = updatedComment;
//       fs.writeFile(databasePath, JSON.stringify(response, null, 2));
//       res.json(updatedComment);
//   } else {
//       res.status(404).json({ error: 'Comment not found' });
//   }
// });


// delete comment
router.delete('/comments/:id', async (req, res) => {
    const commentId = req.params.id; // get the id of the comment to delete
    let response = await getComments(); // get all comments from database
    if (response === 'error') {
        res.status(500).json({message: 'Error getting comments'}); // 500 = internal server error
    }
    // find and delete the comment
    if (response.hasOwnProperty(commentId)) { // if the comment exists
        delete response[commentId]; // delete the comment
        await fs.writeFile(databasePath, JSON.stringify(response, null, 2)); // write the updated database
        res.status(204).end(); // send success message to client without content
    } else {
        res.status(404).json({message: `Comment with id ${commentId} not found`}); // send error message to client
    }
});

module.exports = router; // export router
