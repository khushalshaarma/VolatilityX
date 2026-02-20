Windows setup: create & activate virtualenv

This project includes a helper PowerShell script at `scripts/setup-env.ps1` to create a Windows virtual environment and optionally activate it.

Quick steps (preferred):

1) Create the venv using the Python launcher (recommended):

   py -3 -m venv .venv

2) Activate in PowerShell (dot-source so it modifies the current session):

   . .\.venv\Scripts\Activate.ps1

3) If PowerShell blocks running scripts, allow locally-signed scripts for your user:

   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

Using the included helper script

- Create only: `.\scripts\setup-env.ps1`
- Create + activate: `.\scripts\setup-env.ps1 -Activate`
- Allow local scripts + create: `.\scripts\setup-env.ps1 -AllowScripts`

Notes
- The script prefers the `py` launcher and falls back to `python` on PATH.
- It only changes ExecutionPolicy in the CurrentUser scope when `-AllowScripts` is used.
- If you don't have Python installed, download it from https://www.python.org/downloads/ or install from the Microsoft Store, and re-open PowerShell.
