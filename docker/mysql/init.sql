CREATE DATABASE IF NOT EXISTS `ms-users-api` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS `ms-student-api` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS `ms-admin-api` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS `ms-school-api` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS `ms-billing-api` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

GRANT ALL PRIVILEGES ON `ms-users-api`.* TO 'multshool'@'%';
GRANT ALL PRIVILEGES ON `ms-student-api`.* TO 'multshool'@'%';
GRANT ALL PRIVILEGES ON `ms-admin-api`.* TO 'multshool'@'%';
GRANT ALL PRIVILEGES ON `ms-school-api`.* TO 'multshool'@'%';
GRANT ALL PRIVILEGES ON `ms-billing-api`.* TO 'multshool'@'%';
FLUSH PRIVILEGES;
