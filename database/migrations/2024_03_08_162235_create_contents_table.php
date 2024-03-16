<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('app_id')->references('id')->on('apps');
            $table->foreignId('cluster_id')->nullable();
            $table->foreignId('current_revision_id')->nullable();
            $table->string('slug');
            $table->string('language');
            $table->string('format');
            $table->string('size');
            $table->string('title');
            $table->json('keywords');
            $table->boolean('only_target_audience')->default(false);
            $table->boolean('content_queued')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contents');
    }

};
