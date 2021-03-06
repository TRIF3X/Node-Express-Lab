// import your node modules
const express = require('express')
const db = require('./data/db.js');
const server = express();

server.use(express.json());
// add your server code starting here

server.get('/api/posts', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res
              .status(500)
              .json({ error: 'The posts information could not be retrieved' });
          });
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
  
    db.findById(id)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: 'user not found' });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "The post with the specified ID does not exist.", error: err });
      });
  });

server.post('/api/posts', (req, res) => {
  const post = req.body
  db.find()
    .then(userId => {
      if (!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        return;
    } else {
      db.insert(req.body)
        .then(id => {
          res.status(201).json(post)
        })
        .catch(err => {
          res.status(500).json({ error: "There was an error while saving the post to the database", err })
        })
    }}) 
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the post to the database", err })
    })
})

server.delete('/api/posts/:id', (req, res) => {
  db.remove(req.params.id)
    .then(userId => {
      if(userId) {
        res.status(200).json(req.body)
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed", err })
    })
})

server.put('/api/posts/:id', (req, res) => {
  const body = req.body
  db.find()
    .then(userId => {
    if (!req.body.title || !req.body.contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    return;
  } else { 
    db.update(req.params.id, req.body)
      .then(id => {
        if(!id) {
          res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
          res.status(200).json({ message: 'note updated', body })
        }
      })
  } })
  .catch(err => {
    res.status(500).json({ error: "The post information could not be modified.", err })
  })
})

server.listen(9000)