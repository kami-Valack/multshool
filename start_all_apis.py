#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para iniciar todas as APIs do projeto em paralelo
Inclui limpeza de cache, migrations e inicialização dos frontends
"""

import subprocess
import sys
import os
import time
import platform
import shutil
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

# Configuração dos Frontends
FRONTENDS = [
    {
        "name": "Portal Estudante",
        "dir": "portal-estudante",
        "port": 3000
    },
    {
        "name": "Sistema Akaedem MS",
        "dir": "sistema-akaedem-ms",
        "port": 3001
    }
]

def clear_cache(api_config):
    """Limpa o cache de uma API Laravel"""
    project_dir = Path(__file__).parent / api_config["dir"]
    
    if not project_dir.exists():
        return False
    
    original_dir = os.getcwd()
    try:
        os.chdir(project_dir)
        
        print(f"[INFO] {api_config['name']} - Limpando cache...")
        
        # Limpar diferentes tipos de cache
        cache_commands = [
            ["php", "artisan", "config:clear"],
            ["php", "artisan", "cache:clear"],
            ["php", "artisan", "route:clear"],
            ["php", "artisan", "view:clear"]
        ]
        
        for cmd in cache_commands:
            try:
                result = subprocess.run(
                    cmd,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    text=True,
                    timeout=30
                )
                if result.returncode != 0:
                    print(f"[AVISO] {api_config['name']} - Erro ao executar {' '.join(cmd)}")
            except Exception as e:
                print(f"[AVISO] {api_config['name']} - Erro ao limpar cache: {e}")
        
        print(f"[OK] {api_config['name']} - Cache limpo")
        return True
        
    except Exception as e:
        print(f"[ERRO] {api_config['name']} - Erro ao limpar cache: {e}")
        return False
    finally:
        os.chdir(original_dir)

def run_migrations(api_config):
    """Executa as migrations de uma API Laravel"""
    project_dir = Path(__file__).parent / api_config["dir"]
    
    if not project_dir.exists():
        return False
    
    original_dir = os.getcwd()
    try:
        os.chdir(project_dir)
        
        print(f"[INFO] {api_config['name']} - Executando migrations...")
        
        result = subprocess.run(
            ["php", "artisan", "migrate", "--force"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=60
        )
        
        if result.returncode == 0:
            print(f"[OK] {api_config['name']} - Migrations executadas")
            return True
        else:
            print(f"[AVISO] {api_config['name']} - Erro nas migrations: {result.stderr}")
            return False
        
    except subprocess.TimeoutExpired:
        print(f"[ERRO] {api_config['name']} - Timeout ao executar migrations")
        return False
    except Exception as e:
        print(f"[ERRO] {api_config['name']} - Erro ao executar migrations: {e}")
        return False
    finally:
        os.chdir(original_dir)

def start_api(api_config):
    """Inicia uma API"""
    project_dir = Path(__file__).parent / api_config["dir"]
    
    if not project_dir.exists():
        print(f"[ERRO] Diretório não encontrado: {project_dir}")
        return None
    
    original_dir = os.getcwd()
    try:
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
    finally:
        os.chdir(original_dir)

def find_npm():
    """Encontra o comando npm disponível no sistema"""
    # Primeiro, tenta encontrar npm no PATH
    npm_path = shutil.which("npm")
    if npm_path:
        return ["npm"]
    
    # No Windows, tenta npm.cmd
    if platform.system() == "Windows":
        npm_cmd_path = shutil.which("npm.cmd")
        if npm_cmd_path:
            return ["npm.cmd"]
        # Tenta diretamente
        try:
            result = subprocess.run(
                ["npm", "--version"],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=5
            )
            if result.returncode == 0:
                return ["npm"]
        except:
            pass
    
    return None

def start_frontend(frontend_config):
    """Inicia um frontend"""
    project_dir = Path(__file__).parent / frontend_config["dir"]
    
    if not project_dir.exists():
        print(f"[ERRO] Diretório não encontrado: {project_dir}")
        return None
    
    # Encontrar o comando npm
    npm_cmd = find_npm()
    if not npm_cmd:
        print(f"[ERRO] npm não encontrado no sistema. Verifique se o Node.js está instalado.")
        return None
    
    original_dir = os.getcwd()
    try:
        os.chdir(project_dir)
        
        try:
            # No Windows, usar shell=True pode ajudar
            use_shell = platform.system() == "Windows"
            
            if use_shell:
                # No Windows com shell=True, usar string
                cmd = " ".join(npm_cmd + ["run", "dev"])
            else:
                # No Linux/Mac, usar lista
                cmd = npm_cmd + ["run", "dev"]
            
            frontend_process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                shell=use_shell
            )
            print(f"[OK] {frontend_config['name']} - Frontend iniciado (porta {frontend_config['port']})")
            return frontend_process
            
        except FileNotFoundError:
            print(f"[ERRO] npm não encontrado para {frontend_config['name']}")
            return None
        except Exception as e:
            print(f"[ERRO] Erro ao iniciar {frontend_config['name']}: {e}")
            return None
    finally:
        os.chdir(original_dir)

def main():
    print("=" * 60)
    print("  Iniciando Todos os Serviços do Projeto")
    print("=" * 60)
    print()
    
    # 1. Limpar cache de todas as APIs
    print("[ETAPA 1/4] Limpando cache dos serviços...")
    print()
    for api in APIS:
        clear_cache(api)
        time.sleep(0.5)
    print()
    
    # 2. Executar migrations
    print("[ETAPA 2/4] Executando migrations...")
    print()
    for api in APIS:
        run_migrations(api)
        time.sleep(0.5)
    print()
    
    # 3. Iniciar APIs
    print("[ETAPA 3/4] Iniciando APIs...")
    print()
    all_processes = {}
    
    for api in APIS:
        print(f"[INFO] Iniciando {api['name']}...")
        processes = start_api(api)
        if processes:
            all_processes[api['name']] = processes
        time.sleep(1)  # Pequeno delay entre iniciações
        print()
    
    # 4. Iniciar Frontends
    print("[ETAPA 4/4] Iniciando Frontends...")
    print()
    frontend_processes = {}
    
    for frontend in FRONTENDS:
        print(f"[INFO] Iniciando {frontend['name']}...")
        process = start_frontend(frontend)
        if process:
            frontend_processes[frontend['name']] = process
        time.sleep(1)  # Pequeno delay entre iniciações
        print()
    
    if not all_processes and not frontend_processes:
        print("[ERRO] Nenhum serviço foi iniciado")
        sys.exit(1)
    
    print("-" * 60)
    print()
    print("[OK] Todos os serviços iniciados!")
    print()
    
    if all_processes:
        print("APIs Rodando:")
        for api in APIS:
            if api['name'] in all_processes:
                print(f"  ✓ {api['name']} - http://localhost:{api['port']}")
        print()
    
    if frontend_processes:
        print("Frontends Rodando:")
        for frontend in FRONTENDS:
            if frontend['name'] in frontend_processes:
                print(f"  ✓ {frontend['name']} - http://localhost:{frontend['port']}")
        print()
    
    print("[INFO] Pressione Ctrl+C para parar todos os serviços")
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
            
            for frontend_name, proc in frontend_processes.items():
                if proc.poll() is not None:
                    print(f"[AVISO] {frontend_name} - Frontend parou (código: {proc.returncode})")
                    
    except KeyboardInterrupt:
        print()
        print()
        print("[INFO] Parando todos os serviços...")
        
        # Parar todos os processos das APIs
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
        
        # Parar todos os processos dos frontends
        for frontend_name, proc in frontend_processes.items():
            try:
                proc.terminate()
                proc.wait(timeout=5)
                print(f"[OK] {frontend_name} - Frontend parado")
            except subprocess.TimeoutExpired:
                proc.kill()
                print(f"[OK] {frontend_name} - Frontend forçado a parar")
            except Exception as e:
                print(f"[ERRO] Erro ao parar {frontend_name}: {e}")
        
        print()
        print("[OK] Todos os serviços foram parados")
        sys.exit(0)

if __name__ == "__main__":
    main()

