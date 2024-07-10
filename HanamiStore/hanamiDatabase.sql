-- Creación de la base de datos
DROP DATABASE IF EXISTS hanamistore; 
CREATE DATABASE IF NOT EXISTS hanamistore;
USE hanamistore;

-- Creación de la tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  nombre_usuario VARCHAR(100),
  clave VARCHAR(100),
  correo VARCHAR(100),
  estado BOOLEAN DEFAULT 1
);

-- Creación de la tabla clientes
CREATE TABLE IF NOT EXISTS clientes (
  id_cliente INT PRIMARY KEY AUTO_INCREMENT,
  nombre_cliente VARCHAR(50),
  apellido_cliente VARCHAR(50),
  nombre_perfil VARCHAR(50),
  clave VARCHAR(100),
  CorreoE VARCHAR(100),
  Direccion VARCHAR(100),
  estado BOOLEAN DEFAULT 1
);

-- Creación de la tabla ordenes
CREATE TABLE IF NOT EXISTS ordenes (
  id_Orden INT PRIMARY KEY AUTO_INCREMENT,
  id_Cliente INT,
  direccion VARCHAR(250),
  Fecha_Orden DATE NOT NULL DEFAULT current_timestamp(),
  Estado_Orden enum('Pendiente','Finalizado','Entregado','Anulado') NOT NULL,
  FOREIGN KEY (id_Cliente) REFERENCES clientes (id_cliente)
);


-- Creación de la tabla categorias
CREATE TABLE IF NOT EXISTS categorias (
  id_Categoria INT PRIMARY KEY AUTO_INCREMENT,
  Nombre_Categoria VARCHAR(50) NOT NULL
);

-- Creación de la tabla sub_categorias
CREATE TABLE IF NOT EXISTS sub_categorias (
  id_SubCategoria INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  id_Categoria INT NOT NULL,
  FOREIGN KEY (id_Categoria) REFERENCES categorias (id_Categoria)
);

-- Creación de la tabla marcas
CREATE TABLE IF NOT EXISTS marcas (
  id_Marca INT PRIMARY KEY AUTO_INCREMENT,
  Nombre_Marca VARCHAR(50) NOT NULL,
  Logo_Marca VARCHAR(100) NOT NULL
);

-- Creación de la tabla productos
CREATE TABLE IF NOT EXISTS productos (
  id_Producto INT PRIMARY KEY AUTO_INCREMENT,
  Nombre_Producto VARCHAR(100) NOT NULL,
  descripcion_producto VARCHAR(100) NOT NULL,
  precio_producto DOUBLE(10, 2) NOT NULL,
  imagen_principal VARCHAR(100) NOT NULL,
  CantidadP INT NOT NULL,
  id_subcategoria INT NOT NULL,
  descuento INT,
  id_Marca INT NOT NULL,
  FOREIGN KEY (id_subcategoria) REFERENCES sub_categorias (id_SubCategoria),
  FOREIGN KEY (id_Marca) REFERENCES marcas (id_Marca)
);

-- Creación de la tabla imagenes
CREATE TABLE IF NOT EXISTS imagenes (
  id_imagen INT PRIMARY KEY AUTO_INCREMENT,
  id_producto INT,
  ruta VARCHAR(100),
  FOREIGN KEY (id_producto) REFERENCES productos (id_Producto)
);

-- Creación de la tabla detalleOrdenes
CREATE TABLE IF NOT EXISTS detalleOrdenes (
  id_detalle INT PRIMARY KEY AUTO_INCREMENT,
  id_orden INT,
  id_producto INT,
  cantidad INT UNSIGNED,
  precio_unitario decimal(5,2) UNSIGNED,
  comentario VARCHAR(250),
  puntuacion VARCHAR(250),
  FOREIGN KEY (id_orden) REFERENCES ordenes (id_Orden),
  FOREIGN KEY (id_producto) REFERENCES productos (id_Producto)
);


-- Creación de la tabla valoraciones
CREATE TABLE IF NOT EXISTS valoraciones (
  id_valoracion INT PRIMARY KEY AUTO_INCREMENT,
  Valoracion VARCHAR(5),
  id_detalle INT,
  comentario VARCHAR(100),
  fecha_comentario DATE,
  estado_comentario BOOLEAN,
  FOREIGN KEY (id_detalle) REFERENCES detalleOrdenes (id_detalle)
);

-- Restricciones de la tabla clientes
ALTER TABLE clientes
  ADD CONSTRAINT u_correo_cliente UNIQUE (CorreoE);

-- Restricciones de la tabla categorias
ALTER TABLE categorias
  ADD CONSTRAINT u_nombre_categoria UNIQUE (Nombre_Categoria);

-- Restricciones de la tabla sub_categorias
ALTER TABLE sub_categorias
  ADD CONSTRAINT u_nombre_subcategoria UNIQUE (nombre);

-- Restricciones de la tabla marcas
ALTER TABLE marcas
  ADD CONSTRAINT u_nombre_marca UNIQUE (Nombre_Marca);

/*

-- procedimiento insertar clientes --
DELIMITER //

CREATE PROCEDURE InsertarCliente(
    IN p_nombre_cliente VARCHAR(50),
    IN p_apellido_cliente VARCHAR(50),
    IN p_nombre_perfil VARCHAR(50),
    IN p_clave VARCHAR(100),
    IN p_correo VARCHAR(100),
    IN p_direccion VARCHAR(100)
)
BEGIN
    INSERT INTO clientes (nombre_cliente, apellido_cliente, nombre_perfil, clave, CorreoE, Direccion)
    VALUES (p_nombre_cliente, p_apellido_cliente, p_nombre_perfil, p_clave, p_correo, p_direccion);
END //

DELIMITER ;

-- procedimiento actualizar cliente --

DELIMITER //

CREATE PROCEDURE ActualizarCliente(
    IN p_id_cliente INT,
    IN p_nombre_cliente VARCHAR(50),
    IN p_apellido_cliente VARCHAR(50),
    IN p_nombre_perfil VARCHAR(50),
    IN p_clave VARCHAR(100),
    IN p_correo VARCHAR(100),
    IN p_direccion VARCHAR(100)
)
BEGIN
    UPDATE clientes
    SET nombre_cliente = p_nombre_cliente,
        apellido_cliente = p_apellido_cliente,
        nombre_perfil = p_nombre_perfil,
        clave = p_clave,
        CorreoE = p_correo,
        Direccion = p_direccion
    WHERE id_cliente = p_id_cliente;
END //

DELIMITER ;


DELIMITER //

 -- insertar orden --
 DELIMITER //

CREATE PROCEDURE InsertarOrden(
    IN p_id_cliente INT,
    IN p_fecha_orden DATE,
    IN p_estado_orden BOOLEAN
)
BEGIN
    INSERT INTO ordenes (id_Cliente, Fecha_Orden, Estado_Orden)
    VALUES (p_id_cliente, p_fecha_orden, p_estado_orden);
END //

DELIMITER ;
-- insertar categoria --
DELIMITER //

CREATE PROCEDURE InsertarCategoria(
    IN p_nombre_categoria VARCHAR(50)
)
BEGIN
    INSERT INTO categorias (Nombre_Categoria)
    VALUES (p_nombre_categoria);
END //

DELIMITER ;
-- insertar sub categoria--
DELIMITER //

CREATE PROCEDURE InsertarSubCategoria(
    IN p_nombre_subcategoria VARCHAR(50),
    IN p_id_categoria INT
)
BEGIN
    INSERT INTO sub_categorias (nombre, id_Categoria)
    VALUES (p_nombre_subcategoria, p_id_categoria);
END //

DELIMITER ;
-- insertar marca --
DELIMITER //

CREATE PROCEDURE InsertarMarca(
    IN p_nombre_marca VARCHAR(50),
    IN p_logo_marca VARCHAR(100)
)
BEGIN
    INSERT INTO marcas (Nombre_Marca, Logo_Marca)
    VALUES (p_nombre_marca, p_logo_marca);
END //


DELIMITER ;

-- insertar producto--
DELIMITER //

CREATE PROCEDURE InsertarProducto(
    IN p_nombre_producto VARCHAR(100),
    IN p_descripcion_producto VARCHAR(100),
    IN p_precio_producto DOUBLE,
    IN p_imagen_principal VARCHAR(100),
    IN p_cantidad INT,
    IN p_id_subcategoria INT,
    IN p_descuento INT,
    IN p_id_marca INT
)
BEGIN
    INSERT INTO productos (Nombre_Producto, descripcion_producto, precio_producto, imagen_principal, CantidadP, id_subcategoria, descuento, id_Marca)
    VALUES (p_nombre_producto, p_descripcion_producto, p_precio_producto, p_imagen_principal, p_cantidad, p_id_subcategoria, p_descuento, p_id_marca);
END //

DELIMITER ;*/


INSERT INTO clientes (nombre_cliente, apellido_cliente, nombre_perfil, clave, CorreoE, Direccion)
VALUES ('Nombre1', 'Apellido1', 'Perfil1', '$2y$10$HLNvFDTxzgbqdoLBMSQOMOglgewxVe2.Uvw7pe37qKQ/N.6JwDUPu', 'correo1@example.com', 'Dirección1');

INSERT INTO clientes (nombre_cliente, apellido_cliente, nombre_perfil, clave, CorreoE, Direccion)
VALUES ('Nombre2', 'Apellido2', 'Perfil2', '$2y$10$HLNvFDTxzgbqdoLBMSQOMOglgewxVe2.Uvw7pe37qKQ/N.6JwDUPu', 'correo2@example.com', 'Dirección2');

INSERT INTO clientes (nombre_cliente, apellido_cliente, nombre_perfil, clave, CorreoE, Direccion)
VALUES ('Nombre3', 'Apellido3', 'Perfil3', '$2y$10$HLNvFDTxzgbqdoLBMSQOMOglgewxVe2.Uvw7pe37qKQ/N.6JwDUPu', 'correo3@example.com', 'Dirección3');

INSERT INTO usuarios (nombre_usuario, clave, correo)
VALUES ('Usuario1', '$2y$10$HLNvFDTxzgbqdoLBMSQOMOglgewxVe2.Uvw7pe37qKQ/N.6JwDUPu', 'correo1@example.com');

INSERT INTO usuarios (nombre_usuario, clave, correo)
VALUES ('Usuario2', '$2y$10$HLNvFDTxzgbqdoLBMSQOMOglgewxVe2.Uvw7pe37qKQ/N.6JwDUPu', 'correo2@example.com');

INSERT INTO usuarios (nombre_usuario, clave, correo)
VALUES ('Usuario3', '$2y$10$HLNvFDTxzgbqdoLBMSQOMOglgewxVe2.Uvw7pe37qKQ/N.6JwDUPu', 'correo2@example.com');

INSERT INTO ordenes (id_Cliente, Fecha_Orden, Estado_Orden)
VALUES (1, '2024-05-15', 1);

INSERT INTO ordenes (id_Cliente, Fecha_Orden, Estado_Orden)
VALUES (2, '2024-05-14', 0);

INSERT INTO ordenes (id_Cliente, Fecha_Orden, Estado_Orden)
VALUES (3, '2024-05-13', 1);

INSERT INTO categorias (Nombre_Categoria)
VALUES ('Categoría1');

INSERT INTO categorias (Nombre_Categoria)
VALUES ('Categoría2');

INSERT INTO categorias (Nombre_Categoria)
VALUES ('Categoría3');

INSERT INTO sub_categorias (nombre, id_Categoria)
VALUES ('Subcategoría1', 1);

INSERT INTO sub_categorias (nombre, id_Categoria)
VALUES ('Subcategoría2', 2);

INSERT INTO sub_categorias (nombre, id_Categoria)
VALUES ('Subcategoría3', 3);

INSERT INTO marcas (Nombre_Marca, Logo_Marca)
VALUES ('Marca1', 'Logo1');

INSERT INTO marcas (Nombre_Marca, Logo_Marca)
VALUES ('Marca2', 'Logo2');

INSERT INTO marcas (Nombre_Marca, Logo_Marca)
VALUES ('Marca3', 'Logo3');


INSERT INTO productos (Nombre_Producto, descripcion_producto, precio_producto, imagen_principal, CantidadP, id_subcategoria, descuento, id_Marca)
VALUES ('Espuma Limpiadora', 'Limpia profundamente los poros mientras elimina las impurezas.', 15.99, 'EspumaLimpiadora.jpg', 100, 1, 0, 1);

INSERT INTO productos (Nombre_Producto, descripcion_producto, precio_producto, imagen_principal, CantidadP, id_subcategoria, descuento, id_Marca)
VALUES ('Serum Hidratante', 'Hidrata y nutre la piel, dejándola suave y radiante.', 25.50, 'SerumHidratante.jpg', 100, 2, 0, 2);

INSERT INTO productos (Nombre_Producto, descripcion_producto, precio_producto, imagen_principal, CantidadP, id_subcategoria, descuento, id_Marca)
VALUES ('Exfoliante Facial', 'Elimina las células muertas de la piel para revelar una tez más brillante.', 18.75, 'ExfolianteFacial.jpg', 100, 3, 0, 3);

INSERT INTO productos (Nombre_Producto, descripcion_producto, precio_producto, imagen_principal, CantidadP, id_subcategoria, descuento, id_Marca)
VALUES ('Crema Hidratante', 'Hidratación intensiva para una piel suave y flexible durante todo el día.', 20.99, 'CremaHidratante.jpg', 100, 1, 0, 1);

INSERT INTO productos (Nombre_Producto, descripcion_producto, precio_producto, imagen_principal, CantidadP, id_subcategoria, descuento, id_Marca)
VALUES ('Serum Anti-Edad', 'Reduce visiblemente las arrugas y líneas finas para una apariencia más joven.', 30.25, 'SerumAntiEdad.jpg', 100, 2, 0, 2);

INSERT INTO productos (Nombre_Producto, descripcion_producto, precio_producto, imagen_principal, CantidadP, id_subcategoria, descuento, id_Marca)
VALUES ('Mascarilla Iluminadora', 'Revitaliza la piel opaca y fatigada para un brillo radiante.', 12.99, 'MascarillaIluminadora.jpg', 100, 3, 0, 3);

INSERT INTO productos (Nombre_Producto, descripcion_producto, precio_producto, imagen_principal, CantidadP, id_subcategoria, descuento, id_Marca)
VALUES ('Protector Solar FPS 50', 'Protege la piel de los daños causados por el sol y los rayos UV.', 14.50, 'ProtectorSolarFPS50.jpg', 100, 1, 0, 1);

INSERT INTO productos (Nombre_Producto, descripcion_producto, precio_producto, imagen_principal, CantidadP, id_subcategoria, descuento, id_Marca)
VALUES ('Aceite Limpiador', 'Elimina eficazmente el maquillaje y las impurezas sin resecar la piel.', 22.75, 'AceiteLimpiador.jpg', 100, 2, 0, 2);

INSERT INTO productos (Nombre_Producto, descripcion_producto, precio_producto, imagen_principal, CantidadP, id_subcategoria, descuento, id_Marca)
VALUES ('Loción Tonificante', 'Tonifica y equilibra la piel, dejándola fresca y revitalizada.', 17.99, 'LociónTonificante.jpg', 100, 3, 0, 3);

INSERT INTO productos (Nombre_Producto, descripcion_producto, precio_producto, imagen_principal, CantidadP, id_subcategoria, descuento, id_Marca)
VALUES ('Crema para Ojos', 'Reduce la hinchazón y las ojeras, iluminando el área de los ojos.', 28.50, 'CremaParaOjos.jpg', 100, 1, 0, 1);

INSERT INTO productos (Nombre_Producto, descripcion_producto, precio_producto, imagen_principal, CantidadP, id_subcategoria, descuento, id_Marca)
VALUES ('Gel Tratamiento de Manchas', 'Trata y previene eficazmente el acné y las imperfecciones.', 19.75, 'GelTratamientoDeManchas.jpg', 100, 2, 0, 2);

INSERT INTO productos (Nombre_Producto, descripcion_producto, precio_producto, imagen_principal, CantidadP, id_subcategoria, descuento, id_Marca)
VALUES ('Aceite Facial', 'Hidrata y suaviza la piel seca y deshidratada.', 24.99, 'AceiteFacial.jpg', 100, 3, 0, 3);

INSERT INTO productos (Nombre_Producto, descripcion_producto, precio_producto, imagen_principal, CantidadP, id_subcategoria, descuento, id_Marca)
VALUES ('Minimizador de Poros', 'Reduce la apariencia de los poros dilatados para una piel más suave.', 16.50, 'MinimizadorDePoros.jpg', 100, 1, 0, 1);


INSERT INTO detalleOrdenes (id_orden, id_producto, cantidad, precio_unitario)
VALUES (1, 1, 1, 2.50);

INSERT INTO valoraciones (Valoracion , id_detalle, comentario, fecha_comentario, estado_comentario)
VALUES (1, 1, '¡Muy buen producto! Estoy satisfecho con mi compra.', '2024-03-11', 1);

INSERT INTO valoraciones (Valoracion , id_detalle, comentario, fecha_comentario, estado_comentario)
VALUES (1, 1, '¡Muy buen producto! Estoy satisfecho con mi compra.', '2024-03-11', 1);

INSERT INTO valoraciones (Valoracion , id_detalle, comentario, fecha_comentario, estado_comentario )
VALUES (2, 1, 'El producto no cumplió mis expectativas, estoy algo decepcionado.', '2024-03-11', 1);

INSERT INTO valoraciones (Valoracion , id_detalle, comentario, fecha_comentario, estado_comentario )
VALUES (3, 1, '¡Excelente producto! Lo recomendaría sin dudarlo.', '2024-03-11', 1);

INSERT INTO valoraciones (Valoracion , id_detalle, comentario, fecha_comentario, estado_comentario )
VALUES (3, 1, '¡Excelente producto! Lo recomendaría sin dudarlo.', '2024-03-11', 1);




