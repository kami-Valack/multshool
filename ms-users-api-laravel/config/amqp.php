<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the connections below you wish to use as
    | your default connection for all AMQP work.
    |
    */

    'default' => env('AMQP_CONNECTION', 'default'),

    /*
    |--------------------------------------------------------------------------
    | AMQP Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the connections setup for your application.
    |
    */

    'connections' => [
        'default' => [
            'host' => env('RABBITMQ_HOST', 'localhost'),
            'port' => env('RABBITMQ_PORT', 5672),
            'user' => env('RABBITMQ_USER', 'guest'),
            'password' => env('RABBITMQ_PASSWORD', 'guest'),
            'vhost' => env('RABBITMQ_VHOST', '/'),
            'read_timeout' => env('RABBITMQ_READ_TIMEOUT', 3),
            'write_timeout' => env('RABBITMQ_WRITE_TIMEOUT', 3),
            'connect_timeout' => env('RABBITMQ_CONNECT_TIMEOUT', 3),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Exchanges
    |--------------------------------------------------------------------------
    |
    | Here you may configure the exchanges that will be used by your
    | application.
    |
    */

    'exchanges' => [
        'user_events' => [
            'name' => env('RABBITMQ_USER_EVENTS_EXCHANGE', 'user_events'),
            'type' => 'direct',
            'passive' => false,
            'durable' => true,
            'auto_delete' => false,
        ],
        'email_exchange' => [
            'name' => env('RABBITMQ_EMAIL_EXCHANGE', 'email_exchange'),
            'type' => 'direct',
            'passive' => false,
            'durable' => true,
            'auto_delete' => false,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Queues
    |--------------------------------------------------------------------------
    |
    | Here you may configure the queues that will be used by your
    | application.
    |
    */

    'queues' => [
        'user_replication_queue' => [
            'name' => env('RABBITMQ_USER_EVENTS_QUEUE', 'user_replication_queue'),
            'passive' => false,
            'durable' => true,
            'exclusive' => false,
            'auto_delete' => false,
        ],
        'email_queue' => [
            'name' => env('RABBITMQ_EMAIL_QUEUE', 'email_queue'),
            'passive' => false,
            'durable' => true,
            'exclusive' => false,
            'auto_delete' => false,
        ],
    ],
];

