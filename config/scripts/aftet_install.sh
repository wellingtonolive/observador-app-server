#!/bin/bash
echo "Limpando Pasta do Antigo Server"
sudo rm -R /opt/app/
echo "Criando Novo Diretorio"
sudo mkdir /opt/app/observador
echo "Colocando novos Arquivos"
sudo cp -r /home/ubuntu/api /opt/app/observador