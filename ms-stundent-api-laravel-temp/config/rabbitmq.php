<?php

return [
    /*
    |--------------------------------------------------------------------------
    | RabbitMQ Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for RabbitMQ connection and queues.
    |
    */

    'host' => env('RABBITMQ_HOST', 'localhost'),
    'port' => env('RABBITMQ_PORT', 5672),
    'user' => env('RABBITMQ_USER', 'guest'),
    'password' => env('RABBITMQ_PASSWORD', 'guest'),
    'vhost' => env('RABBITMQ_VHOST', '/'),

    /*
    |--------------------------------------------------------------------------
    | User Events Exchange and Queue
    |--------------------------------------------------------------------------
    |
    | Configuration for consuming user events (user.verified).
    |
    */

    'user_events_exchange' => env('RABBITMQ_USER_EVENTS_EXCHANGE', 'user_events'),
    'user_events_queue' => env('RABBITMQ_USER_EVENTS_QUEUE', 'ms-student-api.user.verified'),
    'user_events_routing_key' => env('RABBITMQ_USER_EVENTS_ROUTING_KEY', 'user.verified'),
];

