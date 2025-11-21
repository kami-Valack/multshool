#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para testar cadastro, verificação e login de escolas no ms-users-api-laravel
"""

import requests
import json
import sys
from datetime import datetime

# Configuração
BASE_URL = "http://localhost:8000/api"
TEST_EMAIL = f"escola.teste.{datetime.now().strftime('%Y%m%d%H%M%S')}@example.com"
TEST_PASSWORD = "senha123456"
TEST_NAME = "Escola Teste"

# Variáveis globais
verification_token = None
access_token = None
refresh_token = None
school_id = None

def print_header(text):
    """Imprime um cabeçalho formatado"""
    print("\n" + "=" * 60)
    print(f"  {text}")
    print("=" * 60)

def print_success(text):
    """Imprime mensagem de sucesso"""
    print(f"[OK] {text}")

def print_error(text):
    """Imprime mensagem de erro"""
    print(f"[ERRO] {text}")

def print_info(text):
    """Imprime mensagem informativa"""
    print(f"[INFO] {text}")

def test_register_school():
    """Testa o cadastro de uma escola"""
    global verification_token, school_id
    
    print_header("1. TESTE: Cadastro de Escola")
    
    url = f"{BASE_URL}/auth/register-school"
    data = {
        "name": TEST_NAME,
        "email": TEST_EMAIL,
        "password": TEST_PASSWORD
    }
    
    print_info(f"Email: {TEST_EMAIL}")
    print_info(f"Nome: {TEST_NAME}")
    print_info(f"Enviando requisição para: {url}")
    
    try:
        response = requests.post(url, json=data)
        
        print_info(f"Status Code: {response.status_code}")
        
        # Verificar se a resposta é JSON
        try:
            result = response.json()
        except ValueError:
            print_error(f"Resposta não é JSON. Status: {response.status_code}")
            print_error(f"Resposta recebida (primeiros 1000 chars):")
            print(response.text[:1000])
            print_error(f"Content-Type: {response.headers.get('Content-Type', 'N/A')}")
            return False
        
        if response.status_code == 201:
            print_success("Escola cadastrada com sucesso!")
            print(f"Resposta: {json.dumps(result, indent=2, ensure_ascii=False)}")
            
            if 'user' in result:
                school_id = result['user'].get('id')
                print_info(f"School ID: {school_id}")
            
            # Verificar se email_verified é false
            if result.get('user', {}).get('email_verified') == False:
                print_success("Email não verificado (correto para novo cadastro)")
            else:
                print_error("Email deveria estar como não verificado!")
            
            print_info("IMPORTANTE: Verifique os logs do Laravel para obter o token de verificação")
            print_info("O token será enviado via RabbitMQ para o serviço de email")
            print_info("Para obter o token, verifique:")
            print_info("  - storage/logs/laravel.log")
            print_info("  - Ou o serviço de email que consome do RabbitMQ")
            
            return True
        else:
            print_error(f"Falha no cadastro. Status: {response.status_code}")
            print_error(f"Resposta: {json.dumps(result, indent=2, ensure_ascii=False)}")
            return False
            
    except requests.exceptions.ConnectionError:
        print_error("Não foi possível conectar ao servidor. Verifique se o servidor está rodando.")
        return False
    except Exception as e:
        print_error(f"Erro inesperado: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

def test_login_before_verification():
    """Testa login antes da verificação (deve falhar)"""
    print_header("2. TESTE: Login Antes da Verificação (deve falhar)")
    
    url = f"{BASE_URL}/auth/login"
    data = {
        "email": TEST_EMAIL,
        "password": TEST_PASSWORD
    }
    
    print_info(f"Tentando fazer login com email não verificado...")
    
    try:
        response = requests.post(url, json=data)
        
        try:
            result = response.json()
        except ValueError:
            print_error(f"Resposta não é JSON. Status: {response.status_code}")
            return False
        
        if response.status_code == 401:
            if "não verificado" in result.get('message', '').lower() or "verificado" in result.get('message', '').lower():
                print_success("Login bloqueado corretamente (email não verificado)")
                print(f"Mensagem: {result.get('message')}")
                return True
            else:
                print_error(f"Login falhou, mas mensagem inesperada: {result.get('message')}")
                return False
        else:
            print_error(f"Login deveria ter falhado, mas retornou status {response.status_code}")
            print_error(f"Resposta: {json.dumps(result, indent=2, ensure_ascii=False)}")
            return False
            
    except Exception as e:
        print_error(f"Erro: {str(e)}")
        return False

def test_verify_email(token=None):
    """Testa a verificação de email"""
    global verification_token, access_token, refresh_token
    
    print_header("3. TESTE: Verificação de Email")
    
    if not token:
        print_error("Token de verificação não fornecido!")
        print_info("Para obter o token:")
        print_info("1. Verifique os logs do Laravel: storage/logs/laravel.log")
        print_info("2. Procure por 'linkVerificacao' ou 'token' no log")
        print_info("3. Ou verifique o serviço de email que consome do RabbitMQ")
        print_info("\nOu forneça o token como argumento:")
        print_info("  python test_school_api.py <token_verificacao>")
        return False
    
    verification_token = token
    url = f"{BASE_URL}/auth/verify-email"
    data = {
        "token": verification_token
    }
    
    print_info(f"Token: {verification_token[:20]}...")
    print_info(f"Enviando requisição para: {url}")
    
    try:
        response = requests.post(url, json=data)
        
        try:
            result = response.json()
        except ValueError:
            print_error(f"Resposta não é JSON. Status: {response.status_code}")
            return False
        
        if response.status_code == 200:
            print_success("Email verificado com sucesso!")
            print(f"Resposta: {json.dumps(result, indent=2, ensure_ascii=False)}")
            return True
        else:
            print_error(f"Falha na verificação. Status: {response.status_code}")
            print_error(f"Resposta: {json.dumps(result, indent=2, ensure_ascii=False)}")
            return False
            
    except Exception as e:
        print_error(f"Erro: {str(e)}")
        return False

def test_login_after_verification():
    """Testa login após verificação (deve funcionar)"""
    global access_token, refresh_token
    
    print_header("4. TESTE: Login Após Verificação")
    
    url = f"{BASE_URL}/auth/login"
    data = {
        "email": TEST_EMAIL,
        "password": TEST_PASSWORD
    }
    
    print_info(f"Tentando fazer login após verificação...")
    
    try:
        response = requests.post(url, json=data)
        
        try:
            result = response.json()
        except ValueError:
            print_error(f"Resposta não é JSON. Status: {response.status_code}")
            return False
        
        if response.status_code == 200:
            print_success("Login realizado com sucesso!")
            print(f"Resposta: {json.dumps(result, indent=2, ensure_ascii=False)}")
            
            if 'accessToken' in result:
                access_token = result['accessToken']
                print_success(f"Access Token obtido: {access_token[:50]}...")
            
            if 'refreshToken' in result:
                refresh_token = result['refreshToken']
                print_success(f"Refresh Token obtido: {refresh_token[:50]}...")
            
            if 'user' in result:
                user = result['user']
                print_info(f"User ID: {user.get('id')}")
                print_info(f"Email: {user.get('email')}")
                print_info(f"Name: {user.get('name')}")
                print_info(f"Role: {user.get('role')}")
                
                if user.get('role') == 'school':
                    print_success("Role correto: school")
                else:
                    print_error(f"Role incorreto: {user.get('role')} (esperado: school)")
            
            return True
        else:
            print_error(f"Falha no login. Status: {response.status_code}")
            print_error(f"Resposta: {json.dumps(result, indent=2, ensure_ascii=False)}")
            return False
            
    except Exception as e:
        print_error(f"Erro: {str(e)}")
        return False

def test_me_endpoint():
    """Testa o endpoint /me com o token"""
    global access_token
    
    print_header("5. TESTE: Endpoint /me (Perfil)")
    
    if not access_token:
        print_error("Token de acesso não disponível. Execute o login primeiro.")
        return False
    
    url = f"{BASE_URL}/auth/me"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    
    print_info(f"Enviando requisição para: {url}")
    
    try:
        response = requests.get(url, headers=headers)
        
        try:
            result = response.json()
        except ValueError:
            print_error(f"Resposta não é JSON. Status: {response.status_code}")
            return False
        
        if response.status_code == 200:
            print_success("Perfil obtido com sucesso!")
            print(f"Resposta: {json.dumps(result, indent=2, ensure_ascii=False)}")
            
            if 'user' in result:
                user = result['user']
                if user.get('role') == 'school':
                    print_success("Role verificado: school")
                else:
                    print_error(f"Role incorreto: {user.get('role')}")
            
            return True
        else:
            print_error(f"Falha ao obter perfil. Status: {response.status_code}")
            print_error(f"Resposta: {json.dumps(result, indent=2, ensure_ascii=False)}")
            return False
            
    except Exception as e:
        print_error(f"Erro: {str(e)}")
        return False

def main():
    """Função principal"""
    print_header("TESTE DE CADASTRO E LOGIN DE ESCOLAS")
    print_info(f"Base URL: {BASE_URL}")
    print_info(f"Email de teste: {TEST_EMAIL}")
    print_info(f"Senha de teste: {TEST_PASSWORD}")
    
    results = []
    
    # 1. Cadastro
    results.append(("Cadastro", test_register_school()))
    
    # 2. Login antes da verificação (deve falhar)
    results.append(("Login antes da verificação", test_login_before_verification()))
    
    # 3. Verificação de email
    verification_token_arg = sys.argv[1] if len(sys.argv) > 1 else None
    if verification_token_arg:
        results.append(("Verificação de email", test_verify_email(verification_token_arg)))
        
        # 4. Login após verificação
        results.append(("Login após verificação", test_login_after_verification()))
        
        # 5. Endpoint /me
        results.append(("Endpoint /me", test_me_endpoint()))
    else:
        print_header("VERIFICAÇÃO DE EMAIL PULADA")
        print_info("Para testar a verificação, forneça o token como argumento:")
        print_info("  python test_school_api.py <token_verificacao>")
        print_info("\nPara obter o token:")
        print_info("1. Verifique os logs: storage/logs/laravel.log")
        print_info("2. Procure por 'linkVerificacao' ou 'token'")
        print_info("3. Ou verifique o serviço de email que consome do RabbitMQ")
    
    # Resumo
    print_header("RESUMO DOS TESTES")
    for test_name, result in results:
        status = "PASSOU" if result else "FALHOU"
        symbol = "[OK]" if result else "[ERRO]"
        print(f"{symbol} {test_name}: {status}")
    
    total = len(results)
    passed = sum(1 for _, result in results if result)
    failed = total - passed
    
    print(f"\nTotal: {total} | Passou: {passed} | Falhou: {failed}")
    
    if failed == 0:
        print_success("Todos os testes passaram!")
        return 0
    else:
        print_error(f"{failed} teste(s) falharam")
        return 1

if __name__ == "__main__":
    sys.exit(main())

