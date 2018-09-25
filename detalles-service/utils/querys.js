const table = "DETALLE"
module.exports={
  get:`SELECT * FROM ${table}`,
  getByid: `SELECT * FROM ${table} WHERE id${table} = ?`,
  create:`INSERT INTO ${table} SET ?`,
  get_join:`SELECT PRODUCTO.nombre AS producto,DETALLE.idVENTA  AS num_venta,PRODUCTO.precio AS precio,DETALLE.cantidad AS cantidad,DETALLE.cantidad*DETALLE.precio AS total  FROM PRODUCTO JOIN DETALLE  ON PRODUCTO.idPRODUCTO = DETALLE.idPRODUCTO ORDER BY num_venta`
}
