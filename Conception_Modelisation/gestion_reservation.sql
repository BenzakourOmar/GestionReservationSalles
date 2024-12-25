-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 19 déc. 2024 à 14:47
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestion_reservation`
--

-- --------------------------------------------------------

--
-- Structure de la table `creneau`
--

CREATE TABLE `creneau` (
  `id` int(11) NOT NULL,
  `heure_debut` time NOT NULL,
  `heure_fin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `creneau`
--

INSERT INTO `creneau` (`id`, `heure_debut`, `heure_fin`) VALUES
(1, '08:00:00', '10:00:00'),
(2, '10:00:00', '12:00:00'),
(3, '13:00:00', '15:00:00'),
(4, '09:00:00', '11:00:00'),
(6, '19:00:00', '21:00:00'),
(7, '21:00:00', '23:00:00'),
(8, '23:00:00', '01:00:00'),
(9, '18:00:00', '20:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20241207150835', '2024-12-07 16:08:43', 466),
('DoctrineMigrations\\Version20241207151325', '2024-12-07 16:13:32', 214);

-- --------------------------------------------------------

--
-- Structure de la table `enseignant`
--

CREATE TABLE `enseignant` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `enseignant`
--

INSERT INTO `enseignant` (`id`, `nom`, `prenom`, `email`) VALUES
(1, 'Dupont', 'Jean', 'jean.dupont@example.com'),
(2, 'Martin', 'Sophie', 'sophie.martin@example.com'),
(3, 'Durand', 'Paul', 'paul.durand@example.com'),
(4, 'Lemoine', 'Claire', 'claire.lemoine@example.com'),
(5, 'Bernard', 'Luc', 'luc.bernard@example.com'),
(6, 'Petit', 'Marie', 'marie.petit@example.com'),
(7, 'Morel', 'Antoine', 'antoine.morel@example.com'),
(8, 'Girard', 'Julie', 'julie.girard@example.com');

-- --------------------------------------------------------

--
-- Structure de la table `matiere`
--

CREATE TABLE `matiere` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `matiere`
--

INSERT INTO `matiere` (`id`, `nom`) VALUES
(1, 'ARCHI'),
(2, 'XML'),
(3, 'PHP'),
(4, 'DATA VIZ'),
(5, 'POWER BI'),
(6, 'GEOMARKETING'),
(7, 'GESTION DE PROJET'),
(8, 'CRM');

-- --------------------------------------------------------

--
-- Structure de la table `promotion`
--

CREATE TABLE `promotion` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `promotion`
--

INSERT INTO `promotion` (`id`, `nom`) VALUES
(1, 'Promo 2023'),
(2, 'Promo 2024'),
(3, 'Promo 2025');

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `promotion_id` int(11) DEFAULT NULL,
  `matiere_id` int(11) DEFAULT NULL,
  `enseignant_id` int(11) DEFAULT NULL,
  `salle_id` int(11) DEFAULT NULL,
  `creneau_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`id`, `date`, `promotion_id`, `matiere_id`, `enseignant_id`, `salle_id`, `creneau_id`) VALUES
(1, '2024-12-15', 1, 1, 3, 2, 2),
(21, '2024-12-10', 3, 3, 3, 3, 3),
(24, '2024-12-13', 1, 4, 4, 5, 4),
(25, '2024-12-14', 2, 5, 5, 6, 9),
(26, '2024-12-15', 3, 6, 6, 7, 6),
(101, '2024-12-10', 1, 1, 1, 3, 1),
(102, '2024-12-10', 2, 2, 2, 3, 2),
(103, '2024-12-11', 3, 3, 3, 3, 3),
(104, '2024-12-12', 1, 4, 4, 3, 4),
(105, '2024-12-13', 2, 5, 5, 3, 2),
(106, '2024-12-14', 3, 6, 6, 3, 6),
(107, '2024-12-15', 1, 1, 7, 3, 7),
(108, '2024-12-16', 2, 2, 8, 3, 8),
(109, '2024-12-17', 3, 3, 1, 3, 9),
(110, '2024-12-18', 1, 4, 2, 3, 1),
(111, '2024-12-19', 2, 5, 3, 3, 2),
(112, '2024-12-20', 3, 6, 4, 3, 3),
(113, '2024-12-21', 1, 1, 5, 3, 4),
(114, '2024-12-22', 2, 2, 6, 3, 1);

-- --------------------------------------------------------

--
-- Structure de la table `salle`
--

CREATE TABLE `salle` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `capacite` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `salle`
--

INSERT INTO `salle` (`id`, `nom`, `capacite`) VALUES
(2, 'Salle E', 50),
(3, 'Salle C', 20),
(4, 'Salle D', 40),
(5, 'Amphithéâtre 1', 200),
(6, 'Salle Informatique', 25),
(7, 'Salle Polyvalente', 100),
(10, 'Eiffel', 20),
(11, 'Talend', 50);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `creneau`
--
ALTER TABLE `creneau`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `enseignant`
--
ALTER TABLE `enseignant`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `matiere`
--
ALTER TABLE `matiere`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_42C84955139DF194` (`promotion_id`),
  ADD KEY `IDX_42C84955F46CD258` (`matiere_id`),
  ADD KEY `IDX_42C84955E455FCC0` (`enseignant_id`),
  ADD KEY `IDX_42C84955DC304035` (`salle_id`),
  ADD KEY `IDX_42C849557D0729A9` (`creneau_id`);

--
-- Index pour la table `salle`
--
ALTER TABLE `salle`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `creneau`
--
ALTER TABLE `creneau`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `enseignant`
--
ALTER TABLE `enseignant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `matiere`
--
ALTER TABLE `matiere`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `promotion`
--
ALTER TABLE `promotion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT pour la table `salle`
--
ALTER TABLE `salle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `FK_42C84955139DF194` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`id`),
  ADD CONSTRAINT `FK_42C849557D0729A9` FOREIGN KEY (`creneau_id`) REFERENCES `creneau` (`id`),
  ADD CONSTRAINT `FK_42C84955DC304035` FOREIGN KEY (`salle_id`) REFERENCES `salle` (`id`),
  ADD CONSTRAINT `FK_42C84955E455FCC0` FOREIGN KEY (`enseignant_id`) REFERENCES `enseignant` (`id`),
  ADD CONSTRAINT `FK_42C84955F46CD258` FOREIGN KEY (`matiere_id`) REFERENCES `matiere` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
