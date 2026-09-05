#!/bin/bash
# =============================================================
# Script SSL Let's Encrypt pour lavoiture.wassim-btlj.fr
# A executer APRES la configuration DNS
# =============================================================

set -e

DOMAIN="lavoiture.wassim-btlj.fr"

echo "========================================="
echo "  Installation SSL Let's Encrypt"
echo "  Domaine : $DOMAIN"
echo "========================================="

# Installation de Certbot (si pas deja installe)
echo "[1/3] Verification de Certbot..."
if ! command -v certbot &> /dev/null; then
    sudo apt install -y certbot python3-certbot-nginx
    echo "  -> Certbot installe"
else
    echo "  -> Certbot deja installe"
fi

# Obtention du certificat SSL
echo "[2/3] Obtention du certificat SSL..."
echo "  -> Assurez-vous que le DNS pointe vers cette machine"
echo ""

sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email raoufwassim86@gmail.com --redirect

# Renouvellement automatique
echo "[3/3] Renouvellement automatique..."
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

echo ""
echo "========================================="
echo "  SSL installe avec succes !"
echo "========================================="
echo ""
echo "Votre site est maintenant accessible sur :"
echo "  https://$DOMAIN"
echo ""
echo "Le certificat se renouvellera automatiquement."
echo ""
