<?php

use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'service' => 'ms-billing-api',
        'timestamp' => now()->toIso8601String(),
        'faci_mock' => config('facipay.mock'),
    ]);
});

Route::middleware([\App\Http\Middleware\AuthenticateApi::class])->group(function () {
    Route::get('/payment-intents', [\App\Http\Controllers\PaymentIntentController::class, 'index']);
    Route::post('/payment-intents', [\App\Http\Controllers\PaymentIntentController::class, 'store']);
    Route::get('/payment-intents/{id}', [\App\Http\Controllers\PaymentIntentController::class, 'show']);
    Route::post('/payment-intents/{id}/reference', [\App\Http\Controllers\PaymentIntentController::class, 'issueReference']);
    Route::get('/payment-intents/{id}/status', [\App\Http\Controllers\PaymentIntentController::class, 'status']);
    Route::post('/payment-intents/{id}/simulate-paid', [\App\Http\Controllers\PaymentIntentController::class, 'simulatePaid']);
});
