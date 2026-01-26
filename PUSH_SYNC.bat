@echo off
SETLOCAL EnableDelayedExpansion

echo ===================================================
echo   RVIST@2026 PROJECT SYNC - GITHUB AUTO-PUSH
echo ===================================================
echo.

:: Check for Git installation
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in your PATH.
    echo Please install Git from https://git-scm.com/ to use this script.
    pause
    exit /b
)

echo [1/3] Staging institutional updates...
git add .

echo [2/3] Encrypting commit metadata...
:: Generate a descriptive commit message with timestamp
set "tstamp=%DATE% %TIME%"
git commit -m "Automated Sync [%tstamp%]: Premium UI Overhaul, Communications Logic, and Global Port Forwarding"

echo [3/3] Transmitting to GitHub Repository...
echo Target Remote: RVIST@2025
echo Target Branch: RVIST2027
echo.

:: Push to the specific remote and branch found in .git config
git push "RVIST@2025" "RVIST2027"

if %errorlevel% equ 0 (
    echo.
    echo ===================================================
    echo   [SUCCESS] SYSTEM DATA SYNCHRONIZED SUCCESSFULLY
    echo ===================================================
) else (
    echo.
    echo [!] Push failed. This might be due to:
    echo     - Internet connectivity issues
    echo     - Authentication requirements (Login needed)
    echo     - Remote changes (Try running 'git pull' first)
)

echo.
pause
