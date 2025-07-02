#!/bin/bash
DIR="/home/ec2-user/web-nextjs-app"
echo "AfterInstall: Construindo a imagem Docker"
sudo chown -R ec2-user:ec2-user ${DIR}
cd ${DIR}


npm install 

#npm run build