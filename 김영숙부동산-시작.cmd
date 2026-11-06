@echo off
chcp 65001 >nul
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-app.ps1"
if errorlevel 1 (
  echo.
  echo 앱을 시작하지 못했습니다. .tmp\app-error.log 파일을 확인하세요.
  pause
)
