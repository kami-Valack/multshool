#!/usr/bin/env bash
# Corre seeders demo em todas as APIs Laravel (dentro do Docker Compose).
set -euo pipefail

cd "$(dirname "$0")/.."

seed() {
  local service="$1"
  echo "==> Seeding $service"
  docker compose exec -T "$service" php artisan db:seed --force
}

seed ms-users
seed ms-student
seed ms-admin
seed ms-school

echo ""
echo "Contas demo (password Senha123! excepto admin):"
echo "  admin / admin                          (ms-admin)"
echo "  escola.medio@demo.multshool.ao"
echo "  escola.superior@demo.multshool.ao"
echo "  prof.antonio@demo.multshool.ao"
echo "  prof.maria@demo.multshool.ao"
echo "  prof.joao@demo.multshool.ao"
echo "  aluno.carlos@demo.multshool.ao"
echo "  aluno.ana@demo.multshool.ao"
echo "  aluno.pedro@demo.multshool.ao"
