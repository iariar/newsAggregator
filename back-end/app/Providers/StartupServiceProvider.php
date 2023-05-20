<?php

namespace App\Providers;
use App\Models\Article;
use GuzzleHttp\Client;


use Illuminate\Support\ServiceProvider;

class StartupServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //Code to run when starting the server
        // $newsApiKey = env('NEWS_API_KEY');
        // $newsYorTimesApiKey = env('NEWYORKTIMES_API_KEY');

        // // Create a new Guzzle client instance
        // $client = new Client();

        // // Send a GET request to the API endpoint with the API key header
        // // $newsCatcherResponse = $client->get('https://api.newscatcherapi.com/v2/search?q=random&page_size=10', [
        // //     'headers' => [
        // //         'x-api-key' => $apiKey,
        // //     ],
        // // ]);
        // // $newYorkTimesApiResponse = $client->get('https://api.nytimes.com/svc/search/v2/articlesearch.json', [
        // //     'query' => [
        // //         'q' => 'election',
        // //         'api-key' => $newsYorTimesApiKey,
        // //     ],
        // // ]);
    
        // // $newYorkTimeData = json_decode($newYorkTimesApiResponse->getBody(), true);
        // $newsApiResponse = $client->get('https://newsapi.org/v2/everything?q=random&from=2023-05-1&sortBy=popularity&apiKey=b52e10bc82ac46f7aea980959f9e36e8', [
        //     'headers' => [
        //         'x-api-key' => $newsApiKey,
        //     ],
        // ]);

        // // $newsCatcherData = json_decode($newsCatcherResponse->getBody(), true);
        // $newsApiData = json_decode($newsApiResponse->getBody(), true);

        // // Fetch existing article titles from the database
        // $existingTitles = Article::pluck('title')->toArray();

        // // Save the articles from the News API directly in the database
        // foreach ($newsApiData['articles'] as $article) {
        //     if (!in_array($article['title'], $existingTitles)) {
        //         Article::create([
        //             'title' => $article['title'],
        //             'author' => $article['author'],
        //             'description' => $article['description'],
        //             'link' => $article['url'],
        //             'image' => $article['urlToImage'],
        //             'source' => $article['source']['name'],
        //             'publishedAt' => $article['publishedAt'],
        //         ]);
        //     }
        // }

        // Save the articles from the News Catcher API directly in the database
        // foreach ($newYorkTimeData['response']['docs'] as $article) {
        //     if (!in_array($article['title'], $existingTitles)) {
        //         Article::create([
        //             'title' => $article['headline']['main'],
        //             'author' => $article['author'],
        //             'description' => $article['lead_paragraph'],
        //             'link' => $article['web_url'],
        //             'image' => $article['media'],
        //             'source' => $article['clean_url'],
        //             'publishedAt' => $article['published_date'],
        //         ]);
        //     }
        // }
    }
}
