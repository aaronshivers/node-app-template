const express = require('express')
const router = express.Router()
const _ = require('lodash')
const {ObjectId} = require('mongodb')

const Todo = require('../models/todo-model')

// GET /todos
router.get('/todos', (req, res) => {

  Todo.find({}).then((todo) => {
    console.log(todo)
    if (!todo) {
      res.send('nips')
    }
    res.send(todos)
  }).catch((err) => res.send('fart'))
})

// POST /todos
router.post('/todos', (req, res) => {
  const body = _.pick(req.body, ['text', 'completed'])
  const todo = new Todo(body)
  console.log(todo)
  todo.save().then((todo) => {
    res.send(todo)
  })
})

// GET /todos/:id
router.get('/todos/:id', (req, res) => {
  const id = req.params.id

  if (!ObjectId.isValid(id)) {
    return res.status(404).send('Invalid ObjectId')
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send('Todo not found')
    }
    res.send({todo})
  }).catch((err) => res.status(400).send('Database Error'))
})


module.exports = router
