#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para iniciar o MS Student API Laravel
Porta: 8001
"""

import subprocess
import sys
import os
from pathlib import Path
import time

def main():
    print("=" * 60)
    print("  Iniciando MS Student API Laravel")
    print("=" * 60)
    print()
    
    # Diretório do projeto
    project_dir = Path(__file__).parent / "ms-stundent-api-laravel-temp"
    
    if not project_dir.exists():
        print(f"[ERRO] Diretório não encontrado: {project_dir}")
        sys.exit(1)
    
    os.chdir(project_dir)
    
    print(f"[INFO] Diretório: {project_dir}")
    print(f"[INFO] Porta: 8001")
    print(f"[INFO] URL: http://localhost:8001")
    print()
    print("[INFO] Iniciando servidor e consumer RabbitMQ...")
    print("[INFO] Pressione Ctrl+C para parar")
    print()
    print("-" * 60)
    print()
    
    try:
        # Iniciar servidor Laravel em background
        server_process = subprocess.Popen([
            "php", "artisan", "serve", "--port=8001"
        ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        # Aguardar um pouco para o servidor iniciar
        time.sleep(2)
        
        # Iniciar consumer RabbitMQ em background
        consumer_process = subprocess.Popen([
            "php", "artisan", "rabbitmq:consume-user-events"
        ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        print("[OK] Servidor iniciado na porta 8001")
        print("[OK] Consumer RabbitMQ iniciado")
        print()
        print("[INFO] PIDs:")
        print(f"  Servidor: {server_process.pid}")
        print(f"  Consumer: {consumer_process.pid}")
        print()
        print("-" * 60)
        print()
        
        # Aguardar processos
        try:
            server_process.wait()
        except KeyboardInterrupt:
            print()
            print("[INFO] Parando processos...")
            server_process.terminate()
            consumer_process.terminate()
            server_process.wait()
            consumer_process.wait()
            print("[INFO] Processos parados")
            sys.exit(0)
            
    except FileNotFoundError:
        print("[ERRO] PHP não encontrado. Certifique-se de que o PHP está instalado e no PATH")
        sys.exit(1)
    except Exception as e:
        print(f"[ERRO] Erro ao iniciar servidor: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()

