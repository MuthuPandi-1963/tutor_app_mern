@echo off

:: Start server
start cmd /k "cd server && npm run dev"

:: Start client
start cmd /k "cd client && npm run dev"

:: Open the client app in the default browser
start http://localhost:5173
