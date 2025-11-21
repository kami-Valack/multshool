<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Criar admin padrão se não existir
        $admin = User::where('email', 'admin')->first();
        
        if (!$admin) {
            User::create([
                'id' => \Illuminate\Support\Str::uuid(),
                'name' => 'Administrador',
                'email' => 'admin',
                'password' => Hash::make('admin'),
                'role' => User::ROLE_SUPER_ADMIN,
                'email_verified' => true,
                'is_active' => true,
            ]);
            
            $this->command->info('Admin padrão criado:');
            $this->command->info('  Email: admin');
            $this->command->info('  Senha: admin');
        } else {
            $this->command->info('Admin padrão já existe.');
        }
    }
}
