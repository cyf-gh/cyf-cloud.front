npm run build_gp
Copy-Item -Path .\mycli3\* -Recurse -Destination ..\cyf-gh.github.io -Force
cd ..\cyf-gh.github.io
git add .
git commit -m "Auto Deploy"
git push
cd ..\cyf-cloud.front