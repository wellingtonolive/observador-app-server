#!bin/bash
echo "Limpando Pasta do Antigo Server"
sudo rm -R /opt/app/
echo "Colocando novos Arquivos"
sudo cp -r /home/ubuntu /opt/app/observador