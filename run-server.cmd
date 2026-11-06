@echo off
cd /d "%~dp0"
if not exist ".tmp" mkdir ".tmp"
"C:\Program Files\nodejs\node.exe" "dist-server\server\index.js" >> ".tmp\app.log" 2>> ".tmp\app-error.log"
