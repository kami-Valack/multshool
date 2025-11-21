#!/usr/bin/env python3
"""
Script para instalar e configurar o Swagger no MS Users API
"""

import subprocess
import sys
import os
from pathlib import Path

def run_command(cmd, cwd=None):
    """Executa um comando e mostra o output"""
    print(f"\n{'='*60}")
    print(f"Executando: {cmd}")
    print(f"{'='*60}\n")
    
    result = subprocess.run(
        cmd,
        shell=True,
        cwd=cwd,
        capture_output=False,
        text=True
    )
    
    if result.returncode != 0:
        print(f"\n❌ Erro ao executar: {cmd}")
        return False
    
    return True

def main():
    """Função principal"""
    print("🚀 Instalando e configurando Swagger para MS Users API\n")
    
    # Verificar se estamos no diretório correto
    current_dir = Path.cwd()
    if not (current_dir / "composer.json").exists():
        print("❌ Erro: Execute este script no diretório ms-users-api-laravel")
        sys.exit(1)
    
    # 1. Instalar o pacote l5-swagger
    print("\n📦 Passo 1: Instalando pacote darkaonline/l5-swagger...")
    if not run_command("composer require darkaonline/l5-swagger"):
        print("❌ Falha ao instalar o pacote")
        sys.exit(1)
    
    # 2. Publicar configuração
    print("\n📝 Passo 2: Publicando configuração do Swagger...")
    if not run_command("php artisan vendor:publish --provider=\"L5Swagger\\L5SwaggerServiceProvider\""):
        print("⚠️  Aviso: Pode ser que a configuração já tenha sido publicada")
    
    # 3. Gerar documentação
    print("\n📚 Passo 3: Gerando documentação Swagger...")
    if not run_command("php artisan l5-swagger:generate"):
        print("❌ Falha ao gerar documentação")
        sys.exit(1)
    
    print("\n" + "="*60)
    print("✅ Swagger instalado e configurado com sucesso!")
    print("="*60)
    print("\n📖 Acesse a documentação em:")
    print("   http://localhost:8000/api/documentation")
    print("\n💡 Dica: Após modificar anotações, execute:")
    print("   php artisan l5-swagger:generate")
    print("\n")

if __name__ == "__main__":
    main()

