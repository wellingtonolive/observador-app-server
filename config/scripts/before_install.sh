#!/bin/bash
cd /home/ubuntu/api
echo "Cd realizado com Sucesso"
sudo cp -R /opt/app/observador /home/ubuntu/api/$(date +'%Y-%m-%d-%T')
echo "BackUp do Fonte Anterior Salvo em: /home/ubuntu/api/"$(date +'%Y-%m-%d-%T')

