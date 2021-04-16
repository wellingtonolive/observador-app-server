#!/bin/bash
cd /home/ubuntu/api
echo "Abrindo pasta da API com novo Build"
sudo rm -Rf /opt/app/observador/
echo "Limpando Diretório /opt/app/observador"
sudo mv /home/ubuntu/api/ /opt/app/observador
echo "Movendo a Pasta do Novo Build para /opt/app/observador"
cd /opt/app/observador
echo "Acessando Pasta do Servidor"
pm2 start server.js
pm2 save
pm2 restart all
echo "Processo Inciado com PM2"
sudo nginx -t
sudo systemctl restart nginx
echo "Servidor Nginx Reiniciado com Sucesso"
