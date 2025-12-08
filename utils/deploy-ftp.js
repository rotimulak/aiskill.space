#!/usr/bin/env node

/**
 * FTP Deploy Script
 *
 * Этот скрипт:
 * 1. Выполняет production сборку (npm run build)
 * 2. Загружает содержимое папки dist/ на FTP сервер
 *
 * Использование:
 *   node utils/deploy-ftp.js [domain]
 *
 * Примеры:
 *   node utils/deploy-ftp.js              # деплой на envise.space (по умолчанию)
 *   node utils/deploy-ftp.js aiskill.space # деплой на aiskill.space
 *
 * Требования:
 *   npm install --save-dev basic-ftp
 */

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Получение домена из аргументов командной строки
const DOMAIN = process.argv[2] || 'envise.space';

// Конфигурация FTP
const FTP_HOST = 'c174a6863fb6.hosting.myjino.ru';
const FTP_PORT = 21;
const FTP_USER = 'j98543904_sdwebsite';
const FTP_PASSWORD = '}qz46567Ly8Q';
const FTP_REMOTE_PATH = `/${DOMAIN}`;
const PROJECT_DIR = path.join(__dirname, '..');
const LOCAL_BUILD_DIR = path.join(PROJECT_DIR, 'dist');

async function uploadWithRetry(client, localPath, remotePath, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await client.uploadFrom(localPath, remotePath);
      return true;
    } catch (err) {
      console.log(`⚠️  Повтор ${i + 1}/${retries} для ${remotePath}`);
      if (i === retries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, 2000)); // Пауза 2 сек
    }
  }
}

async function deploy() {
  const client = new ftp.Client();
  client.ftp.verbose = true; // Включаем детальные логи

  // Настройка таймаутов
  client.ftp.timeout = 120000; // 120 секунд на операцию (увеличено)

  try {
    console.log(`\n🚀 Начало деплоя на ${DOMAIN}...\n`);

    // Шаг 1: Сборка проекта
    console.log('📦 Шаг 1/3: Сборка проекта...');
    try {
      execSync('npm run build', {
        stdio: 'inherit',
        cwd: PROJECT_DIR
      });
      console.log('✅ Сборка завершена успешно\n');
    } catch (error) {
      console.error('❌ Ошибка при сборке:', error.message);
      process.exit(1);
    }

    // Проверка наличия папки dist
    if (!fs.existsSync(LOCAL_BUILD_DIR)) {
      throw new Error(`Папка dist не найдена: ${LOCAL_BUILD_DIR}`);
    }

    // Шаг 2: Подключение к FTP
    console.log('🔌 Шаг 2/3: Подключение к FTP серверу...');
    console.log(`   Хост: ${FTP_HOST}:${FTP_PORT}`);
    console.log(`   Пользователь: ${FTP_USER}\n`);

    await client.access({
      host: FTP_HOST,
      port: FTP_PORT,
      user: FTP_USER,
      password: FTP_PASSWORD,
      secure: false, // Используем обычный FTP (не FTPS)
      secureOptions: { rejectUnauthorized: false },
      pasv: true // ВАЖНО: Пассивный режим для работы через файрволы
    });
    console.log('✅ Подключение установлено\n');

    // Переход в целевую папку
    console.log(`📁 Переход в папку: ${FTP_REMOTE_PATH}`);
    await client.cd(FTP_REMOTE_PATH);

    // Шаг 3: Загрузка файлов
    console.log('📤 Шаг 3/3: Загрузка файлов на сервер...');
    console.log(`   Локальная папка: ${LOCAL_BUILD_DIR}`);
    console.log(`   Удаленная папка: ${FTP_REMOTE_PATH}\n`);

    // Загрузка с прогрессом и логированием
    let fileCount = 0;
    await client.uploadFromDir(LOCAL_BUILD_DIR, FTP_REMOTE_PATH, {
      overwrite: 'all',
      chunkSize: 512000, // 500KB чанки для более стабильной передачи
      filter: (filePath) => {
        fileCount++;
        const relativePath = path.relative(LOCAL_BUILD_DIR, filePath);
        console.log(`📄 ${fileCount}. Загрузка: ${relativePath}`);
        return true; // Загружаем все файлы
      }
    });

    console.log('\n✅ Файлы успешно загружены!');
    console.log('\n🎉 Деплой завершен успешно!');
    console.log(`\n🌐 Сайт доступен по адресу: https://${DOMAIN}`);

  } catch (error) {
    console.error('\n❌ Ошибка при деплое:', error.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

// Запуск деплоя
deploy();
