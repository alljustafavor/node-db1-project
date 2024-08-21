const Accounts = require("./accounts-model") 

exports.checkAccountPayload = (req, res, next) => {
  let { budget, name } = req.body
  name = name.trim()
  budget = budget.parseFloat()

  if (!budget || !name) {
    next({ status: 400, message: "name and budget are required"})
  } else if (name.length > 100 || name.length < 3) {
    next({ status: 400, message: "name of account must be between 3 and 100"})
  } else if (!budget.isNaN()) {
    next({ status: 400, message: "budget of account must be a number"})
  } else if (budget < 0 || budget > 1_000_000) {
    next({ status: 400, message: "budget of account is too large or too small"})
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  let name = req.body.name
  let accounts = await Accounts.getAll()

  for (let acc in accounts) {
    if (acc == name) {
      next({ status: 400, message: "that name is taken" })
    } else {
      next()
    }
  }
}

exports.checkAccountId = async (req, res, next) => {
  let account = await Accounts.getById(req.params.id)

  if (account) {
    req.account = account
    next()
  } else {
    next({ status: 404, message:"account not found"})
  }
}
