const Accounts = require("./accounts-model") 

exports.checkAccountPayload = (req, res, next) => {
  let { budget, name } = req.body;
  
  if (!name || budget === undefined || budget === '') {
    return next({ status: 400, message: "name and budget are required" });
  }

  const parsedBudget = parseFloat(budget);
  console.log(parsedBudget);

  if (isNaN(parsedBudget)) {
    return next({ status: 400, message: "budget must be a number" });
  }

  if (parsedBudget < 0 || parsedBudget > 1_000_000) {
    return next({ status: 400, message: "budget of account is too large or too small" });
  }

  if (name.trim().length < 3 || name.trim().length > 100) {
    return next({ status: 400, message: "name of account must be between 3 and 100 characters" });
  }

  req.body.budget = parsedBudget;
  req.body.name = name.trim();
  next();
};

exports.checkAccountNameUnique = async (req, res, next) => {
  let name = req.body.name;
  let accounts = await Accounts.getAll();
  
  const nameExists = accounts.some(account => account.name === name);
  
  if (nameExists) {
    next({ status: 400, message: "that name is taken" });
  } else {
    next();
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
