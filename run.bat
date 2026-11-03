@echo off
title PSHT UNESA Web Application
echo ====================================================
echo   MEMULAI SISTEM PORTAL PSHT KOMISARIAT UNESA
echo ====================================================
echo.
set "PATH=C:\Program Files\nodejs;%PATH%"

echo Membuka browser ke http://localhost:5000...
start http://localhost:5000

echo Menjalankan server di port 5000...
node server/index.js
pause
