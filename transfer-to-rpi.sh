#!/bin/bash
# =============================================================
# Transfert du projet LAVOITURE vers le Raspberry Pi
# A lancer depuis Git Bash sur Windows
# =============================================================

RPI_USER="kali"
RPI_IP="192.168.1.163"
APP_DIR="/var/www/lavoiture"

echo "========================================="
echo "  Transfert LAVOITURE vers RPi"
echo "========================================="

# Creer le repertoire sur le RPi
ssh $RPI_USER@$RPI_IP "sudo mkdir -p $APP_DIR && sudo chown -R \$USER:\$USER $APP_DIR"

# Transferer le projet (exclure node_modules, .next, .git)
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude '.next' \
    --exclude '.git' \
    --exclude '.claude' \
    ./ $RPI_USER@$RPI_IP:$APP_DIR/

echo ""
echo "========================================="
echo "  Transfert termine !"
echo "========================================="
echo ""
echo "Connectez-vous au RPi et lancez le deploiement :"
echo "  ssh $RPI_USER@$RPI_IP"
echo "  cd $APP_DIR"
echo "  bash deploy-rpi.sh"
echo ""
