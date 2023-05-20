<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Article;


class Data extends Controller
{
    public function save(Request $request)
    {
        $user = Auth::user();
        $selectedAuthors = $request['selectedAuthors'];
        $selectedSources = $request['selectedSources'];

        // Update the user's authors and sources
        $user->authors = $selectedAuthors;
        $user->sources = $selectedSources;
        $user->save();

        return response()->json(['message' => 'Preferences saved successfully']);
    }

    public function fetchArticles(Request $request)
    {
        $perPage = $request->input('per_page', 15); // Number of articles per page
        $articles = Article::paginate($perPage);

        return response()->json($articles);
    }

}