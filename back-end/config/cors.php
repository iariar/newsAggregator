<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['*'],
    'allowed_origins' => [

        '*',

    ],

    'allowed_methods' => [

        'POST',

        'GET',

        'OPTIONS',

        'PUT',

        'PATCH',

        'DELETE',

    ],

    'allowed_headers' => [

        'Content-Type',

        'X-Requested-With',

        'Authorization',

    ],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,

];