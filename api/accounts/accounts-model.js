const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts').where('id', id).first()
}

const create = async ({ name, budget }) => {
  const [id] = await db('accounts').insert({ name: name.trim(), budget })
  return getById(id)
}

const updateById = async (id, account) => {
  await db('accounts').where('id', id).update(account)
  return getById(id)
}

const deleteById = async (id) => {
  const toBeDeleted = await getById(id);
  await db('accounts').where('id', id).delete()
  return toBeDeleted 
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
