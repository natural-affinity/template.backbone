#!/bin/bash

# install ruby dependencies
gem install bundler
bundle install

# install node dependencies
npm install -g bower grunt-cli
npm install grunt
npm install
bower install
