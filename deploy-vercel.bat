@echo off
title Deploy PSHT UNESA ke Vercel
echo ====================================================
echo   DEPLOY SISTEM PSHT UNESA KE VERCEL
echo ====================================================
echo.
set "PATH=C:\Program Files\nodejs;C:\Users\ABDILLLAH\AppData\Local\Programs\Git\cmd;%PATH%"

echo [1/2] Menyiapkan dan memverifikasi build aplikasi...
call npm run build

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Build aplikasi gagal. Harap periksa pesan error di atas.
    pause
    exit /b
)

echo.
echo [2/2] Memulai deployment langsung ke Vercel...
echo Catatan:
echo - Jika belum login Vercel, browser akan terbuka untuk login (pilih Continue with GitHub).
echo - Tekan ENTER untuk menyetujui pertanyaan default dari Vercel CLI.
echo.
call npx.cmd vercel --prod

echo.
echo ====================================================
echo   Proses deployment Vercel selesai!
echo ====================================================
pause
