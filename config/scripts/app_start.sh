#!/bin/bash
cd /home/ubuntu/api
echo "Abrindo pasta da API com novo Build"
sudo rm -Rf /opt/app/observador
echo "Limpando Diretório /opt/app/observador"
sudo mv -r /home/ubuntu/api/ /opt/app/observador
echo "Movendo a Pasta do Novo Build para /opt/app/observadpo"
pm2 startup
pm2 save
pm2 restart all
echo "Processo Inciado com PM2"