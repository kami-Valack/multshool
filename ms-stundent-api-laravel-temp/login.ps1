# Script PowerShell para fazer login e obter token
# Uso: .\login.ps1 -Email "seu-email@example.com" -Password "sua-senha"

param(
    [Parameter(Mandatory=$true)]
    [string]$Email,
    
    [Parameter(Mandatory=$true)]
    [string]$Password,
    
    [string]$ApiUrl = "http://localhost:8000"
)

Write-Host "=== Login no ms-users-api-laravel ===" -ForegroundColor Cyan
Write-Host "Email: $Email" -ForegroundColor Yellow
Write-Host "API URL: $ApiUrl" -ForegroundColor Yellow
Write-Host ""

# Fazer login
$body = @{
    email = $Email
    password = $Password
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$ApiUrl/api/auth/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $body
    
    if ($response.status -eq "success") {
        Write-Host "✓ Login realizado com sucesso!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Token JWT:" -ForegroundColor Cyan
        Write-Host $response.accessToken -ForegroundColor White
        Write-Host ""
        Write-Host "Informações do usuário:" -ForegroundColor Cyan
        Write-Host "  ID: $($response.user.id)" -ForegroundColor White
        Write-Host "  Student ID: $($response.user.student_id)" -ForegroundColor White
        Write-Host "  Email: $($response.user.email)" -ForegroundColor White
        Write-Host "  Nome: $($response.user.name)" -ForegroundColor White
        Write-Host "  Role: $($response.user.role)" -ForegroundColor White
        Write-Host ""
        Write-Host "Para usar o token no ms-stundent-api-laravel:" -ForegroundColor Yellow
        Write-Host "curl -X GET http://localhost:8001/api/me -H `"Authorization: Bearer $($response.accessToken)`"" -ForegroundColor Gray
        
        # Salvar token em variável de ambiente (opcional)
        $env:JWT_TOKEN = $response.accessToken
        Write-Host ""
        Write-Host "Token salvo em `$env:JWT_TOKEN" -ForegroundColor Green
    } else {
        Write-Host "✗ Erro no login: $($response.message)" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Erro ao fazer login:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    if ($_.ErrorDetails.Message) {
        Write-Host $_.ErrorDetails.Message -ForegroundColor Red
    }
}

