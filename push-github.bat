@echo off
title Push PSHT UNESA ke GitHub
echo ====================================================
echo   PUSH PROYEK PSHT UNESA KE GITHUB
echo ====================================================
echo.
set "PATH=C:\Users\ABDILLLAH\AppData\Local\Programs\Git\cmd;C:\Users\ABDILLLAH\AppData\Local\Programs\Git\ucrt64\bin;C:\Program Files\Git\cmd;%PATH%"

set DEFAULT_URL=https://github.com/diabdillah12-cell/psht-unesa.git
echo Target Repositori: %DEFAULT_URL%
echo.

git remote remove origin 2>nul
git remote add origin %DEFAULT_URL%
git branch -M main
echo Menghubungkan dan melakukan push ke GitHub...
echo (Jika jendela browser muncul, silakan klik 'Sign in with your browser' / 'Authorize')
echo.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ====================================================
    echo   BERHASIL! Proyek berhasil di-push ke GitHub.
    echo   Cek di: https://github.com/diabdillah12-cell/psht-unesa
    echo ====================================================
) else (
    echo.
    echo Push belum selesai. Pastikan Anda telah mengizinkan login GitHub pada browser.
)
pause
