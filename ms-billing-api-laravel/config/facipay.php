<?php

return [
    'base_url' => rtrim(env('FACI_API_BASE_URL', ''), '/'),
    'api_key' => env('FACI_API_KEY', ''),
    'mock' => filter_var(env('FACI_MOCK', true), FILTER_VALIDATE_BOOLEAN),
    'default_entity' => env('FACI_DEFAULT_ENTITY', '99999'),
];
