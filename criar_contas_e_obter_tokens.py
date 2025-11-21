#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para criar contas de estudante e escola e obter tokens JWT
Usa as variáveis de ambiente do .env para conectar ao banco de dados
"""

import requests
import json
import sys
import os
from datetime import datetime
from pathlib import Path

# Configuração das APIs
USERS_API_URL = "http://localhost:8000/api"

# Cores para output
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

def print_header(text):
    """Imprime um cabeçalho formatado"""
    print("\n" + "=" * 70)
    print(f"  {text}")
    print("=" * 70)

def print_success(text):
    """Imprime mensagem de sucesso"""
    print(f"{Colors.GREEN}[OK]{Colors.RESET} {text}")

def print_error(text):
    """Imprime mensagem de erro"""
    print(f"{Colors.RED}[ERRO]{Colors.RESET} {text}")

def print_info(text):
    """Imprime mensagem informativa"""
    print(f"{Colors.CYAN}[INFO]{Colors.RESET} {text}")

def print_warning(text):
    """Imprime mensagem de aviso"""
    print(f"{Colors.YELLOW}[AVISO]{Colors.RESET} {text}")

def check_api_health():
    """Verifica se a API está rodando"""
    try:
        response = requests.get(f"{USERS_API_URL}/health", timeout=5)
        if response.status_code == 200:
            return True
        return False
    except:
        return False

def criar_estudante(name=None, email=None, password="senha123456"):
    """Cria uma conta de estudante e retorna o token JWT"""
    print_header("Criando Conta de Estudante")
    
    if not name:
        name = f"Estudante Teste {datetime.now().strftime('%Y%m%d%H%M%S')}"
    if not email:
        email = f"estudante.teste.{datetime.now().strftime('%Y%m%d%H%M%S')}@example.com"
    
    print_info(f"Nome: {name}")
    print_info(f"Email: {email}")
    print_info(f"Senha: {password}")
    print()
    
    try:
        # 1. Registrar estudante
        print_info("1. Registrando estudante...")
        response = requests.post(
            f"{USERS_API_URL}/auth/register",
            json={
                "name": name,
                "email": email,
                "password": password
            },
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code != 201:
            data = response.json()
            if "já está em uso" in data.get('message', ''):
                print_warning("Email já existe. Tentando fazer login...")
                # Tentar fazer login
                return fazer_login(email, password, "student")
            else:
                print_error(f"Erro ao registrar: {data.get('message', 'Erro desconhecido')}")
                return None
        
        data = response.json()
        user_id = data['user']['id']
        student_id = data['user'].get('student_id')
        
        print_success(f"Estudante criado! ID: {user_id}")
        if student_id:
            print_success(f"Student ID: {student_id}")
        
        # 2. Obter token de verificação
        print_info("2. Obtendo token de verificação...")
        verification_token = obter_token_verificacao(email)
        
        if not verification_token:
            print_error("Não foi possível obter token de verificação")
            print_warning("Tentando obter via script PHP...")
            # Tentar novamente com mais detalhes
            script_path = Path(__file__).parent / "ms-users-api-laravel" / "obter_token_verificacao.php"
            if script_path.exists():
                print_info(f"Script encontrado: {script_path}")
                try:
                    import subprocess
                    result = subprocess.run(
                        ["php", str(script_path), email],
                        capture_output=True,
                        text=True,
                        timeout=10
                    )
                    print_info(f"Código de retorno: {result.returncode}")
                    print_info(f"Saída: {result.stdout}")
                    if result.stderr:
                        print_warning(f"Erros: {result.stderr}")
                    if result.returncode == 0 and result.stdout.strip():
                        verification_token = result.stdout.strip()
                        print_success(f"Token obtido: {verification_token[:20]}...")
                except Exception as e:
                    print_error(f"Erro ao executar script PHP: {e}")
            
            if not verification_token:
                print_warning("Você precisará verificar o email manualmente")
                print_info("Ou use o script PHP diretamente:")
                print_info(f"  php ms-users-api-laravel/obter_token_verificacao.php {email}")
                return None
        
        # 3. Verificar email
        print_info("3. Verificando email...")
        response = requests.post(
            f"{USERS_API_URL}/auth/verify-email",
            json={"token": verification_token},
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code != 200:
            print_error("Erro ao verificar email")
            return None
        
        print_success("Email verificado!")
        
        # 4. Fazer login e obter token JWT
        print_info("4. Fazendo login para obter token JWT...")
        return fazer_login(email, password, "student")
        
    except requests.exceptions.ConnectionError:
        print_error(f"Não foi possível conectar à API em {USERS_API_URL}")
        print_info("Certifique-se de que a API está rodando")
        return None
    except Exception as e:
        print_error(f"Erro: {e}")
        import traceback
        traceback.print_exc()
        return None

def criar_escola(name=None, email=None, password="senha123456"):
    """Cria uma conta de escola e retorna o token JWT"""
    print_header("Criando Conta de Escola")
    
    if not name:
        name = f"Escola Teste {datetime.now().strftime('%Y%m%d%H%M%S')}"
    if not email:
        email = f"escola.teste.{datetime.now().strftime('%Y%m%d%H%M%S')}@example.com"
    
    print_info(f"Nome: {name}")
    print_info(f"Email: {email}")
    print_info(f"Senha: {password}")
    print()
    
    try:
        # 1. Registrar escola
        print_info("1. Registrando escola...")
        response = requests.post(
            f"{USERS_API_URL}/auth/register-school",
            json={
                "name": name,
                "email": email,
                "password": password
            },
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code != 201:
            data = response.json()
            if "já está em uso" in data.get('message', ''):
                print_warning("Email já existe. Tentando fazer login...")
                return fazer_login(email, password, "school")
            else:
                print_error(f"Erro ao registrar: {data.get('message', 'Erro desconhecido')}")
                return None
        
        data = response.json()
        user_id = data['user']['id']
        
        print_success(f"Escola criada! ID: {user_id}")
        
        # 2. Obter token de verificação
        print_info("2. Obtendo token de verificação...")
        verification_token = obter_token_verificacao_escola(email)
        
        if not verification_token:
            print_error("Não foi possível obter token de verificação")
            print_warning("Tentando obter via script PHP...")
            # Tentar novamente com mais detalhes
            script_path = Path(__file__).parent / "ms-users-api-laravel" / "obter_token_verificacao.php"
            if script_path.exists():
                print_info(f"Script encontrado: {script_path}")
                try:
                    import subprocess
                    result = subprocess.run(
                        ["php", str(script_path), email],
                        capture_output=True,
                        text=True,
                        timeout=10
                    )
                    print_info(f"Código de retorno: {result.returncode}")
                    print_info(f"Saída: {result.stdout}")
                    if result.stderr:
                        print_warning(f"Erros: {result.stderr}")
                    if result.returncode == 0 and result.stdout.strip():
                        verification_token = result.stdout.strip()
                        print_success(f"Token obtido: {verification_token[:20]}...")
                except Exception as e:
                    print_error(f"Erro ao executar script PHP: {e}")
            
            if not verification_token:
                print_warning("Você precisará verificar o email manualmente")
                print_info("Ou use o script PHP diretamente:")
                print_info(f"  php ms-users-api-laravel/obter_token_verificacao.php {email}")
                return None
        
        # 3. Verificar email
        print_info("3. Verificando email...")
        print_info(f"Token usado: {verification_token[:20]}...")
        response = requests.post(
            f"{USERS_API_URL}/auth/verify-email",
            json={"token": verification_token},
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code != 200:
            print_error(f"Erro ao verificar email. Status: {response.status_code}")
            try:
                error_data = response.json()
                print_error(f"Resposta: {json.dumps(error_data, indent=2, ensure_ascii=False)}")
            except:
                print_error(f"Resposta: {response.text}")
            return None
        
        print_success("Email verificado!")
        
        # 4. Fazer login e obter token JWT
        print_info("4. Fazendo login para obter token JWT...")
        return fazer_login(email, password, "school")
        
    except requests.exceptions.ConnectionError:
        print_error(f"Não foi possível conectar à API em {USERS_API_URL}")
        print_info("Certifique-se de que a API está rodando")
        return None
    except Exception as e:
        print_error(f"Erro: {e}")
        import traceback
        traceback.print_exc()
        return None

def fazer_login(email, password, role):
    """Faz login e retorna o token JWT"""
    try:
        response = requests.post(
            f"{USERS_API_URL}/auth/login",
            json={
                "email": email,
                "password": password
            },
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code != 200:
            data = response.json()
            print_error(f"Erro no login: {data.get('message', 'Erro desconhecido')}")
            return None
        
        data = response.json()
        if data.get('status') == 'success' and 'accessToken' in data:
            token = data['accessToken']
            refresh_token = data.get('refreshToken')
            user = data.get('user', {})
            
            print_success("Login realizado com sucesso!")
            print()
            print(f"{Colors.BOLD}Token JWT:{Colors.RESET}")
            print(f"{Colors.GREEN}{token}{Colors.RESET}")
            print()
            
            if refresh_token:
                print(f"{Colors.BOLD}Refresh Token:{Colors.RESET}")
                print(f"{Colors.GREEN}{refresh_token}{Colors.RESET}")
                print()
            
            return {
                'token': token,
                'refresh_token': refresh_token,
                'user': user,
                'email': email,
                'password': password,
                'role': role
            }
        else:
            print_error("Resposta não contém token")
            return None
            
    except Exception as e:
        print_error(f"Erro ao fazer login: {e}")
        return None

def obter_token_verificacao(email):
    """Obtém token de verificação do banco de dados via script PHP"""
    try:
        # Tentar usar o script PHP se existir
        script_path = Path(__file__).parent / "ms-users-api-laravel" / "obter_token_verificacao.php"
        if script_path.exists():
            import subprocess
            result = subprocess.run(
                ["php", str(script_path), email],
                capture_output=True,
                text=True,
                timeout=10
            )
            if result.returncode == 0:
                # O script retorna apenas o token
                token = result.stdout.strip()
                if token and len(token) > 10:  # Token válido deve ter mais de 10 caracteres
                    return token
        return None
    except Exception as e:
        print_warning(f"Erro ao obter token via PHP: {e}")
        return None

def obter_token_verificacao_escola(email):
    """Obtém token de verificação de escola do banco de dados via script PHP"""
    try:
        # Usar o script genérico (funciona para ambos)
        script_path = Path(__file__).parent / "ms-users-api-laravel" / "obter_token_verificacao.php"
        if script_path.exists():
            import subprocess
            result = subprocess.run(
                ["php", str(script_path), email],
                capture_output=True,
                text=True,
                timeout=10
            )
            if result.returncode == 0:
                token = result.stdout.strip()
                if token and len(token) > 10:
                    return token
        return None
    except Exception as e:
        print_warning(f"Erro ao obter token via PHP: {e}")
        return None

def salvar_tokens(estudante_data, escola_data):
    """Salva os tokens em arquivo JSON"""
    output = {
        'estudante': estudante_data,
        'escola': escola_data,
        'criado_em': datetime.now().isoformat()
    }
    
    filename = 'tokens_contas.json'
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print_success(f"Tokens salvos em: {filename}")

def main():
    print_header("Criador de Contas e Obtenção de Tokens JWT")
    
    # Verificar se API está rodando
    print_info("Verificando se a API está rodando...")
    if not check_api_health():
        print_error(f"A API não está respondendo em {USERS_API_URL}")
        print_info("Execute: python start_ms_users_api.py")
        sys.exit(1)
    
    print_success("API está rodando!")
    print()
    
    # Criar estudante
    estudante_data = criar_estudante()
    print()
    
    # Criar escola
    escola_data = criar_escola()
    print()
    
    # Resumo
    print_header("Resumo")
    
    if estudante_data:
        print_success("Estudante criado com sucesso!")
        print(f"  Email: {estudante_data['email']}")
        print(f"  Student ID: {estudante_data['user'].get('student_id', 'N/A')}")
        print(f"  Token: {estudante_data['token'][:50]}...")
    else:
        print_error("Falha ao criar estudante")
    
    print()
    
    if escola_data:
        print_success("Escola criada com sucesso!")
        print(f"  Email: {escola_data['email']}")
        print(f"  Token: {escola_data['token'][:50]}...")
    else:
        print_error("Falha ao criar escola")
    
    print()
    
    # Salvar tokens
    if estudante_data or escola_data:
        salvar_tokens(estudante_data, escola_data)
        print()
        print_info("Use os tokens salvos em tokens_contas.json para testar as APIs")
    
    print()
    print_header("Tokens Completos")
    
    if estudante_data:
        print(f"\n{Colors.BOLD}ESTUDANTE:{Colors.RESET}")
        print(f"Email: {estudante_data['email']}")
        print(f"Senha: {estudante_data['password']}")
        print(f"Token JWT: {estudante_data['token']}")
        if estudante_data.get('refresh_token'):
            print(f"Refresh Token: {estudante_data['refresh_token']}")
    
    if escola_data:
        print(f"\n{Colors.BOLD}ESCOLA:{Colors.RESET}")
        print(f"Email: {escola_data['email']}")
        print(f"Senha: {escola_data['password']}")
        print(f"Token JWT: {escola_data['token']}")
        if escola_data.get('refresh_token'):
            print(f"Refresh Token: {escola_data['refresh_token']}")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print()
        print()
        print_warning("Operação cancelada pelo usuário")
        sys.exit(1)
    except Exception as e:
        print_error(f"Erro fatal: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

