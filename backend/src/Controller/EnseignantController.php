<?php

namespace App\Controller;

use App\Entity\Enseignant;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/enseignants')]
class EnseignantController extends AbstractController
{
    #[Route('', name: 'api_enseignants_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $enseignants = $entityManager->getRepository(Enseignant::class)->findAll();

        if (!$enseignants) {
            return $this->json(['message' => 'Aucun enseignant trouvé.'], 404);
        }

        $data = [];
        foreach ($enseignants as $enseignant) {
            $data[] = [
                'id' => $enseignant->getId(),
                'nom' => $enseignant->getNom(),
                'prenom' => $enseignant->getPrenom(),
                'email' => $enseignant->getEmail(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/new', name: 'api_enseignants_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $content = json_decode($request->getContent(), true);

        if (!isset($content['nom']) || !isset($content['prenom']) || !isset($content['email'])) {
            return $this->json(['error' => 'Les champs nom, prenom, et email sont obligatoires.'], 400);
        }

        $enseignant = new Enseignant();
        $enseignant->setNom($content['nom']);
        $enseignant->setPrenom($content['prenom']);
        $enseignant->setEmail($content['email']);

        $entityManager->persist($enseignant);
        $entityManager->flush();

        return $this->json([
            'message' => 'Enseignant créé avec succès.',
            'enseignant' => [
                'id' => $enseignant->getId(),
                'nom' => $enseignant->getNom(),
                'prenom' => $enseignant->getPrenom(),
                'email' => $enseignant->getEmail(),
            ],
        ], 201);
    }

    #[Route('/{id}', name: 'api_enseignants_show', methods: ['GET'])]
    public function show(Enseignant $enseignant): JsonResponse
    {
        return $this->json([
            'id' => $enseignant->getId(),
            'nom' => $enseignant->getNom(),
            'prenom' => $enseignant->getPrenom(),
            'email' => $enseignant->getEmail(),
        ]);
    }

    #[Route('/{id}', name: 'api_enseignants_edit', methods: ['PUT'])]
    public function edit(Request $request, Enseignant $enseignant, EntityManagerInterface $entityManager): JsonResponse
    {
        $content = json_decode($request->getContent(), true);

        if (isset($content['nom'])) {
            $enseignant->setNom($content['nom']);
        }
        if (isset($content['prenom'])) {
            $enseignant->setPrenom($content['prenom']);
        }
        if (isset($content['email'])) {
            $enseignant->setEmail($content['email']);
        }

        $entityManager->flush();

        return $this->json([
            'message' => 'Enseignant mis à jour avec succès.',
            'enseignant' => [
                'id' => $enseignant->getId(),
                'nom' => $enseignant->getNom(),
                'prenom' => $enseignant->getPrenom(),
                'email' => $enseignant->getEmail(),
            ],
        ]);
    }

    #[Route('/{id}', name: 'api_enseignants_delete', methods: ['DELETE'])]
    public function delete(Enseignant $enseignant, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($enseignant);
        $entityManager->flush();

        return $this->json(['message' => 'Enseignant supprimé avec succès.']);
    }
}
