#!/usr/bin/env python3
"""
Script simples para obter token de uma escola
"""

import requests
import json
import sys

# Configuração
BASE_URL = "http://localhost:8000/api"
TEST_EMAIL = "escola.teste.20251110064716@example.com"
TEST_PASSWORD = "senha1234567"

def obter_token():
    """Obtém o token de acesso da escola"""
    print(f"\n🔐 Obtendo token para: {TEST_EMAIL}")
    print(f"URL: {BASE_URL}/auth/login")
    print("-" * 60)
    
    try:
        payload = {
            "email": TEST_EMAIL,
            "password": TEST_PASSWORD
        }
        
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            
            if data.get('status') == 'success' and 'accessToken' in data:
                access_token = data['accessToken']
                refresh_token = data.get('refreshToken', 'N/A')
                
                print("\n✅ Login realizado com sucesso!")
                print("\n📋 Informações do Token:")
                print("-" * 60)
                print(f"Access Token: {access_token}")
                print(f"Refresh Token: {refresh_token}")
                print("-" * 60)
                
                if 'user' in data:
                    user = data['user']
                    print(f"\n👤 Informações do Usuário:")
                    print(f"   ID: {user.get('id')}")
                    print(f"   Nome: {user.get('name')}")
                    print(f"   Email: {user.get('email')}")
                    print(f"   Role: {user.get('role')}")
                
                print("\n💡 Para usar o token em requisições:")
                print(f'   Authorization: Bearer {access_token}')
                
                # Salvar token em arquivo (opcional)
                try:
                    with open('token_escola.txt', 'w') as f:
                        f.write(access_token)
                    print("\n💾 Token salvo em: token_escola.txt")
                except:
                    pass
                
                return access_token
            else:
                print(f"\n❌ Erro: Resposta não contém token")
                print(f"Resposta: {json.dumps(data, indent=2, ensure_ascii=False)}")
                return None
        else:
            print(f"\n❌ Erro no login. Status: {response.status_code}")
            try:
                data = response.json()
                print(f"Resposta: {json.dumps(data, indent=2, ensure_ascii=False)}")
            except:
                print(f"Resposta: {response.text}")
            return None
            
    except requests.exceptions.ConnectionError:
        print(f"\n❌ Erro: Não foi possível conectar ao servidor em {BASE_URL}")
        print("   Verifique se o servidor está rodando: php artisan serve")
        return None
    except Exception as e:
        print(f"\n❌ Erro: {e}")
        import traceback
        traceback.print_exc()
        return None

if __name__ == "__main__":
    token = obter_token()
    if token:
        sys.exit(0)
    else:
        sys.exit(1)

