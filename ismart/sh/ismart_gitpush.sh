#!/usr/bin/env bash
cd /config;
git add .;
git commit -m "Archivos de configuracion actualizados `date +'%d-%m-%Y %H:%M:%S'`";
git push -u origin main;