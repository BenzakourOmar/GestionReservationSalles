<?php

namespace App\Controller;

use App\Entity\Promotion;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/promotions')]
class PromotionController extends AbstractController
{
    #[Route('', name: 'api_promotions_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $promotions = $entityManager->getRepository(Promotion::class)->findAll();

        if (!$promotions) {
            return $this->json(['message' => 'Aucune promotion trouvée.'], 404);
        }

        $data = [];
        foreach ($promotions as $promotion) {
            $data[] = [
                'id' => $promotion->getId(),
                'nom' => $promotion->getNom(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/new', name: 'api_promotions_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $content = json_decode($request->getContent(), true);

        if (!isset($content['nom'])) {
            return $this->json(['error' => 'Le champ nom est obligatoire.'], 400);
        }

        $promotion = new Promotion();
        $promotion->setNom($content['nom']);

        $entityManager->persist($promotion);
        $entityManager->flush();

        return $this->json([
            'message' => 'Promotion créée avec succès.',
            'promotion' => [
                'id' => $promotion->getId(),
                'nom' => $promotion->getNom(),
            ],
        ], 201);
    }

    #[Route('/{id}', name: 'api_promotions_show', methods: ['GET'])]
    public function show(Promotion $promotion): JsonResponse
    {
        return $this->json([
            'id' => $promotion->getId(),
            'nom' => $promotion->getNom(),
        ]);
    }

    #[Route('/{id}', name: 'api_promotions_edit', methods: ['PUT'])]
    public function edit(Request $request, Promotion $promotion, EntityManagerInterface $entityManager): JsonResponse
    {
        $content = json_decode($request->getContent(), true);

        if (isset($content['nom'])) {
            $promotion->setNom($content['nom']);
        }

        $entityManager->flush();

        return $this->json([
            'message' => 'Promotion mise à jour avec succès.',
            'promotion' => [
                'id' => $promotion->getId(),
                'nom' => $promotion->getNom(),
            ],
        ]);
    }

    #[Route('/{id}', name: 'api_promotions_delete', methods: ['DELETE'])]
    public function delete(Promotion $promotion, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($promotion);
        $entityManager->flush();

        return $this->json(['message' => 'Promotion supprimée avec succès.']);
    }
}
