param([switch]$NoBrowser)
$ErrorActionPreference = 'Stop'
$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$StateDir = Join-Path $ProjectRoot '.tmp'
$PidFile = Join-Path $StateDir 'app.pid'
$LogFile = Join-Path $StateDir 'app.log'
$Url = 'http://127.0.0.1:8787'
New-Item -ItemType Directory -Path $StateDir -Force | Out-Null
if (Test-Path -LiteralPath $PidFile) {
  $SavedPid = [int](Get-Content -LiteralPath $PidFile -Raw)
  if (Get-Process -Id $SavedPid -ErrorAction SilentlyContinue) {
    Write-Host "이미 실행 중입니다: $Url"
    if (-not $NoBrowser) { Start-Process $Url }
    exit 0
  }
}
Push-Location $ProjectRoot
try {
  if (-not (Test-Path -LiteralPath (Join-Path $ProjectRoot 'dist\index.html'))) {
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) { throw '프로덕션 빌드에 실패했습니다.' }
  }
  $Process = Start-Process -FilePath 'node.exe' -ArgumentList @('dist-server/server/index.js') -WorkingDirectory $ProjectRoot -WindowStyle Hidden -RedirectStandardOutput $LogFile -RedirectStandardError (Join-Path $StateDir 'app-error.log') -PassThru
  Set-Content -LiteralPath $PidFile -Value $Process.Id -Encoding ascii
  $Ready = $false
  for ($i=0; $i -lt 30; $i++) {
    Start-Sleep -Milliseconds 300
    try { if ((Invoke-WebRequest -UseBasicParsing "$Url/api/health" -TimeoutSec 2).StatusCode -eq 200) { $Ready=$true; break } } catch {}
  }
  if (-not $Ready) { throw "서버가 준비되지 않았습니다. 로그: $LogFile" }
  Write-Host "실행 완료: $Url"
  if (-not $NoBrowser) { Start-Process $Url }
} finally { Pop-Location }
