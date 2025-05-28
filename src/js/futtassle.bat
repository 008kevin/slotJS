@echo off
REM
where tsc >nul 2>nul
if %errorlevel% neq 0 (
    echo Futtasd le a következő parancsot: ^"npm install -g typescript^"
    exit /b
)

REM
for %%f in (*.ts) do (
    echo Fordítom:  %%f...
    tsc "%%f"
)

echo Kész a fordítás!
pause
