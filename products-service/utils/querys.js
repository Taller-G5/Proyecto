const table = "PRODUCTO"
module.exports={
  get:`SELECT * FROM ${table}`,
  getByid: `SELECT * FROM ${table} WHERE id${table} = ?`,
  create:`INSERT INTO ${table} SET ?`,
  update: `UPDATE ${table} SET nombre = ?, precio = ?,proovedor = ?,categoria = ?, descripcion = ? WHERE id${table} = ?`,
  delete :`DELETE FROM ${table} WHERE id${table} = ?`,
  insertCompra:`INSERT INTO COMPRA SET ?`,
  totalGasto:`SELECT PRODUCTO.nombre AS nombre, COMPRA.cantidad*PRODUCTO.precio_compra AS total_gasto,COMPRA.fecha_compra FROM COMPRA INNER JOIN PRODUCTO ON COMPRA.idPRODUCTO = PRODUCTO.idPRODUCTO`,
  updateStock:`UPDATE ${table} SET stock = ? WHERE id${table} = ?`,
  totalProductos:`SELECT PRODUCTO.nombre AS producto,DETALLE.cantidad AS total  FROM PRODUCTO INNER JOIN DETALLE  ON PRODUCTO.idPRODUCTO = DETALLE.idPRODUCTO`,
  ProductoMatch:`SELECT * FROM ${table} where descripcion LIKE CONCAT('%',?,'%')`
}
