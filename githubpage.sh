###
 # @Date: 2020-11-08 13:50:16
 # @LastEditors: cyf
 # @LastEditTime: 2020-11-08 14:09:17
 # @FilePath: \cyf-cloud.front\githubpage.sh
 # @Description: What is mind? No matter. What is matter? Nevermind.
### 
cd /home/cyf/.web/cyf-cloud.front
git clone --depth 1 http://github.com/cyf-gh/cyf-gh.github.io
sudo npm run build_gp
git cp -R ./mycli3/* ./cyf-gh.github.io

cd ./cyf-gh.github.io
git add .
git commit -m "Auto deploy to github.io"
git push
cd ..

rm -rf ./cyf-gh.github.io