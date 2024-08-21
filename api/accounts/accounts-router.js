const router = require('express').Router();
const Accounts = require('./accounts-model.js');

router.get('/', (req, res, next) => {
  try {
    const data = Accounts.getAll()
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', (req, res, next) => {
  try {
    const data = Accounts.getById()
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

router.post('/', (req, res, next) => {
  try {
    const data = Accounts.create()
    res.status(201).json(data)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', (req, res, next) => {
  try {
    const data = Accounts.updateById()
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    const data = Accounts.deleteById()
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
