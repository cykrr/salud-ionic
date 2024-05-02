DROP DATABASE app_saludable;

CREATE DATABASE IF NOT EXISTS app_saludable;

USE app_saludable;


CREATE TABLE IF NOT EXISTS usuarios (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    rut VARCHAR(10) NOT NULL,
    region INT NOT NULL,
    comuna INT NOT NULL,
    sexo INT NOT NULL,
    correo VARCHAR(50) NOT NULL,
    clave VARCHAR(30) NOT NULL
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
    (idUsuario, nombre, rut, region, comuna, sexo, correo, clave)
VALUES
    (1, 'Pepito', '12345678-9', 5, 10, 0, 'pepito123@mail.pucv.cl', 'clave123'),
    (2, 'Juanito', '77777777-7', 8, 6, 0, 'juanito456@gmail.com', 'holamundo'),
    (3, 'Alicia', '10101011-4', 11, 2, 1, 'alicia789@gmail.com', 'password');

INSERT IGNORE INTO alimentosUsuario
    (id, idAlimento, idUsuario, cantidad, fecha)
VALUES
    (1, 5, 1, 150, '2024-05-01'),
    (2, 28, 1, 200, '2024-05-01'),
    (3, 18, 1, 150, '2024-05-02'),
    (4, 12, 2, 200, '2024-05-01'),
    (5, 13, 2, 100, '2024-05-01');

INSERT IGNORE INTO ejerciciosUsuario
    (id, idEjercicio, idUsuario, minutos, fecha)
VALUES
    (1, 8, 1, 60, '2024-05-01'),
    (2, 12, 2, 30, '2024-05-01'),
    (3, 14, 2, 30, '2024-05-02'),
    (4, 7, 3, 20, '2024-05-01'),
    (5, 22, 3, 45, '2024-05-03');