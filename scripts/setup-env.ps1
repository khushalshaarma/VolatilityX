<#
PowerShell helper to create a virtual environment on Windows.

Usage:
  # create venv only
  .\scripts\setup-env.ps1

  # create venv and activate in current shell
  .\scripts\setup-env.ps1 -Activate

  # create venv, allow running local scripts (will set ExecutionPolicy for CurrentUser)
  .\scripts\setup-env.ps1 -AllowScripts

This script prefers the `py` launcher, falls back to `python` on PATH.
It does not modify global system settings. Setting ExecutionPolicy is limited
to the CurrentUser scope when -AllowScripts is used.
#>

param(
    [switch]$Activate,
    [switch]$AllowScripts
)

function Find-PythonExecutable {
    $py = Get-Command py -ErrorAction SilentlyContinue
    if ($py) { return 'py' }
    $python = Get-Command python -ErrorAction SilentlyContinue
    if ($python) { return 'python' }
    return $null
}

$exe = Find-PythonExecutable
if (-not $exe) {
    Write-Host "Python not found. Install Python (https://www.python.org/downloads/) or use the Microsoft Store." -ForegroundColor Red
    exit 1
}

Write-Host "Using Python executable: $exe"

try {
    # The 'py' launcher accepts a '-3' flag to request Python 3, but the
    # direct 'python' executable does not. Use the appropriate invocation
    # depending on which executable we found.
    if ($exe -eq 'py') {
        & $exe -3 -m venv .venv
    } else {
        & $exe -m venv .venv
    }
    if ($LASTEXITCODE -ne 0) { throw "venv command failed with exit code $LASTEXITCODE" }
} catch {
    Write-Host "Failed to create virtual environment: $_" -ForegroundColor Red
    exit 1
}

Write-Host "Virtual environment created at .venv"

if ($AllowScripts) {
    try {
        $current = Get-ExecutionPolicy -Scope CurrentUser -ErrorAction SilentlyContinue
        if ($current -ne 'RemoteSigned') {
            Write-Host "Setting ExecutionPolicy for CurrentUser to RemoteSigned (allows local scripts)"
            Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
        } else {
            Write-Host "CurrentUser ExecutionPolicy already RemoteSigned"
        }
    } catch {
        Write-Host "Could not set ExecutionPolicy: $_" -ForegroundColor Yellow
    }
}

if ($Activate) {
    # Dot-source the Activate script so the current session is modified
    $activatePath = Join-Path -Path (Get-Location) -ChildPath ".venv\Scripts\Activate.ps1"
    if (Test-Path $activatePath) {
        Write-Host "Activating virtual environment in current session..."
        . $activatePath
        Write-Host "Activated."
    } else {
        Write-Host "Activation script not found at $activatePath" -ForegroundColor Yellow
    }
} else {
    Write-Host "To activate the venv in PowerShell run:"
    Write-Host "  . .\\.venv\\Scripts\\Activate.ps1"
    Write-Host "Or in cmd.exe run:"
    Write-Host "  .venv\\Scripts\\activate.bat"
}
