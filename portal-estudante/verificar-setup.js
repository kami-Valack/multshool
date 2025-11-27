#!/usr/bin/env node

/**
 * Script para verificar se o projeto está configurado corretamente
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    log(`✓ ${description}`, 'green');
    return true;
  } else {
    log(`✗ ${description} não encontrado`, 'red');
    return false;
  }
}

function checkEnvFile() {
  const envPath = path.join(__dirname, '.env.local');
  if (!fs.existsSync(envPath)) {
    log('\n⚠ Arquivo .env.local não encontrado!', 'yellow');
    log('Crie o arquivo .env.local com as seguintes variáveis:', 'yellow');
    log(`
NEXT_PUBLIC_USERS_API_URL=http://localhost:8001/api
NEXT_PUBLIC_STUDENT_API_URL=http://localhost:8002/api
NEXT_PUBLIC_SCHOOL_API_URL=http://localhost:8003/api
NEXT_PUBLIC_BILLING_API_URL=http://localhost:8004/api
    `, 'blue');
    return false;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredVars = [
    'NEXT_PUBLIC_USERS_API_URL',
    'NEXT_PUBLIC_STUDENT_API_URL',
  ];

  let allPresent = true;
  requiredVars.forEach(varName => {
    if (envContent.includes(varName)) {
      log(`✓ Variável ${varName} configurada`, 'green');
    } else {
      log(`✗ Variável ${varName} não encontrada`, 'red');
      allPresent = false;
    }
  });

  return allPresent;
}

function checkApi(url, name) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: 'GET',
      timeout: 3000,
    };

    const req = http.request(options, (res) => {
      if (res.statusCode === 200 || res.statusCode === 401) {
        log(`✓ ${name} está respondendo (${res.statusCode})`, 'green');
        resolve(true);
      } else {
        log(`⚠ ${name} respondeu com status ${res.statusCode}`, 'yellow');
        resolve(false);
      }
    });

    req.on('error', (error) => {
      log(`✗ ${name} não está acessível: ${error.message}`, 'red');
      resolve(false);
    });

    req.on('timeout', () => {
      req.destroy();
      log(`✗ ${name} timeout (não está respondendo)`, 'red');
      resolve(false);
    });

    req.end();
  });
}

async function main() {
  log('\n🔍 Verificando configuração do Portal Estudante...\n', 'blue');

  // Verificar arquivos essenciais
  log('📁 Verificando arquivos...', 'blue');
  const files = [
    ['package.json', 'package.json'],
    ['src/config/api.ts', 'Configuração de API'],
    ['src/services/apiClient.ts', 'Cliente de API'],
    ['src/services/authService.ts', 'Serviço de autenticação'],
    ['src/contexts/AuthContext.tsx', 'Contexto de autenticação'],
  ];

  let allFilesOk = true;
  files.forEach(([filePath, description]) => {
    const fullPath = path.join(__dirname, filePath);
    if (!checkFile(fullPath, description)) {
      allFilesOk = false;
    }
  });

  // Verificar .env.local
  log('\n🔐 Verificando variáveis de ambiente...', 'blue');
  const envOk = checkEnvFile();

  // Verificar APIs (se .env.local existe)
  if (envOk) {
    log('\n🌐 Verificando APIs...', 'blue');
    const envPath = path.join(__dirname, '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');

    const usersApiMatch = envContent.match(/NEXT_PUBLIC_USERS_API_URL=(.+)/);
    const studentApiMatch = envContent.match(/NEXT_PUBLIC_STUDENT_API_URL=(.+)/);

    if (usersApiMatch) {
      const usersApiUrl = usersApiMatch[1].trim();
      await checkApi(`${usersApiUrl}/health`, 'API de Usuários');
    }

    if (studentApiMatch) {
      const studentApiUrl = studentApiMatch[1].trim();
      await checkApi(`${studentApiUrl}/health`, 'API de Estudantes');
    }
  }

  // Resumo
  log('\n📊 Resumo:', 'blue');
  if (allFilesOk && envOk) {
    log('✓ Configuração básica está OK!', 'green');
    log('\nPara iniciar o projeto, execute:', 'blue');
    log('  npm run dev', 'yellow');
  } else {
    log('⚠ Alguns problemas foram encontrados. Verifique acima.', 'yellow');
  }

  log('\n');
}

main().catch(console.error);

