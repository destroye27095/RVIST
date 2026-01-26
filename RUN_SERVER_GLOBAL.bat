@echo off
SETLOCAL EnableDelayedExpansion

echo ===================================================
echo   RVIST@2026 SMART MANAGEMENT SYSTEM - PORT FORWARDER
echo ===================================================
echo.
echo [1/2] Initializing Local Development Server...
echo.

cd RVISTApp

:: Start the dev server in a new window
start "RVIST-DevServer" cmd /c "npm run dev"

echo [OK] Server requested on http://localhost:8000
echo.
echo [2/2] Initializing Global Tunnel (Port Forwarding)...
echo.

:: Start localtunnel in the current window
echo Generating public URL...
echo ---------------------------------------------------
npx localtunnel --port 8000

pause
