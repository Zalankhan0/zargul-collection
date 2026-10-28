@echo off
echo ===================================================
echo   ZARGUL COLLECTION - DIRECT INSTANT LIVE DEPLOY
echo ===================================================
node scripts\push_to_user_repo.js
node scripts\publish.js
echo.
echo [DONE] Live Push completed to Zalankhan0 and Production!
pause
