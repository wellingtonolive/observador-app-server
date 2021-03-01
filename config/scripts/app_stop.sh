#!/bin/bash
cd /home/ubuntu/api
echo "CD Realizado com Sucesso"
chmod +x -R /home/ubuntu/api/config/scripts/
fuser -k 1234/tcp
echo "Parou processo na porta 1234"
