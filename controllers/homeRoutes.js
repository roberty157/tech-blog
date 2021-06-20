const router = require('express').Router();
const {  User,Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
});
  

router.get('/dashboard', withAuth, async (req, res) => {
    //get all the posts of the logged in user
    try{
        const userPostData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                  model: User,
                  attributes: ['name'],
                },
              ],
        });
        const userPosts = userPostData.map((post) => post.get({ plain: true }));
        res.render('dashboard', { 
            userPosts, 
            logged_in: req.session.logged_in 
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
  

router.get('/newPost', withAuth,(req, res) => {
  // If the user is already logged in, redirect the request to another route

  res.render('newPost');
});

router.get('/post/:id', withAuth, async (req, res)=>{
  //if id of user of post is the same as the logged in session user id, create a page to update&delete
  try {
    //
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name','id'],
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    
    const post = postData.get({ plain: true });

    //also get comments on this post
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    console.log(postData.user_id);
    console.log(req.session.user_id);
    if(postData.get('user_id')== req.session.user_id){
      //this means you're looking at your own post
      res.render('userPost', {
        comments,
        post,
        logged_in: req.session.logged_in 
      });
    }
    else{
      res.render('post', { 
        comments,
        post, 
        logged_in: req.session.logged_in 
      });
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
