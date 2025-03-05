<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\File;

class TranslationController extends Controller
{
    /**
     * Get all translations from the translations.json file
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $path = resource_path('lang/translations.json');

        if (!File::exists($path)) {
            return response()->json([
                'error' => 'Translations file not found'
            ], 404);
        }

        $translations = json_decode(File::get($path), true);

        return response()->json($translations);
    }

    /**
     * Get translations for a specific language
     *
     * @param string $lang
     * @return JsonResponse
     */
    public function getLanguage(string $lang): JsonResponse
    {
        $path = resource_path('lang/translations.json');

        if (!File::exists($path)) {
            return response()->json([
                'error' => 'Translations file not found'
            ], 404);
        }

        $translations = json_decode(File::get($path), true);
        $languageTranslations = [];

        foreach ($translations as $key => $translation) {
            if (isset($translation[$lang])) {
                $languageTranslations[$key] = $translation[$lang];
            }
        }

        return response()->json($languageTranslations);
    }
}
