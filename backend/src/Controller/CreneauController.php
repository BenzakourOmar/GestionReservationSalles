<?php

namespace App\Controller;

use App\Entity\Creneau;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/creneaux')]
class CreneauController extends AbstractController
{
    #[Route('', name: 'api_creneaux_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $creneaux = $entityManager->getRepository(Creneau::class)->findAll();

        if (!$creneaux) {
            return $this->json(['message' => 'Aucun créneau trouvé.'], 404);
        }

        $data = [];
        foreach ($creneaux as $creneau) {
            $data[] = [
                'id' => $creneau->getId(),
                'heure_debut' => $creneau->getHeureDebut()->format('H:i:s'),
                'heure_fin' => $creneau->getHeureFin()->format('H:i:s'),
            ];
        }

        return $this->json($data);
    }

    #[Route('/new', name: 'api_creneaux_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $content = json_decode($request->getContent(), true);

        if (!isset($content['heure_debut']) || !isset($content['heure_fin'])) {
            return $this->json(['error' => 'Les champs heure_debut et heure_fin sont obligatoires.'], 400);
        }

        try {
            $heureDebut = new \DateTime($content['heure_debut']);
            $heureFin = new \DateTime($content['heure_fin']);
        } catch (\Exception $e) {
            return $this->json(['error' => 'Format d\'heure invalide. Utilisez HH:mm:ss.'], 400);
        }

        $creneau = new Creneau();
        $creneau->setHeureDebut($heureDebut);
        $creneau->setHeureFin($heureFin);

        $entityManager->persist($creneau);
        $entityManager->flush();

        return $this->json([
            'message' => 'Créneau créé avec succès.',
            'creneau' => [
                'id' => $creneau->getId(),
                'heure_debut' => $creneau->getHeureDebut()->format('H:i:s'),
                'heure_fin' => $creneau->getHeureFin()->format('H:i:s'),
            ],
        ], 201);
    }

    #[Route('/{id}', name: 'api_creneaux_show', methods: ['GET'])]
    public function show(Creneau $creneau): JsonResponse
    {
        return $this->json([
            'id' => $creneau->getId(),
            'heure_debut' => $creneau->getHeureDebut()->format('H:i:s'),
            'heure_fin' => $creneau->getHeureFin()->format('H:i:s'),
        ]);
    }

    #[Route('/{id}', name: 'api_creneaux_edit', methods: ['PUT'])]
    public function edit(Request $request, Creneau $creneau, EntityManagerInterface $entityManager): JsonResponse
    {
        $content = json_decode($request->getContent(), true);

        if (isset($content['heure_debut'])) {
            try {
                $heureDebut = new \DateTime($content['heure_debut']);
                $creneau->setHeureDebut($heureDebut);
            } catch (\Exception $e) {
                return $this->json(['error' => 'Format d\'heure invalide pour heure_debut.'], 400);
            }
        }

        if (isset($content['heure_fin'])) {
            try {
                $heureFin = new \DateTime($content['heure_fin']);
                $creneau->setHeureFin($heureFin);
            } catch (\Exception $e) {
                return $this->json(['error' => 'Format d\'heure invalide pour heure_fin.'], 400);
            }
        }

        $entityManager->flush();

        return $this->json([
            'message' => 'Créneau mis à jour avec succès.',
            'creneau' => [
                'id' => $creneau->getId(),
                'heure_debut' => $creneau->getHeureDebut()->format('H:i:s'),
                'heure_fin' => $creneau->getHeureFin()->format('H:i:s'),
            ],
        ]);
    }

    #[Route('/{id}', name: 'api_creneaux_delete', methods: ['DELETE'])]
    public function delete(Creneau $creneau, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($creneau);
        $entityManager->flush();

        return $this->json(['message' => 'Créneau supprimé avec succès.']);
    }
}
