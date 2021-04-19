#!/bin/bash
cd /home/ubuntu/api
echo "CD Realizado"
sudo npm install
sudo npm install pm2 -g
echo "Instalações concluídas com sucesso"
cd /home/ubuntu/api
echo "Abrindo pasta da API com novo Build"
sudo rm -Rf /opt/app/observador/
echo "Limpando Diretório /opt/app/observador"
sudo cp -R /home/ubuntu/api/* /opt/app/observador
echo "Movendo a Pasta do Novo Build para /opt/app/observador"
sudo rm -R /home/ubuntu/api/*
echo "Limpando Local Onde Recebe Arquivos do Build"
