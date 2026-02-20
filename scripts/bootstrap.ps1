<#
Simple, robust bootstrap for local dev on Windows
1) Ensures Python is present (prompts user to run installer if not)
2) Creates .venv, installs backend requirements, installs frontend deps
3) Launches backend and frontend in new PowerShell windows

Run from repo root:
  powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\bootstrap.ps1
#>

param()

function Info($m){ Write-Host "[INFO] $m" -ForegroundColor Cyan }
function Err($m){ Write-Host "[ERROR] $m" -ForegroundColor Red }

$repo = (Get-Location).Path
Info "Repo: $repo"

# Find python
if (Get-Command py -ErrorAction SilentlyContinue) { $pyCmd = 'py' }
elseif (Get-Command python -ErrorAction SilentlyContinue) { $pyCmd = 'python' }
else { $pyCmd = $null }

if (-not $pyCmd) {
  Err 'Python not found. Please run the official Python installer and check "Add Python to PATH".'
  Err 'Download: https://www.python.org/downloads/windows/'
  exit 1
}

Info "Using Python: $pyCmd"

Set-Location -Path $repo

# create venv
if (-not (Test-Path '.venv')) {
  Info 'Creating .venv'
  & $pyCmd -3 -m venv .venv
} else { Info '.venv already exists' }

$venvPy = Join-Path $repo '.venv\Scripts\python.exe'
if (-not (Test-Path $venvPy)) { Err "venv python not found: $venvPy"; exit 1 }

Info 'Upgrading pip and installing backend requirements'
& $venvPy -m pip install --upgrade pip
if (Test-Path 'backend\requirements.txt') { & $venvPy -m pip install -r backend\requirements.txt }

Info 'Running npm install in frontend'
if (Test-Path 'frontend') { Start-Process -FilePath 'npm' -ArgumentList 'install' -WorkingDirectory (Join-Path $repo 'frontend') -Wait } else { Info 'No frontend folder' }

Info 'Starting backend and frontend in new windows'
if (Test-Path 'backend') {
  Start-Process -FilePath 'powershell.exe' -ArgumentList @('-NoExit','-ExecutionPolicy','Bypass','-Command', "cd '$repo\backend'; . '$repo\.venv\Scripts\Activate.ps1'; uvicorn app.main:app --reload --port 8000") -WorkingDirectory (Join-Path $repo 'backend')
}
if (Test-Path 'frontend') {
  Start-Process -FilePath 'powershell.exe' -ArgumentList @('-NoExit','-ExecutionPolicy','Bypass','-Command', "cd '$repo\frontend'; npm run dev") -WorkingDirectory (Join-Path $repo 'frontend')
}

Info 'Bootstrap complete. Open http://127.0.0.1:8000 and http://localhost:3000'
