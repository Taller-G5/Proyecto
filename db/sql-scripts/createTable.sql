-- -----------------------------------------------------
-- Table `USUARIO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS USUARIO (
  `idUSUARIO` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `role` VARCHAR(20) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idUSUARIO`),
  UNIQUE INDEX `idUSUARIO_UNIQUE` (`idUSUARIO` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `VENTA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS VENTA(
  `idVENTA` INT NOT NULL AUTO_INCREMENT,
  `idUSUARIO` INT NOT NULL,
  `fecha_venta` VARCHAR(45) NOT NULL,
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
  `precio` DOUBLE NOT NULL,
  `stock` INT NOT NULL,
  PRIMARY KEY (`idPRODUCTO`),
  UNIQUE INDEX `idPRODUCTO_UNIQUE` (`idPRODUCTO` ASC) VISIBLE);


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

ALTER TABLE USUARIO ADD CONSTRAINT CK_ROLE CHECK (role in ('ADMIN','OPERADOR'));