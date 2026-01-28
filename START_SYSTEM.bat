@echo off
setlocal
echo ===================================================
echo   RVIST@2026 SMART MANAGEMENT SYSTEM LAUNCHER
echo ===================================================
echo.
echo [1] Start Local Server Only
echo [2] Start Local Server + Global Access (Port Forwarding)
echo.
set /p choice="Select Launch Protocol [1-2]: "

if "%choice%"=="2" (
    echo.
    echo Initializing Institutional Bridge...
    start "RVIST-Backend" cmd /c "cd server && npm start"
    start "RVIST-Frontend" cmd /c "cd RVISTApp && npm run dev"
    echo.
    echo [SYSTEM] Local cluster initiated.
    echo [SYSTEM] Requesting Global Tunnel Hubs...
    echo ---------------------------------------------------
    npx localtunnel --port 5000 --subdomain rvist-kernel & npx localtunnel --port 8000 --subdomain rvist-ui
) else (
    echo.
    echo Attempting to start institutional nodes...
    start "RVIST-Backend" cmd /c "cd server && npm start"
    cd RVISTApp
    npm run dev
)

pause
