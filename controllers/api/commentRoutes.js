const router = require('express').Router();
const { Post,User,Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    // find all posts
    // be sure to include its associated User
    try {
      const commentData = await Comment.findAll({
        
        include: [{ model: User }],
      });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  
});

router.post('/post/:id', async (req, res) => {
    //take the post id in the params
    // create a comment
    try{
        const commentData = await Comment.create({
            text:req.body.text,
            
            user_id: req.session.user_id,
            post_id : req.params.id,
        });

        res.status(200).json(commentData);

    } catch (err) {
        res.status(400).json(err);
    }
  
});

module.exports = router;