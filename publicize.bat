echo --------------------------------
call npm run build
echo --------------------------------
copy sw.js dist\
echo --------------------------------
copy manifest.json dist\
echo --------------------------------
xcopy AppImages dist\assets\AppImages\ /E /Y