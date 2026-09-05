#!/bin/bash
# =============================================================
# Script de deploiement LAVOITURE sur Raspberry Pi 5 (Kali)
# Sous-domaine : lavoiture.wassim-btlj.fr
# =============================================================

set -e

APP_DIR="/var/www/lavoiture"
DOMAIN="lavoiture.wassim-btlj.fr"
PORT=3001

echo "========================================="
echo "  Deploiement LAVOITURE"
echo "  Domaine : $DOMAIN"
echo "========================================="

# 1. Mise a jour
echo "[1/8] Mise a jour du systeme..."
sudo apt update && sudo apt upgrade -y

# 2. Installation Node.js 20 (si pas deja installe)
echo "[2/8] Installation de Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
    echo "  -> Node.js $(node -v) installe"
else
    echo "  -> Node.js $(node -v) deja installe"
fi

# 3. Installation PM2 (si pas deja installe)
echo "[3/8] Installation de PM2..."
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
    echo "  -> PM2 installe"
else
    echo "  -> PM2 deja installe"
fi

# 4. Creation du repertoire
echo "[4/8] Preparation du repertoire..."
sudo mkdir -p $APP_DIR
sudo chown -R $USER:$USER $APP_DIR

# 5. Copie et build de l'application
echo "[5/8] Build de l'application..."
if [ -f "$APP_DIR/package.json" ]; then
    cd $APP_DIR
    npm install
    npm run build
    echo "  -> Build termine"
else
    echo "  -> ATTENTION: Copiez d'abord le projet sur le RPi :"
    echo "     Depuis votre PC Windows, lancez :"
    echo "     scp -r /chemin/vers/lavoiture/* kali@192.168.1.163:$APP_DIR/"
    echo "     Puis relancez ce script."
    exit 1
fi

# 6. Demarrage avec PM2
echo "[6/8] Demarrage de l'application avec PM2..."
cd $APP_DIR
pm2 delete lavoiture 2>/dev/null || true
PORT=$PORT pm2 start npm --name "lavoiture" -- start
pm2 save
pm2 startup systemd -u $USER --hp /home/$USER 2>/dev/null || true
echo "  -> Application demarree sur le port $PORT"

# 7. Configuration Nginx (reverse proxy)
echo "[7/8] Configuration de Nginx..."
sudo tee /etc/nginx/sites-available/$DOMAIN > /dev/null <<'NGINX'
server {
    listen 80;
    listen [::]:80;

    server_name lavoiture.wassim-btlj.fr;

    # Securite
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    # Compression gzip
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
    gzip_min_length 256;

    # Rate limiting zone (definie dans nginx.conf)
    # limit_req zone=general burst=20 nodelay;

    # Taille max upload (pour les images admin)
    client_max_body_size 10M;

    # Reverse proxy vers Next.js
    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }

    # Cache des assets statiques Next.js
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3001;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # Bloquer les fichiers caches
    location ~ /\. {
        deny all;
    }
}
NGINX

sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
echo "  -> Nginx configure"

# 8. Securite : UFW + Fail2ban
echo "[8/8] Securisation..."

# UFW
if command -v ufw &> /dev/null; then
    sudo ufw allow 22/tcp
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    sudo ufw --force enable
    echo "  -> UFW active (22, 80, 443)"
else
    sudo apt install -y ufw
    sudo ufw allow 22/tcp
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    sudo ufw --force enable
    echo "  -> UFW installe et active"
fi

# Fail2ban
if ! command -v fail2ban-client &> /dev/null; then
    sudo apt install -y fail2ban
fi
sudo tee /etc/fail2ban/jail.local > /dev/null <<'F2B'
[sshd]
enabled = true
port = ssh
filter = sshd
maxretry = 3
bantime = 3600
findtime = 600

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
maxretry = 5
bantime = 3600
F2B
sudo systemctl enable fail2ban
sudo systemctl restart fail2ban
echo "  -> Fail2ban active"

echo ""
echo "========================================="
echo "  Deploiement termine !"
echo "========================================="
echo ""
echo "L'application tourne sur le port $PORT"
echo "Nginx reverse proxy configure pour $DOMAIN"
echo ""
echo "ETAPE SUIVANTE : SSL"
echo "  Lancez : sudo bash ~/setup-ssl-lavoiture.sh"
echo ""
