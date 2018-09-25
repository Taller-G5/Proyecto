const table = "VENTA"
module.exports={
  get:`SELECT * FROM ${table}`,
  getsNumberRows:`SELECT count(*) FROM ${table}`,
  getByid: `SELECT * FROM ${table} WHERE id${table} = ?`,
  create:`INSERT INTO ${table} SET ?`,
  detalles:`INSERT INTO DETALLE (idVENTA,idPRODUCTO,cantidad,precio) VALUES ?`
}
