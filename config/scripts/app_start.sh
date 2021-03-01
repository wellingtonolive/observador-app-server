#!/bin/bash
echo "Abrindo pasta da API"
cd /opt/app/observador
echo "Parando servidor"
fuser -k 1234/tcp
echo "Iciando "
npm start &
