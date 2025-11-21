#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de teste completo para a API de Autenticação
Testa todos os endpoints da API usando o email reduaneamin@gmail.com
"""

import requests
import json
import time
import sys
import io
from typing import Dict, Optional

# Configurar encoding UTF-8 para Windows
if sys.platform == 'win32':
    try:
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')
    except:
        pass

# Configuração
BASE_URL = "http://localhost:3000/api/auth"
TEST_EMAIL = "reduaneamin@gmail.com"
TEST_PASSWORD = "SenhaSegura123!@#"  # Deve conter: maiúscula, minúscula, número e caractere especial
TEST_NAME = "Reduane Amin"

# Token de verificação (opcional - será extraído do RabbitMQ se não fornecido)
# Para usar manualmente, descomente e cole o token aqui:
# VERIFICATION_TOKEN = "seu_token_de_verificacao_aqui"
VERIFICATION_TOKEN = None

class Colors:
    """Cores para output no terminal"""
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

class APITester:
    def __init__(self, base_url: str, email: str, password: str, name: str):
        self.base_url = base_url
        self.email = email
        self.password = password
        self.name = name
        self.access_token: Optional[str] = None
        self.refresh_token: Optional[str] = None
        self.user_id: Optional[str] = None
        self.reset_token: Optional[str] = None
        self.verification_token: Optional[str] = None

    def print_success(self, message: str):
        try:
            print(f"{Colors.GREEN}{SUCCESS} {message}{Colors.RESET}")
        except:
            print(f"[OK] {message}")

    def print_error(self, message: str):
        try:
            print(f"{Colors.RED}{ERROR} {message}{Colors.RESET}")
        except:
            print(f"[ERRO] {message}")

    def print_info(self, message: str):
        try:
            print(f"{Colors.BLUE}{INFO} {message}{Colors.RESET}")
        except:
            print(f"[INFO] {message}")

    def print_section(self, title: str):
        print(f"\n{Colors.BOLD}{Colors.YELLOW}{'='*60}")
        print(f"{title}")
        print(f"{'='*60}{Colors.RESET}\n")

    def safe_json(self, response: requests.Response) -> Dict:
        """Tenta fazer parse do JSON de forma segura"""
        try:
            return response.json()
        except json.JSONDecodeError:
            return {"error": response.text or "Resposta não é JSON válido"}
        except Exception as e:
            return {"error": f"Erro ao processar resposta: {str(e)}"}

    def make_request(self, method: str, endpoint: str, data: Optional[Dict] = None, 
                    headers: Optional[Dict] = None) -> requests.Response:
        """Faz uma requisição HTTP"""
        url = f"{self.base_url}{endpoint}"
        try:
            if method.upper() == "GET":
                response = requests.get(url, headers=headers)
            elif method.upper() == "POST":
                response = requests.post(url, json=data, headers=headers)
            elif method.upper() == "PUT":
                response = requests.put(url, json=data, headers=headers)
            elif method.upper() == "DELETE":
                response = requests.delete(url, headers=headers)
            else:
                raise ValueError(f"Método HTTP não suportado: {method}")
            return response
        except requests.exceptions.ConnectionError:
            self.print_error(f"Não foi possível conectar à API em {url}")
            self.print_info("Certifique-se de que a API está rodando (npm run dev)")
            raise
        except Exception as e:
            self.print_error(f"Erro na requisição: {str(e)}")
            raise

    def test_register(self) -> bool:
        """Testa o registro de usuário"""
        self.print_section("1. TESTE DE REGISTRO")
        
        data = {
            "email": self.email,
            "password": self.password,
            "name": self.name
        }
        
        self.print_info(f"Registrando usuário: {self.email}")
        response = self.make_request("POST", "/register", data=data)
        
        if response.status_code == 201:
            result = self.safe_json(response)
            self.user_id = result.get("user", {}).get("id")
            self.print_success(f"Usuário registrado com sucesso!")
            self.print_info(f"ID do usuário: {self.user_id}")
            self.print_info(f"Email: {result.get('user', {}).get('email')}")
            self.print_info(f"Nome: {result.get('user', {}).get('name')}")
            print(f"\n{Colors.YELLOW}⚠ IMPORTANTE: Email de verificação foi enviado ao RabbitMQ{Colors.RESET}")
            print(f"{Colors.YELLOW}   Você precisa verificar o email antes de fazer login!{Colors.RESET}")
            print(f"{Colors.BLUE}   Verifique o RabbitMQ para obter o token de verificação{Colors.RESET}")
            return True
        elif response.status_code == 400:
            result = self.safe_json(response)
            error = result.get("error", "Erro desconhecido")
            details = result.get("details", [])
            
            if "já está em uso" in error:
                self.print_info(f"Usuário já existe. Continuando com os testes...")
                return True
            else:
                self.print_error(f"Erro no registro: {error}")
                if details:
                    details_str = ', '.join(details) if isinstance(details, list) else str(details)
                    self.print_info(f"Detalhes: {details_str}")
                return False
        else:
            self.print_error(f"Erro no registro: {response.status_code} - {response.text}")
            return False

    def test_verify_email(self, token: Optional[str] = None) -> bool:
        """Testa a verificação de email"""
        self.print_section("2. TESTE DE VERIFICAÇÃO DE EMAIL")
        
        if not token:
            self.print_error("Token de verificação não fornecido")
            self.print_info("Para obter o token, verifique o RabbitMQ após o registro")
            self.print_info("Ou forneça o token como parâmetro: test_verify_email('seu_token_aqui')")
            return False
        
        data = {
            "token": token
        }
        
        self.print_info(f"Verificando email com token: {token[:20]}...")
        response = self.make_request("POST", "/verify-email", data=data)
        
        if response.status_code == 200:
            result = self.safe_json(response)
            self.print_success("Email verificado com sucesso!")
            self.print_info(f"Mensagem: {result.get('message')}")
            self.verification_token = token
            return True
        else:
            result = self.safe_json(response)
            error = result.get("error", "Erro desconhecido")
            self.print_error(f"Erro na verificação: {error}")
            return False

    def test_login(self, expect_failure: bool = False) -> bool:
        """Testa o login"""
        self.print_section("3. TESTE DE LOGIN")
        
        data = {
            "email": self.email,
            "password": self.password
        }
        
        self.print_info(f"Fazendo login com: {self.email}")
        response = self.make_request("POST", "/login", data=data)
        
        result = self.safe_json(response)
        
        if expect_failure:
            # Esperamos que falhe se email não estiver verificado
            if response.status_code == 401:
                error = result.get("error", response.text or "Erro desconhecido")
                
                if "não verificado" in error.lower() or "verificado" in error.lower():
                    self.print_success("Login bloqueado corretamente (email não verificado)")
                    self.print_info(f"Erro esperado: {error}")
                    return True
                else:
                    self.print_error(f"Erro inesperado: {error}")
                    return False
            else:
                error = result.get("error", response.text or f"Status {response.status_code}")
                self.print_error(f"Esperava falha (401), mas recebeu: {response.status_code} - {error}")
                return False
        else:
            # Login normal
            if response.status_code == 200:
                self.access_token = result.get("accessToken")
                self.refresh_token = result.get("refreshToken")
                self.user_id = result.get("user", {}).get("id")
                
                if not self.access_token or not self.refresh_token:
                    self.print_error(f"Tokens não recebidos. Resposta: {result}")
                    return False
                
                self.print_success("Login realizado com sucesso!")
                self.print_info(f"Access Token: {self.access_token[:50]}...")
                self.print_info(f"Refresh Token: {self.refresh_token[:50]}...")
                self.print_info(f"Expira em: {result.get('expiresIn')} segundos")
                return True
            else:
                error = result.get("error", response.text or f"Erro {response.status_code}")
                self.print_error(f"Erro no login ({response.status_code}): {error}")
                return False

    def test_refresh_token(self) -> bool:
        """Testa a renovação do token"""
        self.print_section("4. TESTE DE REFRESH TOKEN")
        
        if not self.refresh_token:
            self.print_error("Refresh token não disponível. Execute o login primeiro.")
            return False
        
        data = {
            "refreshToken": self.refresh_token
        }
        
        self.print_info("Renovando tokens...")
        response = self.make_request("POST", "/refresh-token", data=data)
        
        if response.status_code == 200:
            result = self.safe_json(response)
            old_access_token = self.access_token
            self.access_token = result.get("accessToken")
            self.refresh_token = result.get("refreshToken")
            
            self.print_success("Tokens renovados com sucesso!")
            self.print_info(f"Novo Access Token: {self.access_token[:50]}...")
            self.print_info(f"Novo Refresh Token: {self.refresh_token[:50]}...")
            self.print_info(f"Token anterior revogado: {old_access_token != self.access_token}")
            return True
        else:
            self.print_error(f"Erro ao renovar token: {response.status_code} - {response.text}")
            return False

    def test_request_password_reset(self) -> bool:
        """Testa a solicitação de recuperação de senha"""
        self.print_section("5. TESTE DE RECUPERAÇÃO DE SENHA")
        
        data = {
            "email": self.email
        }
        
        self.print_info(f"Solicitando recuperação de senha para: {self.email}")
        response = self.make_request("POST", "/password-reset/request", data=data)
        
        if response.status_code == 200:
            result = self.safe_json(response)
            self.print_success("Solicitação de recuperação enviada!")
            self.print_info(f"Mensagem: {result.get('message')}")
            print(f"\n{Colors.GREEN}→ Evento de email 'recuperacao de senha' deve ter sido enviado ao RabbitMQ{Colors.RESET}")
            self.print_info("Verifique o RabbitMQ para ver o token de recuperação")
            return True
        else:
            self.print_error(f"Erro ao solicitar recuperação: {response.status_code} - {response.text}")
            return False

    def test_logout(self) -> bool:
        """Testa o logout"""
        self.print_section("6. TESTE DE LOGOUT")
        
        if not self.refresh_token:
            self.print_error("Refresh token não disponível.")
            return False
        
        data = {
            "refreshToken": self.refresh_token
        }
        
        self.print_info("Fazendo logout...")
        response = self.make_request("POST", "/logout", data=data)
        
        if response.status_code == 200:
            self.print_success("Logout realizado com sucesso!")
            self.print_info("Refresh token revogado")
            # Limpar tokens após logout
            self.access_token = None
            self.refresh_token = None
            return True
        else:
            self.print_error(f"Erro no logout: {response.status_code} - {response.text}")
            return False

    def test_logout_all_devices(self) -> bool:
        """Testa o logout de todos os dispositivos"""
        self.print_section("7. TESTE DE LOGOUT DE TODOS OS DISPOSITIVOS")
        
        # Primeiro fazer login novamente
        if not self.access_token:
            self.print_info("Fazendo login novamente para testar logout de todos os dispositivos...")
            if not self.test_login():
                return False
        
        headers = {
            "Authorization": f"Bearer {self.access_token}"
        }
        
        self.print_info("Fazendo logout de todos os dispositivos...")
        response = self.make_request("POST", "/logout-all", headers=headers)
        
        if response.status_code == 200:
            self.print_success("Logout de todos os dispositivos realizado!")
            self.print_info("Todos os refresh tokens foram revogados")
            self.access_token = None
            self.refresh_token = None
            return True
        else:
            self.print_error(f"Erro no logout de todos os dispositivos: {response.status_code} - {response.text}")
            return False

    def test_health_check(self) -> bool:
        """Testa o health check"""
        self.print_section("0. TESTE DE HEALTH CHECK")
        
        try:
            response = requests.get("http://localhost:3000/health")
            if response.status_code == 200:
                try:
                    result = response.json()
                except:
                    result = {"status": "ok", "timestamp": "N/A"}
                self.print_success("API está respondendo!")
                self.print_info(f"Status: {result.get('status')}")
                self.print_info(f"Timestamp: {result.get('timestamp')}")
                return True
            else:
                self.print_error(f"Health check falhou: {response.status_code}")
                return False
        except Exception as e:
            self.print_error(f"Erro no health check: {str(e)}")
            return False

    def run_all_tests(self):
        """Executa todos os testes em sequência"""
        print(f"\n{Colors.BOLD}{Colors.BLUE}")
        print("="*60)
        print("  TESTE COMPLETO DA API DE AUTENTICAÇÃO")
        print("="*60)
        print(f"{Colors.RESET}")
        print(f"Email de teste: {Colors.YELLOW}{self.email}{Colors.RESET}")
        print(f"URL da API: {Colors.YELLOW}{self.base_url}{Colors.RESET}\n")
        
        results = []
        
        # Health check
        results.append(("Health Check", self.test_health_check()))
        time.sleep(1)
        
        # Registro
        results.append(("Registro", self.test_register()))
        time.sleep(1)
        
        # Tentar login sem verificar (deve falhar)
        results.append(("Login (sem verificação - deve falhar)", self.test_login(expect_failure=True)))
        time.sleep(1)
        
        # Verificação de email
        verification_token_to_use = self.verification_token or VERIFICATION_TOKEN
        
        if not verification_token_to_use:
            print(f"\n{Colors.YELLOW}{Colors.BOLD}⚠ ATENÇÃO: Para continuar, você precisa do token de verificação!{Colors.RESET}")
            print(f"{Colors.BLUE}1. Verifique o RabbitMQ para ver o evento 'verificacao de conta'{Colors.RESET}")
            print(f"{Colors.BLUE}2. Extraia o token do campo 'linkVerificacao' na URL (parte após token=){Colors.RESET}")
            print(f"{Colors.BLUE}3. Ou defina VERIFICATION_TOKEN no início do arquivo test_api.py{Colors.RESET}")
            print(f"{Colors.BLUE}4. Ou use: tester.test_verify_email('seu_token') manualmente{Colors.RESET}\n")
            print(f"{Colors.YELLOW}⚠ Pulando verificação de email (token não disponível){Colors.RESET}\n")
            results.append(("Verificação de Email", False))
            time.sleep(1)
        else:
            results.append(("Verificação de Email", self.test_verify_email(verification_token_to_use)))
            time.sleep(1)
        
        # Login após verificação
        results.append(("Login (após verificação)", self.test_login()))
        time.sleep(1)
        
        # Refresh Token
        results.append(("Refresh Token", self.test_refresh_token()))
        time.sleep(1)
        
        # Recuperação de Senha
        results.append(("Recuperação de Senha", self.test_request_password_reset()))
        time.sleep(1)
        
        # Login novamente para testar logout
        if not self.access_token:
            results.append(("Login (novamente)", self.test_login()))
            time.sleep(1)
        
        # Logout
        results.append(("Logout", self.test_logout()))
        time.sleep(1)
        
        # Login novamente para testar logout-all
        results.append(("Login (para logout-all)", self.test_login()))
        time.sleep(1)
        
        # Logout de todos os dispositivos
        results.append(("Logout de Todos os Dispositivos", self.test_logout_all_devices()))
        
        # Resumo
        self.print_section("RESUMO DOS TESTES")
        
        passed = sum(1 for _, result in results if result)
        total = len(results)
        
        for test_name, result in results:
            status = f"{Colors.GREEN}✓ PASSOU{Colors.RESET}" if result else f"{Colors.RED}✗ FALHOU{Colors.RESET}"
            print(f"{test_name:.<50} {status}")
        
        print(f"\n{Colors.BOLD}Total: {passed}/{total} testes passaram{Colors.RESET}\n")
        
        if passed == total:
            print(f"{Colors.GREEN}{Colors.BOLD}🎉 Todos os testes passaram!{Colors.RESET}\n")
        else:
            print(f"{Colors.RED}{Colors.BOLD}⚠ Alguns testes falharam{Colors.RESET}\n")

def main():
    """Função principal"""
    tester = APITester(
        base_url=BASE_URL,
        email=TEST_EMAIL,
        password=TEST_PASSWORD,
        name=TEST_NAME
    )
    
    try:
        tester.run_all_tests()
    except KeyboardInterrupt:
        print(f"\n{Colors.YELLOW}Testes interrompidos pelo usuário{Colors.RESET}")
    except Exception as e:
        print(f"\n{Colors.RED}Erro inesperado: {str(e)}{Colors.RESET}")

if __name__ == "__main__":
    main()

