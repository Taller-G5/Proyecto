CREATE USER 'axel'@'%' IDENTIFIED WITH mysql_native_password BY 'admin';
GRANT ALL PRIVILEGES ON *.* TO 'axel'@'%' WITH GRANT OPTION;

-- -----------------------------------------------------
-- Table `USUARIO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS USUARIO (
  `idUSUARIO` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idUSUARIO`),
  UNIQUE INDEX `idUSUARIO_UNIQUE` (`idUSUARIO` ASC) VISIBLE);
-- -----------------------------------------------------
-- Table `VENTA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS VENTA(
  `idVENTA` INT NOT NULL AUTO_INCREMENT,
  `idUSUARIO` INT NOT NULL,
  `fecha_venta` VARCHAR(45) NOT NULL,
  `url_reporte` VARCHAR(100) NULL,
  PRIMARY KEY (`idVENTA`),
  UNIQUE INDEX `idVENTA_UNIQUE` (`idVENTA` ASC) VISIBLE,
  INDEX `fk_VENTA_USUARIO_idx` (`idUSUARIO` ASC) VISIBLE,
  CONSTRAINT `fk_VENTA_USUARIO`
    FOREIGN KEY (`idUSUARIO`)
    REFERENCES `USUARIO` (`idUSUARIO`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

-- -----------------------------------------------------
-- Table `PRODUCTO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS PRODUCTO(
  `idPRODUCTO` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `proovedor` VARCHAR(45) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `precio_compra` DOUBLE NOT NULL,
  `stock` INT NOT NULL,
  `descripcion` VARCHAR(500) NOT NULL,
  `categoria` VARCHAR(45) NOT NULL,
  `fecha_registro` VARCHAR(45) NOT NULL,
  `image_url` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`idPRODUCTO`),
  UNIQUE INDEX `idPRODUCTO_UNIQUE` (`idPRODUCTO` ASC) VISIBLE);

-- -----------------------------------------------------
-- Table `COMPRAS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS COMPRA(
  `idCOMPRA` INT NOT NULL AUTO_INCREMENT,
  `idPRODUCTO` INT NOT NULL,
  `cantidad` VARCHAR(45) NOT NULL,
  `fecha_compra` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCOMPRA`),
  UNIQUE INDEX `idCOMPRA_UNIQUE` (`idCOMPRA` ASC) VISIBLE,
  INDEX `fk_COMPRA_PRODUCTO_idx` (`idPRODUCTO` ASC) VISIBLE,
  CONSTRAINT `fk_COMPRA_PRODUCTO`
    FOREIGN KEY (`idPRODUCTO`)
    REFERENCES PRODUCTO (`idPRODUCTO`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
-- -----------------------------------------------------
-- Table `DETALLE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS DETALLE (
  `idDETALLE` INT NOT NULL AUTO_INCREMENT,
  `idVENTA` INT NOT NULL,
  `idPRODUCTO` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `precio` DOUBLE NOT NULL,
  PRIMARY KEY (`idDETALLE`),
  UNIQUE INDEX `idDETALLE_UNIQUE` (`idDETALLE` ASC) VISIBLE,
  INDEX `fk_DETALLE_VENTA_idx` (`idVENTA` ASC) VISIBLE,
  INDEX `fk_DETALLE_PRODUCTO_idx` (`idPRODUCTO` ASC) VISIBLE,
  CONSTRAINT `fk_DETALLE_VENTA`
    FOREIGN KEY (`idVENTA`)
    REFERENCES VENTA (`idVENTA`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_DETALLE_PRODUCTO`
    FOREIGN KEY (`idPRODUCTO`)
    REFERENCES PRODUCTO (`idPRODUCTO`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

ALTER TABLE USUARIO ADD CONSTRAINT CK_ROLE CHECK (role in ('ADMINISTRADOR','OPERADOR'));
ALTER TABLE PRODUCTO ADD CONSTRAINT CK_CATEGORIA CHECK (categoria in ('INYECTABLE','PASTILLA','JARABE'));