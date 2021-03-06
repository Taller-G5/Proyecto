const table = "DETALLE"
module.exports={
  get:`SELECT * FROM ${table}`,
  getByid: `SELECT * FROM ${table} WHERE id${table} = ?`,
  create:`INSERT INTO ${table} SET ?`,
  totalVenta:`SELECT DISTINCT PRODUCTO.nombre AS producto,DETALLE.cantidad*DETALLE.precio AS total,VENTA.fecha_venta  FROM PRODUCTO INNER JOIN DETALLE  ON PRODUCTO.idPRODUCTO = DETALLE.idPRODUCTO  INNER JOIN VENTA  ON DETALLE.idVENTA = VENTA.idVENTA`,
  get_join:`SELECT DISTINCT PRODUCTO.nombre AS producto,DETALLE.idVENTA  AS num_venta,PRODUCTO.precio AS precio,DETALLE.cantidad AS cantidad,DETALLE.cantidad*DETALLE.precio AS total,USUARIO.username AS usuario,VENTA.url_reporte AS url,VENTA.fecha_venta  FROM PRODUCTO INNER JOIN DETALLE  ON PRODUCTO.idPRODUCTO = DETALLE.idPRODUCTO  INNER JOIN VENTA  ON DETALLE.idVENTA = VENTA.idVENTA INNER JOIN USUARIO ON USUARIO.idUSUARIO = VENTA.idUSUARIO  ORDER BY num_venta;`,
  get_joif_4_pdf:`SELECT DISTINCT PRODUCTO.nombre AS producto,DETALLE.idVENTA  AS num_venta,PRODUCTO.precio AS precio,DETALLE.cantidad AS cantidad,DETALLE.cantidad*DETALLE.precio AS total,USUARIO.username AS usuario,VENTA.url_reporte AS url,VENTA.fecha_venta  FROM PRODUCTO INNER JOIN DETALLE  ON PRODUCTO.idPRODUCTO = DETALLE.idPRODUCTO  INNER JOIN VENTA  ON DETALLE.idVENTA = VENTA.idVENTA INNER JOIN USUARIO ON USUARIO.idUSUARIO = VENTA.idUSUARIO WHERE DETALLE.idVENTA = ?`,
  set_url: `UPDATE VENTA SET url_reporte = ? WHERE idVENTA = ?`
}
