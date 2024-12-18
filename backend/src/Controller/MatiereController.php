<?php

namespace App\Controller;

use App\Entity\Matiere;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/matieres')]
class MatiereController extends AbstractController
{
    #[Route('', name: 'api_matieres_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $matieres = $entityManager->getRepository(Matiere::class)->findAll();

        if (!$matieres) {
            return $this->json(['message' => 'Aucune matière trouvée.'], 404);
        }

        $data = [];
        foreach ($matieres as $matiere) {
            $data[] = [
                'id' => $matiere->getId(),
                'nom' => $matiere->getNom(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/new', name: 'api_matieres_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $content = json_decode($request->getContent(), true);

        if (!isset($content['nom'])) {
            return $this->json(['error' => 'Le champ nom est obligatoire.'], 400);
        }

        $matiere = new Matiere();
        $matiere->setNom($content['nom']);

        $entityManager->persist($matiere);
        $entityManager->flush();

        return $this->json([
            'message' => 'Matière créée avec succès.',
            'matiere' => [
                'id' => $matiere->getId(),
                'nom' => $matiere->getNom(),
            ],
        ], 201);
    }

    #[Route('/{id}', name: 'api_matieres_show', methods: ['GET'])]
    public function show(Matiere $matiere): JsonResponse
    {
        return $this->json([
            'id' => $matiere->getId(),
            'nom' => $matiere->getNom(),
        ]);
    }

    #[Route('/{id}', name: 'api_matieres_edit', methods: ['PUT'])]
    public function edit(Request $request, Matiere $matiere, EntityManagerInterface $entityManager): JsonResponse
    {
        $content = json_decode($request->getContent(), true);

        if (isset($content['nom'])) {
            $matiere->setNom($content['nom']);
        }

        $entityManager->flush();

        return $this->json([
            'message' => 'Matière mise à jour avec succès.',
            'matiere' => [
                'id' => $matiere->getId(),
                'nom' => $matiere->getNom(),
            ],
        ]);
    }

    #[Route('/{id}', name: 'api_matieres_delete', methods: ['DELETE'])]
    public function delete(Matiere $matiere, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($matiere);
        $entityManager->flush();

        return $this->json(['message' => 'Matière supprimée avec succès.']);
    }
}
