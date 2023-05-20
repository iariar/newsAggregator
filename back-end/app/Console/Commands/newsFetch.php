<?php

namespace App\Console\Commands;

use App\Models\Article;
use GuzzleHttp\Client;
use Illuminate\Console\Command;
use Carbon\Carbon;

class newsFetch extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'newsFetch';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        $apiKey = env('APP_API_KEY');

        // Create a new Guzzle client instance
        $client = new Client();

        // Send a GET request to the API endpoint with the API key header
        $newsCatcherResponse = $client->get('https://api.newscatcherapi.com/v2/search?q=random&page_size=10', [
            'headers' => [
                'x-api-key' => $apiKey,
            ],
        ]);

        $guardianResponse = $client->get('https://content.guardianapis.com/search?api-key=93e7af1e-c207-4594-9a6a-11095ca69b56&page-size=5', );

        $newsApiResponse = $client->get('https://newsapi.org/v2/everything?q=random&from=2023-05-1&sortBy=popularity&apiKey=b52e10bc82ac46f7aea980959f9e36e8', [
            'headers' => [
                'x-api-key' => $apiKey,
            ],
        ]);

        $newsCatcherData = json_decode($newsCatcherResponse->getBody(), true);
        $newsApiData = json_decode($newsApiResponse->getBody(), true);
        $guardianApiData = json_decode($guardianResponse->getBody(), true);

        // Fetch existing article titles from the database
        $existingTitles = Article::pluck('title')->toArray();

        foreach ($newsApiData['articles'] as $article) {
            if (!in_array($article['title'], $existingTitles)) {
                Article::create([
                    'title' => $article['title'],
                    'author' => $article['author'],
                    'description' => $article['description'],
                    'link' => $article['url'],
                    'image' => $article['urlToImage'],
                    'source' => $article['source']['name'],
                    'published_at' => Carbon::parse($article['publishedAt'])->toDateTimeString(),
                ]);
            }
        }
        
        foreach ($guardianApiData['response']['results'] as $article) {
            if (!in_array($article['webTitle'], $existingTitles)) {
                Article::create([
                    'title' => $article['webTitle'],
                    'author' => 'unknown',
                    'description' => 'For more details, click on the article',
                    'link' => $article['webUrl'],
                    'image' => 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
                    'source' => 'Guardian',
                    'published_at' => Carbon::parse($article['webPublicationDate'])->toDateTimeString(),
                ]);
            }
        }
        
        foreach ($newsCatcherData['articles'] as $article) {
            if (!in_array($article['title'], $existingTitles)) {
                Article::create([
                    'title' => $article['title'],
                    'author' => $article['author'],
                    'description' => $article['summary'],
                    'link' => $article['link'],
                    'image' => $article['media'],
                    'source' => $article['clean_url'],
                    'published_at' => Carbon::parse($article['published_date'])->toDateTimeString(),
                ]);
            }
        }
        return Command::SUCCESS;
    }
}