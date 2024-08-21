const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts').where('id', id).first()
}

const create = account => {
  return "Create wired"
}

const updateById = (id, account) => {
  return "UpdateByID wired"
}

const deleteById = id => {
  return "delete wired"
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
