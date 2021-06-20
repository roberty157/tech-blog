const router = require('express').Router();
const { Post,User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    // find all posts
    // be sure to include its associated User
    try {
      const postData = await Post.findAll({
        
        include: [{ model: User }],
      });
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  
});

//create a new blog post
router.post('/', async (req, res) => {
    
    try {
      const postData = await Post.create({
        title: req.body.title,
        description: req.body.description,
        user_id: req.session.user_id

      });
      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(err);
    }
  
});


//route to update a post
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Post.update(
    {
      // All the fields you can update and the data attached to the request body.
      description: req.body.description,
    },
    {
      // Gets the books based on the id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedPost) => {
      // Sends the updated book as a json response
      res.json(updatedPost);
    })
    .catch((err) => res.json(err));
});

//delete a post by id
router.delete('/:id', async (req, res) => {
  try {
    const PostData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!PostData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    res.status(200).json(PostData);
  } catch (err) {
    res.status(500).json(err);
  }

});




module.exports = router;
