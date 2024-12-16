<?php

namespace App\Controller;

use App\Entity\Salle;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/salles')]
class SalleController extends AbstractController
{
    #[Route('', name: 'api_salles_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $salles = $entityManager->getRepository(Salle::class)->findAll();

        if (!$salles) {
            return $this->json(['message' => 'Aucune salle trouvée.'], 404);
        }

        $data = [];
        foreach ($salles as $salle) {
            $data[] = [
                'id' => $salle->getId(),
                'nom' => $salle->getNom(),
                'capacite' => $salle->getCapacite(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/new', name: 'api_salles_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $content = json_decode($request->getContent(), true);

        if (!isset($content['nom']) || !isset($content['capacite'])) {
            return $this->json(['error' => 'Nom et capacité sont obligatoires'], 400);
        }

        if (!is_numeric($content['capacite']) || $content['capacite'] <= 0) {
            return $this->json(['error' => 'La capacité doit être un nombre positif.'], 400);
        }

        $salle = new Salle();
        $salle->setNom($content['nom']);
        $salle->setCapacite($content['capacite']);

        $entityManager->persist($salle);
        $entityManager->flush();

        return $this->json([
            'message' => 'Salle créée avec succès',
            'salle' => [
                'id' => $salle->getId(),
                'nom' => $salle->getNom(),
                'capacite' => $salle->getCapacite(),
            ],
        ], 201);
    }

    #[Route('/{id}', name: 'api_salles_show', methods: ['GET'])]
    public function show(Salle $salle): JsonResponse
    {
        return $this->json([
            'id' => $salle->getId(),
            'nom' => $salle->getNom(),
            'capacite' => $salle->getCapacite(),
        ]);
    }

    #[Route('/{id}', name: 'api_salles_edit', methods: ['PUT'])]
    public function edit(Request $request, Salle $salle, EntityManagerInterface $entityManager): JsonResponse
    {
        $content = json_decode($request->getContent(), true);

        if (isset($content['nom']) && !empty($content['nom'])) {
            $salle->setNom($content['nom']);
        }

        if (isset($content['capacite'])) {
            if (!is_numeric($content['capacite']) || $content['capacite'] <= 0) {
                return $this->json(['error' => 'La capacité doit être un nombre positif.'], 400);
            }
            $salle->setCapacite($content['capacite']);
        }

        $entityManager->flush();

        return $this->json([
            'message' => 'Salle mise à jour avec succès',
            'salle' => [
                'id' => $salle->getId(),
                'nom' => $salle->getNom(),
                'capacite' => $salle->getCapacite(),
            ],
        ]);
    }

    #[Route('/{id}', name: 'api_salles_delete', methods: ['DELETE'])]
    public function delete(Salle $salle, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($salle);
        $entityManager->flush();

        return $this->json(['message' => 'Salle supprimée avec succès']);
    }
}
