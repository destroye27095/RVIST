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
    echo Initializing Global Access Bridge...
    cd RVISTApp
    start "RVIST-Server" cmd /c "npm run dev"
    echo.
    echo [SYSTEM] Local server initiated.
    echo [SYSTEM] Requesting Global Tunnel...
    echo ---------------------------------------------------
    npx localtunnel --port 8000
) else (
    echo.
    echo Attempting to start local server on http://localhost:8000...
    node -v >nul 2>&1
    if %errorlevel% equ 0 (
        cd RVISTApp
        npm run dev
    ) else (
        echo [!] Node.js not found. Using PowerShell Fallback...
        powershell -ExecutionPolicy Bypass -Command "Write-Host 'Starting Server...'; $p=8000; $l=New-Object Net.HttpListener; $l.Prefixes.Add('http://localhost:'+$p+'/'); $l.Start(); Write-Host 'LISTENING ON http://localhost:8000'; while($l.IsListening){$c=$l.GetContext(); $req=$c.Request; $res=$c.Response; $path=$req.Url.LocalPath; if($path -eq '/'){$path='/index.html'}; $file=Join-Path (Get-Location) 'RVISTApp'$path; if(Test-Path $file){$bytes=[IO.File]::ReadAllBytes($file); $res.ContentLength64=$bytes.Length; $res.OutputStream.Write($bytes,0,$bytes.Length)}else{$res.StatusCode=404}; $res.Close()}"
    )
)

pause
