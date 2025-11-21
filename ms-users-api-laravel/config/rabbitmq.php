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
    | Email Exchange and Queue
    |--------------------------------------------------------------------------
    |
    | Configuration for email events.
    |
    */

    'email_exchange' => env('RABBITMQ_EMAIL_EXCHANGE', 'email_exchange'),
    'email_queue' => env('RABBITMQ_EMAIL_QUEUE', 'email_queue'),

    /*
    |--------------------------------------------------------------------------
    | User Events Exchange and Queue
    |--------------------------------------------------------------------------
    |
    | Configuration for user events (user.verified).
    |
    */

    'user_events_exchange' => env('RABBITMQ_USER_EVENTS_EXCHANGE', 'user_events'),
    'user_events_queue' => env('RABBITMQ_USER_EVENTS_QUEUE', 'user_replication_queue'),
];

