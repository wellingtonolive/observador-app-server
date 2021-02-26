cd /opt/app/observador-app-server

echo "Cd realizado com Sucesso"

curl -fsSL https://deb.nodesource.com/setup_15.x | sudo -E bash -

echo "Curl realizado com Sucesso"

sudo apt-get install -y nodejs

echo "Install NodeJS com Sucesso"

sudo npm install

echo "npm install realizado com sucesso"

sudo npm install -g npm@7.5.4

echo "instalando biblioteca especifica"