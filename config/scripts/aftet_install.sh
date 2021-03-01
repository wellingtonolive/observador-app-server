#!/bin/bash
echo "Limpando Pasta do Antigo Server"
sudo rm -R /opt/app/
echo "Entrando na Pasta OPT"
cd /opt
echo "Criando Novo Diretorio APP"
sudo mkdir app
echo "Entrando na Pasta APP"
cd /opt/app/
echo "Criando Pasta para API Observador"
sudo mkdir observador
echo "Colocando novos Arquivos"
sudo cp -r /home/ubuntu/api /opt/app/observador