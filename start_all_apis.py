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
import socket
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

def check_rabbitmq_connection(host='localhost', port=5672, timeout=3):
    """Verifica se o RabbitMQ está acessível"""
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(timeout)
        result = sock.connect_ex((host, port))
        sock.close()
        return result == 0
    except Exception:
        return False

def check_docker_rabbitmq_container():
    """Verifica se o container do RabbitMQ está rodando"""
    try:
        result = subprocess.run(
            ["docker", "ps", "-a", "--filter", "name=rabbitmq", "--format", "{{.Names}}|{{.Status}}"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=10
        )
        
        if result.returncode == 0 and result.stdout.strip():
            lines = result.stdout.strip().split('\n')
            for line in lines:
                if 'rabbitmq' in line.lower():
                    parts = line.split('|')
                    if len(parts) >= 2:
                        container_name = parts[0]
                        status = parts[1]
                        if 'Up' in status:
                            return True, container_name, "running"
                        else:
                            return False, container_name, status
        return None, None, None
    except FileNotFoundError:
        return None, None, "docker_not_found"
    except Exception as e:
        return None, None, f"error: {str(e)}"

def start_docker_rabbitmq_container(container_name="video-processing-rabbitmq"):
    """Tenta iniciar o container do RabbitMQ"""
    try:
        print(f"[INFO] Tentando iniciar o container RabbitMQ: {container_name}...")
        result = subprocess.run(
            ["docker", "start", container_name],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=30
        )
        
        if result.returncode == 0:
            print(f"[OK] Container RabbitMQ iniciado: {container_name}")
            # Aguardar alguns segundos para o RabbitMQ inicializar
            print("[INFO] Aguardando RabbitMQ inicializar...")
            time.sleep(5)
            return True
        else:
            print(f"[ERRO] Falha ao iniciar container: {result.stderr}")
            return False
    except FileNotFoundError:
        print("[ERRO] Docker não encontrado. Instale o Docker ou inicie o RabbitMQ manualmente.")
        return False
    except Exception as e:
        print(f"[ERRO] Erro ao iniciar container: {e}")
        return False

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
                ["php", "artisan", "serve", "--host=0.0.0.0", f"--port={api_config['port']}"],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            processes.append(("server", server_process))
            print(f"[OK] {api_config['name']} - Servidor iniciado em 0.0.0.0:{api_config['port']} (acesso externo habilitado)")
            
            # Se precisa de consumer, iniciar também
            if api_config["consumer"]:
                time.sleep(1)  # Aguardar servidor iniciar
                
                # Verificar se RabbitMQ está acessível
                rabbitmq_host = os.getenv('RABBITMQ_HOST', 'localhost')
                rabbitmq_port = int(os.getenv('RABBITMQ_PORT', '5672'))
                
                if not check_rabbitmq_connection(rabbitmq_host, rabbitmq_port):
                    print(f"[AVISO] {api_config['name']} - RabbitMQ não está acessível em {rabbitmq_host}:{rabbitmq_port}")
                    print(f"[AVISO] {api_config['name']} - Consumer não será iniciado. Verifique se o RabbitMQ está rodando.")
                else:
                    print(f"[INFO] {api_config['name']} - RabbitMQ acessível, iniciando consumer...")
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

def check_node_version(min_version="20.9.0"):
    """Verifica a versão do Node.js e retorna (sucesso, versão_atual, mensagem)"""
    try:
        result = subprocess.run(
            ["node", "--version"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=5
        )
        
        if result.returncode != 0:
            return False, None, "Node.js não encontrado"
        
        version_str = result.stdout.strip().replace('v', '')
        version_parts = version_str.split('.')
        
        min_parts = min_version.split('.')
        
        # Comparar versões
        for i in range(max(len(version_parts), len(min_parts))):
            v_part = int(version_parts[i]) if i < len(version_parts) else 0
            m_part = int(min_parts[i]) if i < len(min_parts) else 0
            
            if v_part > m_part:
                return True, version_str, None
            elif v_part < m_part:
                return False, version_str, f"Node.js {version_str} é menor que {min_version}"
        
        return True, version_str, None
        
    except FileNotFoundError:
        return False, None, "Node.js não encontrado no sistema"
    except Exception as e:
        return False, None, f"Erro ao verificar versão do Node.js: {e}"

def start_frontend(frontend_config):
    """Inicia um frontend em uma porta específica"""
    project_dir = Path(__file__).parent / frontend_config["dir"]
    
    if not project_dir.exists():
        print(f"[ERRO] Diretório não encontrado: {project_dir}")
        return None
    
    # Verificar versão do Node.js (especialmente para Next.js 16+)
    # Sistema Akaedem MS usa Next.js 16 que requer Node.js >= 20.9.0
    min_node_version = "20.9.0" if "akaedem" in frontend_config["dir"].lower() else "18.0.0"
    node_ok, node_version, node_error = check_node_version(min_node_version)
    
    if not node_ok:
        print(f"[ERRO] {frontend_config['name']} - {node_error}")
        if node_version:
            print(f"[INFO] Versão atual do Node.js: {node_version}")
        print(f"[INFO] Versão mínima requerida: {min_node_version}")
        print(f"[INFO] Atualize o Node.js ou use nvm para gerenciar versões")
        return None
    
    if node_version:
        print(f"[INFO] {frontend_config['name']} - Node.js {node_version} (OK)")
    
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
            
            # Criar comando com porta específica
            # Next.js aceita -p ou --port para especificar a porta
            port = frontend_config['port']
            
            # Criar ambiente com variável PORT
            env = os.environ.copy()
            env['PORT'] = str(port)
            
            # Next.js aceita a porta via variável de ambiente PORT
            # Também podemos passar via argumento, mas a variável de ambiente é mais confiável
            if use_shell:
                # No Windows com shell=True, usar string
                # Usar apenas variável de ambiente PORT (mais confiável)
                if 'powershell' in os.environ.get('SHELL', '').lower() or 'powershell' in os.environ.get('PSModulePath', ''):
                    # PowerShell
                    cmd = f"$env:PORT='{port}'; {' '.join(npm_cmd)} run dev"
                else:
                    # CMD
                    cmd = f"set PORT={port} && {' '.join(npm_cmd)} run dev"
            else:
                # No Linux/Mac, usar lista com variável de ambiente
                # Usar apenas variável de ambiente PORT (mais confiável)
                cmd = npm_cmd + ["run", "dev"]
            
            print(f"[INFO] {frontend_config['name']} - Iniciando na porta {port}...")
            
            if use_shell:
                frontend_process = subprocess.Popen(
                    cmd,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    text=True,
                    shell=True,
                    env=env
                )
            else:
                frontend_process = subprocess.Popen(
                    cmd,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    text=True,
                    shell=False,
                    env=env
                )
            
            # Aguardar um pouco e verificar se o processo ainda está rodando
            time.sleep(2)
            if frontend_process.poll() is not None:
                # Processo já terminou, tentar ler o erro
                try:
                    stderr_output = frontend_process.stderr.read(1000) if frontend_process.stderr else ""
                    stdout_output = frontend_process.stdout.read(1000) if frontend_process.stdout else ""
                    error_msg = stderr_output or stdout_output or "Sem mensagem de erro disponível"
                    print(f"[ERRO] {frontend_config['name']} - Frontend falhou imediatamente:")
                    print(f"[ERRO] {error_msg[:500]}")
                    return None
                except:
                    print(f"[ERRO] {frontend_config['name']} - Frontend falhou imediatamente (código: {frontend_process.returncode})")
                    return None
            
            print(f"[OK] {frontend_config['name']} - Frontend iniciado na porta {port}")
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
    
    # Verificar se algum serviço precisa de RabbitMQ
    needs_rabbitmq = any(api["consumer"] for api in APIS)
    if needs_rabbitmq:
        rabbitmq_host = os.getenv('RABBITMQ_HOST', 'localhost')
        rabbitmq_port = int(os.getenv('RABBITMQ_PORT', '5672'))
        print(f"[INFO] Verificando conexão com RabbitMQ em {rabbitmq_host}:{rabbitmq_port}...")
        
        # Primeiro verificar se está acessível
        if not check_rabbitmq_connection(rabbitmq_host, rabbitmq_port):
            print(f"[AVISO] RabbitMQ não está acessível em {rabbitmq_host}:{rabbitmq_port}")
            
            # Verificar se há container Docker do RabbitMQ
            container_status, container_name, status_info = check_docker_rabbitmq_container()
            
            if container_name:
                if status_info == "running":
                    print(f"[INFO] Container {container_name} está rodando, mas não está acessível na porta {rabbitmq_port}")
                else:
                    print(f"[INFO] Container {container_name} encontrado, mas está {status_info}")
                    print(f"[INFO] Tentando iniciar o container...")
                    if start_docker_rabbitmq_container(container_name):
                        # Verificar novamente após iniciar
                        time.sleep(2)
                        if check_rabbitmq_connection(rabbitmq_host, rabbitmq_port):
                            print(f"[OK] RabbitMQ está acessível após iniciar o container")
                        else:
                            print(f"[AVISO] Container iniciado, mas RabbitMQ ainda não está acessível. Aguarde alguns segundos.")
                    else:
                        print(f"[AVISO] Não foi possível iniciar o container automaticamente.")
                        print(f"[AVISO] Inicie manualmente com: docker start {container_name}")
                        print(f"[AVISO] Ou use: docker-compose up -d rabbitmq")
            else:
                if status_info == "docker_not_found":
                    print(f"[AVISO] Docker não encontrado. Instale o Docker ou inicie o RabbitMQ manualmente.")
                else:
                    print(f"[AVISO] Container RabbitMQ não encontrado.")
                    print(f"[AVISO] Inicie o RabbitMQ com: docker-compose up -d rabbitmq")
        else:
            print(f"[OK] RabbitMQ está acessível")
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
        print("APIs Rodando (acessíveis externamente em 0.0.0.0):")
        for api in APIS:
            if api['name'] in all_processes:
                print(f"  ✓ {api['name']} - http://0.0.0.0:{api['port']} (também http://localhost:{api['port']})")
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
    consumer_errors_shown = set()  # Para evitar mostrar o mesmo erro múltiplas vezes
    try:
        while True:
            time.sleep(2)  # Verificar a cada 2 segundos
            # Verificar se algum processo morreu
            for api_name, processes in all_processes.items():
                for proc_type, proc in processes:
                    if proc.poll() is not None:
                        returncode = proc.returncode
                        error_key = f"{api_name}_{proc_type}"
                        
                        if error_key not in consumer_errors_shown:
                            consumer_errors_shown.add(error_key)
                            print(f"[AVISO] {api_name} - {proc_type} parou (código: {returncode})")
                            
                            # Se for consumer, tentar obter mais informações do erro
                            if proc_type == "consumer" and returncode != 0:
                                try:
                                    # Tentar ler stderr (pode estar vazio se já foi lido)
                                    stderr_output = ""
                                    if proc.stderr:
                                        try:
                                            stderr_output = proc.stderr.read(500)  # Ler até 500 chars
                                        except:
                                            pass
                                    
                                    if stderr_output:
                                        print(f"[ERRO] {api_name} - Consumer stderr: {stderr_output[:300]}")
                                    
                                    # Verificar se RabbitMQ ainda está acessível
                                    rabbitmq_host = os.getenv('RABBITMQ_HOST', 'localhost')
                                    rabbitmq_port = int(os.getenv('RABBITMQ_PORT', '5672'))
                                    if not check_rabbitmq_connection(rabbitmq_host, rabbitmq_port):
                                        print(f"[ERRO] {api_name} - RabbitMQ não está acessível em {rabbitmq_host}:{rabbitmq_port}")
                                        print(f"[INFO] {api_name} - Verifique se o RabbitMQ está rodando: docker-compose up -d rabbitmq")
                                    else:
                                        print(f"[INFO] {api_name} - RabbitMQ está acessível, mas o consumer falhou")
                                        print(f"[INFO] {api_name} - Verifique as configurações do RabbitMQ no .env")
                                except Exception as e:
                                    print(f"[AVISO] {api_name} - Não foi possível obter detalhes do erro: {e}")
            
            for frontend_name, proc in frontend_processes.items():
                if proc.poll() is not None:
                    returncode = proc.returncode
                    error_key = f"frontend_{frontend_name}"
                    
                    if error_key not in consumer_errors_shown:
                        consumer_errors_shown.add(error_key)
                        print(f"[AVISO] {frontend_name} - Frontend parou (código: {returncode})")
                        
                        # Tentar obter mais informações do erro
                        try:
                            if proc.stderr:
                                try:
                                    stderr_output = proc.stderr.read(1000)
                                    if stderr_output:
                                        print(f"[ERRO] {frontend_name} - Erro: {stderr_output[:500]}")
                                except:
                                    pass
                            if proc.stdout:
                                try:
                                    stdout_output = proc.stdout.read(1000)
                                    if stdout_output and "error" in stdout_output.lower():
                                        print(f"[ERRO] {frontend_name} - Output: {stdout_output[:500]}")
                                except:
                                    pass
                        except Exception as e:
                            print(f"[AVISO] {frontend_name} - Não foi possível obter detalhes do erro: {e}")
                    
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

