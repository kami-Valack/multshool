<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('exam_registrations', function (Blueprint $table) {
            $table->boolean('fee_paid')->default(false)->after('status');
            $table->timestamp('fee_paid_at')->nullable()->after('fee_paid');
            $table->string('payment_reference', 64)->nullable()->after('fee_paid_at');
        });
    }

    public function down(): void
    {
        Schema::table('exam_registrations', function (Blueprint $table) {
            $table->dropColumn(['fee_paid', 'fee_paid_at', 'payment_reference']);
        });
    }
};
