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

// add comment
router.post('/comments', async (req, res) => {
    const { username, message } = req.body; // create a variables username and message  
    let response = await getComments(); // get all comments from database
    const commentId = Date.now().toString(); // crate user comment with unique ID
    const newComment = { username, message }; // create new comment

    response[commentId] = newComment; // add comment with unique ID
    
    await fs.writeFile(databasePath, JSON.stringify(response, null, 2)); // write the updated database
    res.status(201).json(response);
  });

// update comment
router.put('/comments/:id', async (req, res) => {
    const commentId = req.params.id; // get the id of the comment
    const updatedText = req.body.message;  // get the comment text
    let response = await getComments(); // get all comments from database

    if (response.hasOwnProperty(commentId)) { // if the comment exists
        response[commentId].message = updatedText; // update the comment

        await fs.writeFile(databasePath, JSON.stringify(response, null, 2)); // write the updated comment to database
        
        res.status(204).end();
    } else {
        res.status(404).json({message: `Comment with id ${commentId} not found`}); // send error message to client
    }
});

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
        fs.writeFile(databasePath, JSON.stringify(response, null, 2)); // write the updated database
        res.status(204).end(); // send success message to client without content
    } else {
        res.status(404).json({message: `Comment with id ${commentId} not found`}); // send error message to client
    }
});

module.exports = router; // export router
