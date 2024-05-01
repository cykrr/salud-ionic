CREATE DATABASE app_saludable;

USE app_saludable;


CREATE TABLE usuarios (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    rut VARCHAR(10) NOT NULL,
    region INT NOT NULL,
    comuna INT NOT NULL,
    sexo INT NOT NULL,
    correo VARCHAR(50) NOT NULL,
    clave VARCHAR(30) NOT NULL
);

CREATE TABLE alimentos (
    idAlimento INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT,
    nombre VARCHAR(50) NOT NULL,
    calorias INT NOT NULL,
    unidad INT NOT NULL
);

CREATE TABLE ejercicios (
    idEjercicio INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    calorias INT NOT NULL    
);

CREATE TABLE alimentosUsuario (
    idAlimento INT,
    idUsuario INT,
    cantidad INT NOT NULL,
    fecha DATE NOT NULL,
    PRIMARY KEY (idAlimento, idUsuario),
    FOREIGN KEY (idAlimento) REFERENCES alimentos(idAlimento),
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario)
);

CREATE TABLE ejerciciosUsuario (
    idEjercicio INT,
    idUsuario INT,
    minutos INT NOT NULL,
    fecha DATE NOT NULL,
    PRIMARY KEY (idEjercicio, idUsuario),
    FOREIGN KEY (idEjercicio) REFERENCES ejercicios(idEjercicio),
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario)
);