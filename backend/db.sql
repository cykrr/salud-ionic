DROP DATABASE IF EXISTS app_saludable;

CREATE DATABASE IF NOT EXISTS app_saludable;

USE app_saludable;


CREATE TABLE IF NOT EXISTS usuarios (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    rut VARCHAR(10) NOT NULL,
    region INT NOT NULL,
    comuna INT NOT NULL,
    sexo INT NOT NULL,
    edad INT NOT NULL,
    correo VARCHAR(50) NOT NULL,
    clave VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS alimentos (
    idAlimento INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT,
    nombre VARCHAR(50) NOT NULL,
    calorias INT NOT NULL,
    unidad INT NOT NULL
);

CREATE TABLE IF NOT EXISTS ejercicios (
    idEjercicio INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    calorias INT NOT NULL    
);

CREATE TABLE IF NOT EXISTS alimentosUsuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idAlimento INT,
    idUsuario INT,
    cantidad INT NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (idAlimento) REFERENCES alimentos(idAlimento),
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario)
);

CREATE TABLE IF NOT EXISTS ejerciciosUsuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idEjercicio INT,
    idUsuario INT,
    minutos INT NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (idEjercicio) REFERENCES ejercicios(idEjercicio),
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario)
);


INSERT IGNORE INTO alimentos
    (idAlimento, nombre, calorias, unidad)
VALUES
    (1, 'Arroz', 130, 0),
    (2, 'Fideos', 370, 0),
    (3, 'Pan', 265, 0),
    (4, 'Carne de vacuno magra', 250, 0),
    (5, 'Pollo', 110, 0),
    (6, 'Pescado (Merluza)', 75, 0),
    (7, 'Huevo', 155, 0),
    (8, 'Leche', 65, 1),
    (9, 'Queso', 400, 0),
    (10, 'Yogur', 60, 1),
    (11, 'Palta', 160, 0),
    (12, 'Tomate', 20, 0),
    (13, 'Papa', 80, 0),
    (14, 'Zanahoria', 41, 0),
    (15, 'Cebolla', 40, 0),
    (16, 'Pimiento', 20, 0),
    (17, 'Plátano', 90, 0),
    (18, 'Manzana', 52, 0),
    (19, 'Naranja', 43, 0),
    (20, 'Mandarina', 53, 0),
    (21, 'Pera', 58, 0),
    (22, 'Frutilla', 32, 0),
    (23, 'Arándanos', 57, 0),
    (24, 'Piña', 50, 0),
    (25, 'Uva', 67, 0),
    (26, 'Cerveza', 45, 1),
    (27, 'Vino tinto', 85, 1),
    (28, 'Vino blanco', 85, 1),
    (29, 'Agua mineral', 0, 1),
    (30, 'Lentejas', 116, 0);

INSERT IGNORE INTO ejercicios
    (idEjercicio, nombre, calorias)
VALUES
    (1, 'Correr', 300),
    (2, 'Nadar', 250),
    (3, 'Ciclismo', 200),
    (4, 'Saltar la cuerda', 330),
    (5, 'Caminar', 150),
    (6, 'Aeróbicos', 250),
    (7, 'Yoga', 120),
    (8, 'Pesas', 130),
    (9, 'Futbol', 280),
    (10, 'Bailar', 200),
    (11, 'Flexiones', 200),
    (12, 'Abdominales', 150),
    (13, 'Sentadillas', 200),
    (14, 'Pilates', 150),
    (15, 'Estiramientos', 100),
    (16, 'Burpees', 250),
    (17, 'Escaleras', 250),
    (18, 'Spinning', 350),
    (19, 'Zumba', 300),
    (20, 'Taekwondo', 300),
    (21, 'Boxeo', 400),
    (22, 'Kickboxing', 350),
    (23, 'CrossFit', 400),
    (24, 'Escalada', 380),
    (25, 'Remo', 280),
    (26, 'Paddle surf', 200),
    (27, 'Patinaje hielo', 250),
    (28, 'Patinaje línea', 200),
    (29, 'Esquí', 250),
    (30, 'Snowboard', 300);

INSERT IGNORE INTO usuarios
    (idUsuario, nombre, rut, region, comuna, sexo, edad, correo, clave)
VALUES
    (1, 'Pepito', '12345678-9', 5, 10, 0, 18, 'pepito123@mail.pucv.cl', SHA2('clave123', 256)),
    (2, 'Juanito', '77777777-7', 8, 6, 0, 34, 'juanito456@gmail.com', SHA2('holamundo', 256)),
    (3, 'Alicia', '10101011-4', 11, 2, 1, 65, 'alicia789@gmail.com', SHA2('password', 256));

INSERT IGNORE INTO alimentosUsuario
    (id, idAlimento, idUsuario, cantidad, fecha)
VALUES
    (1, 5, 1, 350, CURDATE()),
    (2, 28, 1, 500, CURDATE()),
    (3, 18, 1, 450, CURDATE()),
    (4, 19, 1, 550, DATE_SUB(CURDATE(), INTERVAL 1 DAY)),
    (5, 13, 1, 250, DATE_SUB(CURDATE(), INTERVAL 1 DAY)),
    (6, 22, 1, 750, DATE_SUB(CURDATE(), INTERVAL 2 DAY)),
    (7, 21, 1, 350, DATE_SUB(CURDATE(), INTERVAL 4 DAY)),
    (8, 7, 1, 600, DATE_SUB(CURDATE(), INTERVAL 4 DAY)),
    (9, 9, 1, 700, DATE_SUB(CURDATE(), INTERVAL 5 DAY)),
    (10, 10, 1, 350, DATE_SUB(CURDATE(), INTERVAL 6 DAY)),
    (11, 16, 1, 500, DATE_SUB(CURDATE(), INTERVAL 7 DAY)),
    (12, 21, 1, 100, DATE_SUB(CURDATE(), INTERVAL 7 DAY)),
    (13, 12, 2, 200, CURDATE()),
    (14, 13, 2, 100, CURDATE());

INSERT IGNORE INTO ejerciciosUsuario
    (id, idEjercicio, idUsuario, minutos, fecha)
VALUES
    (1, 4, 1, 30, CURDATE()),
    (2, 20, 1, 15, CURDATE()),
    (3, 13, 1, 20, DATE_SUB(CURDATE(), INTERVAL 1 DAY)),
    (4, 12, 1, 40, DATE_SUB(CURDATE(), INTERVAL 2 DAY)),
    (5, 18, 1, 45, DATE_SUB(CURDATE(), INTERVAL 2 DAY)),
    (6, 20, 1, 30, DATE_SUB(CURDATE(), INTERVAL 4 DAY)),
    (7, 7, 1, 35, DATE_SUB(CURDATE(), INTERVAL 4 DAY)),
    (8, 1, 1, 20, DATE_SUB(CURDATE(), INTERVAL 5 DAY)),
    (9, 23, 1, 15, DATE_SUB(CURDATE(), INTERVAL 6 DAY)),
    (10, 21, 1, 30, DATE_SUB(CURDATE(), INTERVAL 6 DAY)),
    (11, 12, 2, 30, CURDATE()),
    (12, 14, 2, 30, CURDATE()),
    (13, 7, 3, 20, CURDATE()),
    (14, 22, 3, 45, CURDATE());
