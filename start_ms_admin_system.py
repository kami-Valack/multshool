#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para iniciar o MS Admin System
Porta: 8002
"""

import subprocess
import sys
import os
from pathlib import Path

def main():
    print("=" * 60)
    print("  Iniciando MS Admin System")
    print("=" * 60)
    print()
    
    # Diretório do projeto
    project_dir = Path(__file__).parent / "ms-admin-system"
    
    if not project_dir.exists():
        print(f"[ERRO] Diretório não encontrado: {project_dir}")
        sys.exit(1)
    
    os.chdir(project_dir)
    
    print(f"[INFO] Diretório: {project_dir}")
    print(f"[INFO] Porta: 8002")
    print(f"[INFO] URL: http://localhost:8002")
    print()
    print("[INFO] Iniciando servidor...")
    print("[INFO] Pressione Ctrl+C para parar")
    print()
    print("-" * 60)
    print()
    
    try:
        # Iniciar servidor Laravel
        subprocess.run([
            "php", "artisan", "serve", "--port=8002"
        ], check=True)
    except KeyboardInterrupt:
        print()
        print()
        print("[INFO] Servidor parado pelo usuário")
        sys.exit(0)
    except FileNotFoundError:
        print("[ERRO] PHP não encontrado. Certifique-se de que o PHP está instalado e no PATH")
        sys.exit(1)
    except Exception as e:
        print(f"[ERRO] Erro ao iniciar servidor: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()

