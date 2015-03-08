@echo off
echo "installing ruby dependencies"
cmd.exe /c gem install bundler
cmd.exe /c bundle install

echo "installing node dependencies"
cmd.exe /c npm install -g bower grunt-cli
cmd.exe /c npm install grunt
cmd.exe /c npm install
cmd.exe /c bower install
