#!/bin/bash
cd /home/ubuntu
echo "CD Realizado com Sucesso"
fuser -k 1234/tcp
echo "Parou processo na porta 1234"
"realizadno teste sdnsiadndif" > teste.log
echo "Executou"
