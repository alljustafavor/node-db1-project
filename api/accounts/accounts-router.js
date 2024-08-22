const router = require('express').Router();
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware.js');
const Accounts = require('./accounts-model.js');

router.get('/', async (req, res, next) => {
  try {
    const data = await Accounts.getAll()
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    res.status(200).json(req.account)
  } catch (error) {
    next(error)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const data = await Accounts.create(req.body)
    return res.status(201).json(data)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', checkAccountPayload, checkAccountNameUnique, checkAccountId, async (req, res, next) => {
  try {
    const data = await Accounts.updateById(req.params.id, req.body)
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const data = await Accounts.deleteById(req.params.id)
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
