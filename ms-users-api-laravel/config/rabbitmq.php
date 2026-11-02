<?php

return [
    'host' => env('RABBITMQ_HOST', 'localhost'),
    'port' => env('RABBITMQ_PORT', 5672),
    'user' => env('RABBITMQ_USER', 'guest'),
    'password' => env('RABBITMQ_PASSWORD', 'guest'),
    'vhost' => env('RABBITMQ_VHOST', '/'),

    'email_exchange' => env('RABBITMQ_EMAIL_EXCHANGE', 'email_exchange'),
    'email_queue' => env('RABBITMQ_EMAIL_QUEUE', 'email_queue'),

    /*
    | Exchange "user_events" é do tipo direct.
    | Routing keys exactas: user.verified | school.create
    | O publisher declara/binda as filas dos consumers.
    */
    'user_events_exchange' => env('RABBITMQ_USER_EVENTS_EXCHANGE', 'user_events'),
    'user_events_queue' => env('RABBITMQ_USER_EVENTS_QUEUE', 'user_replication_queue'),
];
