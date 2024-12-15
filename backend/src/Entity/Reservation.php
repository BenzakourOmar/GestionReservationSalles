<?php

namespace App\Entity;

use App\Repository\ReservationRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReservationRepository::class)]
class Reservation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    private ?Creneau $Creneau = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    private ?Enseignant $Enseignant = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    private ?Matiere $Matiere = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    private ?Promotion $Promotion = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    private ?Salle $Salle = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreneau(): ?Creneau
    {
        return $this->Creneau;
    }

    public function setCreneau(?Creneau $Creneau): static
    {
        $this->Creneau = $Creneau;

        return $this;
    }

    public function getEnseignant(): ?Enseignant
    {
        return $this->Enseignant;
    }

    public function setEnseignant(?Enseignant $Enseignant): static
    {
        $this->Enseignant = $Enseignant;

        return $this;
    }

    public function getMatiere(): ?Matiere
    {
        return $this->Matiere;
    }

    public function setMatiere(?Matiere $Matiere): static
    {
        $this->Matiere = $Matiere;

        return $this;
    }

    public function getPromotion(): ?Promotion
    {
        return $this->Promotion;
    }

    public function setPromotion(?Promotion $Promotion): static
    {
        $this->Promotion = $Promotion;

        return $this;
    }

    public function getSalle(): ?Salle
    {
        return $this->Salle;
    }

    public function setSalle(?Salle $Salle): static
    {
        $this->Salle = $Salle;

        return $this;
    }
}
