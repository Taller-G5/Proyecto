const table = "PRODUCTO"
module.exports={
  get:`SELECT * FROM ${table}`,
  getByid: `SELECT * FROM ${table} WHERE id${table} = ?`,
  create:`INSERT INTO ${table} SET ?`
}
