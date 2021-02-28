cd /opt/app/observador-app-server/
echo 'CD Realizado com Sucesso'

fuser -k 1234/tcp
echo 'Parou processo na porta 1234'
