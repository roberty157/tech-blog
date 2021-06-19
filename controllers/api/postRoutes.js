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






module.exports = router;
