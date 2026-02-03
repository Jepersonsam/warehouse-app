@echo off
title Push Warehouse App ke GitHub
color 0A

echo ========================================================
echo        SKRIP OTOMATIS PUSH GITHUB - WAREHOUSE APP
echo ========================================================
echo.
echo Skrip ini akan:
echo 1. Menggabungkan folder backend dan frontend ke dalam 'warehouse-app'
echo 2. Melakukan inisialisasi Git
echo 3. Push ke https://github.com/Jepersonsam/warehouse-app
echo.
echo PENTING: Mohon matikan semua server (npm run dev / php artisan serve)
echo yang sedang berjalan sebelum melanjutkan!
echo.
pause

cd ..

:: 1. Buat folder induk
if not exist "warehouse-app" (
    echo [+] Membuat folder warehouse-app...
    mkdir warehouse-app
)

:: 2. Pindahkan Backend
if exist "warehouse-app-backend" (
    echo [+] Memindahkan database backend...
    move "warehouse-app-backend" "warehouse-app\backend"
) else (
    echo [!] Folder backend tidak ditemukan di lokasi awal (mungkin sudah dipindah).
)

:: 3. Pindahkan Frontend
if exist "warehouse-app-frontend" (
    echo [+] Memindahkan database frontend...
    move "warehouse-app-frontend" "warehouse-app\frontend"
) else (
    echo [!] Folder frontend tidak ditemukan di lokasi awal (mungkin sudah dipindah).
)

:: 4. Masuk ke folder induk
cd warehouse-app

:: 5. Setup Git
echo.
echo [+] Menyiapkan Git...
if not exist ".git" (
    git init
    git branch -M main
    git remote add origin https://github.com/Jepersonsam/warehouse-app
)

:: 6. Push
echo [+] Menambahkan file ke staging...
git add .
echo [+] Melakukan commit...
git commit -m "Initial commit: Warehouse App Fullstack (Backend + Frontend)"
echo [+] Melakukan Push ke GitHub...
git push -u origin main

echo.
echo ========================================================
echo                  PROSES SELESAI
echo ========================================================
pause
