@echo off
SETLOCAL EnableDelayedExpansion

echo ===================================================
echo   RVIST@2026 PROJECT MIGRATION - NEW REPOSITORY
echo ===================================================
echo.

:: Check for Git installation
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in your PATH.
    echo Please install Git to proceed.
    pause
    exit /b
)

echo [1/4] Re-initializing Git Registry...
:: Check if .git exists, if so, we'll just update remotes
if exist .git (
    echo [OK] Existing local registry detected.
) else (
    git init
    echo [OK] New local registry initialized.
)

echo.
echo [2/4] Configuring New Remote Uplink...
echo Target: https://github.com/destroye27095/RVIST.git
:: Remove old origin if it exists to avoid conflicts
git remote remove main-repo >nul 2>&1
git remote remove origin >nul 2>&1
:: Add the new remote
git remote add main-repo https://github.com/destroye27095/RVIST.git

echo.
echo [3/4] Packaging Institutional Assets...
git add .
git commit -m "Initial Integration: Premium RVIST Smart Management System v3.0.4"

echo.
echo [4/4] Transmitting Data to Secure Cloud...
echo ---------------------------------------------------
git branch -M main
git push -u main-repo main

if %errorlevel% equ 0 (
    echo.
    echo ===================================================
    echo   [SUCCESS] SYSTEM MIGRATED TO NEW REPOSITORY
    echo   URL: https://github.com/destroye27095/RVIST.git
    echo ===================================================
) else (
    echo.
    echo [!] Cloud transmission failed. 
    echo     Please ensure your GitHub credentials are correct and you have 
    echo     create permissions on the target repository.
)

echo.
pause
