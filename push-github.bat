@echo off
title Push PSHT UNESA ke GitHub
echo ====================================================
echo   PUSH PROYEK PSHT UNESA KE GITHUB
echo ====================================================
echo.
set "PATH=C:\Users\ABDILLLAH\AppData\Local\Programs\Git\cmd;C:\Program Files\Git\cmd;%PATH%"

set /p REPO_URL="Masukkan URL Repositori GitHub Anda (contoh: https://github.com/username/psht-unesa.git): "
if "%REPO_URL%"=="" (
    echo Error: URL repositori tidak boleh kosong.
    pause
    exit /b
)

git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main
echo.
echo Menghubungkan dan melakukan push ke %REPO_URL%...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ====================================================
    echo   BERHASIL! Proyek berhasil di-push ke GitHub.
    echo ====================================================
) else (
    echo.
    echo Push gagal. Pastikan URL repositori benar dan Anda memiliki akses tulis.
)
pause
