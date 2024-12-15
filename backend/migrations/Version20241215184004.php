<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241215184004 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE creneau (id INT AUTO_INCREMENT NOT NULL, heure_debut TIME DEFAULT NULL, heure_fin TIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE enseignant (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) DEFAULT NULL, prenom VARCHAR(255) DEFAULT NULL, email VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE matiere (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE promotion (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE reservation (id INT AUTO_INCREMENT NOT NULL, creneau_id INT DEFAULT NULL, enseignant_id INT DEFAULT NULL, matiere_id INT DEFAULT NULL, promotion_id INT DEFAULT NULL, salle_id INT DEFAULT NULL, INDEX IDX_42C849557D0729A9 (creneau_id), INDEX IDX_42C84955E455FCC0 (enseignant_id), INDEX IDX_42C84955F46CD258 (matiere_id), INDEX IDX_42C84955139DF194 (promotion_id), INDEX IDX_42C84955DC304035 (salle_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE salle (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) DEFAULT NULL, capacite INT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C849557D0729A9 FOREIGN KEY (creneau_id) REFERENCES creneau (id)');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955E455FCC0 FOREIGN KEY (enseignant_id) REFERENCES enseignant (id)');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955F46CD258 FOREIGN KEY (matiere_id) REFERENCES matiere (id)');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955139DF194 FOREIGN KEY (promotion_id) REFERENCES promotion (id)');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955DC304035 FOREIGN KEY (salle_id) REFERENCES salle (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C849557D0729A9');
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C84955E455FCC0');
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C84955F46CD258');
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C84955139DF194');
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C84955DC304035');
        $this->addSql('DROP TABLE creneau');
        $this->addSql('DROP TABLE enseignant');
        $this->addSql('DROP TABLE matiere');
        $this->addSql('DROP TABLE promotion');
        $this->addSql('DROP TABLE reservation');
        $this->addSql('DROP TABLE salle');
    }
}
