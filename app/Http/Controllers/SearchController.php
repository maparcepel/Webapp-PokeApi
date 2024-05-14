<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Search;
use Log;
use Exception;
use Illuminate\Support\Facades\Http;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        define('BASE_URL', 'https://pokeapi.co/api/v2/pokemon/');

        $request->validate([
            'term' => 'required|max:50',
        ]);

        try {
            $response = Http::get(BASE_URL . $request->term);

            if ($response->successful()) {
                $data = $response->json();

                $abilities = $this->getAbilitiesInSpanish($data['abilities']);

                $search = new Search();
                $search->term = $request->term;
                $search->session_id = $request->session()->getId();
                $search->save();

                $history = Search::where('session_id', $request->session()->getId())
                    ->latest()
                    ->take(10)
                    ->get();

                return response()->json([
                    'name' => $data['name'],
                    'abilities' => $abilities,
                    'history' => $history
                ]);
            } else {
                return response()->json('Pokémon no encontrado');
            }
        } catch (Exception $e) {
            Log::error('Error al guardar la búsqueda: ' . $e->getMessage());
            return response()->json(['error' => 'Error del servidor'], 500);
        }
    }

    private function getAbilitiesInSpanish($abilities)
    {
        $abilityNamesSpanish = [];

        foreach ($abilities as $ability) {
            $abilityUrl = $ability['ability']['url'];
            $response = Http::get($abilityUrl);
            $data = $response->json();

            foreach ($data['names'] as $name) {
                if ($name['language']['name'] === "es") {
                    $abilityNamesSpanish[] = $name['name'];
                    break;
                }
            }
        }

        return $abilityNamesSpanish;
    }

    public function getHistory(Request $request)
    {
        $history = Search::where('session_id', $request->session()->getId())
            ->latest()
            ->take(10)
            ->get();

        return response()->json($history);
    }
}
