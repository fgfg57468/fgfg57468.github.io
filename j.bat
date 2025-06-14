@echo off
chcp 65001 >nul 2>&1
set LC_ALL=en_US.UTF-8
set LANG=en_US.UTF-8
set RUBYOPT=-Eutf-8
bundle exec jekyll serve