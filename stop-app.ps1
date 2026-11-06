$ErrorActionPreference = 'Stop'
$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$PidFile = Join-Path $ProjectRoot '.tmp\app.pid'
if (-not (Test-Path -LiteralPath $PidFile)) { Write-Host '실행 중인 앱 기록이 없습니다.'; exit 0 }
$SavedPid = [int](Get-Content -LiteralPath $PidFile -Raw)
$Process = Get-Process -Id $SavedPid -ErrorAction SilentlyContinue
if ($Process) { Stop-Process -Id $SavedPid; Write-Host "앱을 종료했습니다. PID=$SavedPid" }
Remove-Item -LiteralPath $PidFile -Force
