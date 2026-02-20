param()
$repo = Split-Path -Parent $PSScriptRoot
cd (Join-Path $repo '..\backend')
# Activate venv
. (Join-Path $repo '..\.venv\Scripts\Activate.ps1')
# Run uvicorn
uvicorn app.main:app --reload --port 8000
