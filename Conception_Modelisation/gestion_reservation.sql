CREATE DATABASE IF NOT EXISTS gsreservationSalles;
USE gsreservationSalles;

-- Table creneau
CREATE TABLE creneau (
  id INT AUTO_INCREMENT PRIMARY KEY,
  heure_debut TIME NOT NULL,
  heure_fin TIME NOT NULL
);

-- Table enseignant
CREATE TABLE enseignant (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);

-- Table matiere
CREATE TABLE matiere (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL
);

-- Table promotion
CREATE TABLE promotion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL
);

-- Table salle
CREATE TABLE salle (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  capacite INT NOT NULL
);

-- Table reservation
CREATE TABLE reservation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE DEFAULT NULL,
  promotion_id INT,
  matiere_id INT,
  enseignant_id INT,
  salle_id INT,
  creneau_id INT,
  FOREIGN KEY (promotion_id) REFERENCES promotion (id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (matiere_id) REFERENCES matiere (id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (enseignant_id) REFERENCES enseignant (id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (salle_id) REFERENCES salle (id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (creneau_id) REFERENCES creneau (id) ON DELETE SET NULL ON UPDATE CASCADE
);
