# 📸 Express Rent Camera App

Aplikasi backend untuk sistem penyewaan kamera, dibangun menggunakan Express.js, TypeScript, Prisma, dan MySQL.

## 🚀 Fitur

- **Manajemen Pengguna**: Registrasi dan autentikasi pengguna.
- **Manajemen Produk**: CRUD untuk data kamera yang disewakan.
- **Transaksi Penyewaan**: Pencatatan transaksi penyewaan kamera.
- **Upload Gambar**: Upload gambar produk menggunakan Multer.
- **Integrasi Prisma**: ORM untuk interaksi dengan database MySQL.

## 🛠️ Teknologi yang Digunakan

- **Node.js** dengan **Express.js**
- **TypeScript**
- **Prisma ORM (searching, pagination, seeder)**
- **MySQL**
- **Multer** untuk upload file
- **dotenv** untuk manajemen konfigurasi env

## ⚙️ Instalasi dan Menjalankan Aplikasi

1. **Cloning repository:**

   ```bash
   git clone https://github.com/Widyasa/express-rent-camera-app.git
   cd express-rent-camera-app

2. **Install Dependency**

   ```bash
   //yarn:
   yarn install

   //npm:
   npm install

3. **Setup Env**

   ```bash
   cp .env.example .env

4. **Setup Prisma & seeder**

   ```bash
   //setup prisma
   npx prisma migrate dev --name init

   //jalankan seeder
   yarn seed

5. **Running Project**

   ```bash
   yarn dev

