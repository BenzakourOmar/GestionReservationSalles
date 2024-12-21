<?php

namespace App\Controller;

use App\Entity\Reservation;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/reservations')]
class ReservationController extends AbstractController
{
    #[Route('', name: 'api_reservations_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $reservations = $entityManager->getRepository(Reservation::class)->findAll();

        if (!$reservations) {
            return $this->json(['message' => 'Aucune réservation trouvée.'], 404);
        }

        $data = [];
        foreach ($reservations as $reservation) {
            $data[] = [
                'id' => $reservation->getId(),
                'salle' => $reservation->getSalle()->getNom(),
                'creneau' => [
                    'debut' => $reservation->getCreneau()->getHeureDebut()->format('H:i'),
                    'fin' => $reservation->getCreneau()->getHeureFin()->format('H:i'),
                ],
                'date' => $reservation->getDate()->format('Y-m-d'),
                'promotion' => $reservation->getPromotion()->getNom(),
                'enseignant' => $reservation->getEnseignant()->getNom(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/new', name: 'api_reservations_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $content = json_decode($request->getContent(), true);

        if (!isset($content['salle'], $content['creneau'], $content['date'], $content['promotion'], $content['enseignant'])) {
            return $this->json(['error' => 'Tous les champs sont obligatoires (salle, créneau, date, promotion, enseignant).'], 400);
        }

        // Vérification des conflits
        $existingReservation = $entityManager->getRepository(Reservation::class)->findOneBy([
            'salle' => $content['salle'],
            'creneau' => $content['creneau'],
            'date' => new \DateTime($content['date']),
        ]);

        if ($existingReservation) {
            return $this->json(['error' => 'Cette salle est déjà réservée pour ce créneau à cette date.'], 400);
        }

        $reservation = new Reservation();
        $reservation->setSalle($entityManager->getReference('App\Entity\Salle', $content['salle']));
        $reservation->setCreneau($entityManager->getReference('App\Entity\Creneau', $content['creneau']));
        $reservation->setDate(new \DateTime($content['date']));
        $reservation->setPromotion($entityManager->getReference('App\Entity\Promotion', $content['promotion']));
        $reservation->setEnseignant($entityManager->getReference('App\Entity\Enseignant', $content['enseignant']));

        $entityManager->persist($reservation);
        $entityManager->flush();

        return $this->json([
            'message' => 'Réservation créée avec succès.',
            'reservation' => [
                'id' => $reservation->getId(),
                'salle' => $reservation->getSalle()->getNom(),
                'creneau' => [
                    'debut' => $reservation->getCreneau()->getHeureDebut()->format('H:i'),
                    'fin' => $reservation->getCreneau()->getHeureFin()->format('H:i'),
                ],
                'date' => $reservation->getDate()->format('Y-m-d'),
                'promotion' => $reservation->getPromotion()->getNom(),
                'enseignant' => $reservation->getEnseignant()->getNom(),
            ],
        ], 201);
    }

    #[Route('/{id}', name: 'api_reservations_show', methods: ['GET'])]
    public function show(Reservation $reservation): JsonResponse
    {
        return $this->json([
            'id' => $reservation->getId(),
            'salle' => $reservation->getSalle()->getNom(),
            'creneau' => [
                'debut' => $reservation->getCreneau()->getHeureDebut()->format('H:i'),
                'fin' => $reservation->getCreneau()->getHeureFin()->format('H:i'),
            ],
            'date' => $reservation->getDate()->format('Y-m-d'),
            'promotion' => $reservation->getPromotion()->getNom(),
            'enseignant' => $reservation->getEnseignant()->getNom(),
        ]);
    }

    #[Route('/{id}', name: 'api_reservations_edit', methods: ['PUT'])]
    public function edit(Request $request, Reservation $reservation, EntityManagerInterface $entityManager): JsonResponse
    {
        $content = json_decode($request->getContent(), true);

        if (isset($content['salle'])) {
            $reservation->setSalle($entityManager->getReference('App\Entity\Salle', $content['salle']));
        }
        if (isset($content['creneau'])) {
            $reservation->setCreneau($entityManager->getReference('App\Entity\Creneau', $content['creneau']));
        }
        if (isset($content['date'])) {
            $reservation->setDate(new \DateTime($content['date']));
        }
        if (isset($content['promotion'])) {
            $reservation->setPromotion($entityManager->getReference('App\Entity\Promotion', $content['promotion']));
        }
        if (isset($content['enseignant'])) {
            $reservation->setEnseignant($entityManager->getReference('App\Entity\Enseignant', $content['enseignant']));
        }

        $entityManager->flush();

        return $this->json([
            'message' => 'Réservation mise à jour avec succès.',
            'reservation' => [
                'id' => $reservation->getId(),
                'salle' => $reservation->getSalle()->getNom(),
                'creneau' => [
                    'debut' => $reservation->getCreneau()->getHeureDebut()->format('H:i'),
                    'fin' => $reservation->getCreneau()->getHeureFin()->format('H:i'),
                ],
                'date' => $reservation->getDate()->format('Y-m-d'),
                'promotion' => $reservation->getPromotion()->getNom(),
                'enseignant' => $reservation->getEnseignant()->getNom(),
            ],
        ]);
    }

    #[Route('/{id}', name: 'api_reservations_delete', methods: ['DELETE'])]
    public function delete(Reservation $reservation, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($reservation);
        $entityManager->flush();

        return $this->json(['message' => 'Réservation supprimée avec succès.']);
    }

    #[Route('/salle/{id}', name: 'api_reservations_by_salle', methods: ['GET'])]
    public function getReservationsBySalle(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $reservations = $entityManager->getRepository(Reservation::class)->findBy(['salle' => $id]);

        if (!$reservations) {
            return $this->json(['message' => 'Aucune réservation trouvée pour cette salle.'], 404);
        }

        $data = array_map(function (Reservation $reservation) {
            return [
                'id' => $reservation->getId(),
                'creneau' => [
                    'debut' => $reservation->getCreneau()->getHeureDebut()->format('H:i'),
                    'fin' => $reservation->getCreneau()->getHeureFin()->format('H:i'),
                ],
                'date' => $reservation->getDate()->format('Y-m-d'),
                'promotion' => $reservation->getPromotion()->getNom(),
                'enseignant' => $reservation->getEnseignant()->getNom(),
            ];
        }, $reservations);

        return $this->json($data);
    }

    #[Route('/promotion/{id}', name: 'api_reservations_by_promotion', methods: ['GET'])]
    public function getReservationsByPromotion(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $reservations = $entityManager->getRepository(Reservation::class)->findBy(['promotion' => $id]);

        if (!$reservations) {
            return $this->json(['message' => 'Aucune réservation trouvée pour cette promotion.'], 404);
        }

        $data = array_map(function (Reservation $reservation) {
            return [
                'id' => $reservation->getId(),
                'creneau' => [
                    'debut' => $reservation->getCreneau()->getHeureDebut()->format('H:i'),
                    'fin' => $reservation->getCreneau()->getHeureFin()->format('H:i'),
                ],
                'date' => $reservation->getDate()->format('Y-m-d'),
                'salle' => $reservation->getSalle()->getNom(),
                'enseignant' => $reservation->getEnseignant()->getNom(),
            ];
        }, $reservations);

        return $this->json($data);
    }


}
