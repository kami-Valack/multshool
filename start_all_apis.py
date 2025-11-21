#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para iniciar todas as APIs do projeto em paralelo
"""

import subprocess
import sys
import os
import time
from pathlib import Path

# Configuração das APIs
APIS = [
    {
        "name": "MS Users API",
        "dir": "ms-users-api-laravel",
        "port": 8000,
        "consumer": False
    },
    {
        "name": "MS Student API",
        "dir": "ms-stundent-api-laravel-temp",
        "port": 8001,
        "consumer": True
    },
    {
        "name": "MS Admin System",
        "dir": "ms-admin-system",
        "port": 8002,
        "consumer": False
    },
    {
        "name": "MS School API",
        "dir": "ms-shocoll-api",
        "port": 8003,
        "consumer": True
    }
]

def start_api(api_config):
    """Inicia uma API"""
    project_dir = Path(__file__).parent / api_config["dir"]
    
    if not project_dir.exists():
        print(f"[ERRO] Diretório não encontrado: {project_dir}")
        return None
    
    os.chdir(project_dir)
    
    processes = []
    
    # Iniciar servidor
    try:
        server_process = subprocess.Popen(
            ["php", "artisan", "serve", f"--port={api_config['port']}"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        processes.append(("server", server_process))
        print(f"[OK] {api_config['name']} - Servidor iniciado na porta {api_config['port']}")
        
        # Se precisa de consumer, iniciar também
        if api_config["consumer"]:
            time.sleep(1)  # Aguardar servidor iniciar
            consumer_process = subprocess.Popen(
                ["php", "artisan", "rabbitmq:consume-user-events"],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            processes.append(("consumer", consumer_process))
            print(f"[OK] {api_config['name']} - Consumer iniciado")
        
        return processes
        
    except FileNotFoundError:
        print(f"[ERRO] PHP não encontrado para {api_config['name']}")
        return None
    except Exception as e:
        print(f"[ERRO] Erro ao iniciar {api_config['name']}: {e}")
        return None

def main():
    print("=" * 60)
    print("  Iniciando Todas as APIs do Projeto")
    print("=" * 60)
    print()
    
    all_processes = {}
    
    # Iniciar cada API
    for api in APIS:
        print(f"[INFO] Iniciando {api['name']}...")
        processes = start_api(api)
        if processes:
            all_processes[api['name']] = processes
        time.sleep(1)  # Pequeno delay entre iniciações
        print()
    
    if not all_processes:
        print("[ERRO] Nenhuma API foi iniciada")
        sys.exit(1)
    
    print("-" * 60)
    print()
    print("[OK] Todas as APIs iniciadas!")
    print()
    print("APIs Rodando:")
    for api in APIS:
        if api['name'] in all_processes:
            print(f"  ✓ {api['name']} - http://localhost:{api['port']}")
    print()
    print("[INFO] Pressione Ctrl+C para parar todas as APIs")
    print()
    print("-" * 60)
    print()
    
    # Aguardar e monitorar processos
    try:
        while True:
            time.sleep(1)
            # Verificar se algum processo morreu
            for api_name, processes in all_processes.items():
                for proc_type, proc in processes:
                    if proc.poll() is not None:
                        print(f"[AVISO] {api_name} - {proc_type} parou (código: {proc.returncode})")
    except KeyboardInterrupt:
        print()
        print()
        print("[INFO] Parando todas as APIs...")
        
        # Parar todos os processos
        for api_name, processes in all_processes.items():
            for proc_type, proc in processes:
                try:
                    proc.terminate()
                    proc.wait(timeout=5)
                    print(f"[OK] {api_name} - {proc_type} parado")
                except subprocess.TimeoutExpired:
                    proc.kill()
                    print(f"[OK] {api_name} - {proc_type} forçado a parar")
                except Exception as e:
                    print(f"[ERRO] Erro ao parar {api_name} - {proc_type}: {e}")
        
        print()
        print("[OK] Todas as APIs foram paradas")
        sys.exit(0)

if __name__ == "__main__":
    main()

