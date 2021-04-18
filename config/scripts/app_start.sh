#!/bin/bash
cd /opt/app/observador
echo "Acessando Pasta do Servidor"
pm2 start server.js
pm2 save
pm2 restart all
echo "Processo Inciado com PM2"
sudo nginx -t
sudo systemctl restart nginx
echo "Servidor Nginx Reiniciado com Sucesso"
