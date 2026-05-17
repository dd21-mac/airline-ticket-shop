# Deployment Guide - Airline Ticket Shop

## 🚀 Déploiement Complet (Frontend + Backend)

### Option 1 : Vercel + Heroku ⭐ (RECOMMANDÉ)

#### **ÉTAPE 1 : Préparer votre code**

```bash
# S'assurer que tout build correctement
npm run build

# Vérifier le .gitignore
git status

# Ne doit voir que les fichiers pertinents
```

---

#### **ÉTAPE 2 : Frontend sur Vercel**

1. **Créer un compte** : https://vercel.com/signup

2. **Installer Vercel CLI** (optionnel)
```bash
npm i -g vercel
```

3. **Déployer avec GitHub** (recommandé)
   - Aller sur vercel.com/new
   - Sélectionner "Import Git Repository"
   - Connecter votre compte GitHub
   - Sélectionner `airline-ticket-shop`

4. **Configuration Vercel** :
   ```
   Project Name: airline-ticket-shop
   Framework: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

5. **Variables d'environnement** :
   - Cliquer "Environment Variables"
   - Ajouter : `VITE_API_URL` = `https://votre-backend.herokuapp.com/api`

6. **Deploy** 🎉
   ```
   Frontend URL: https://airline-ticket-shop.vercel.app
   ```

---

#### **ÉTAPE 3 : MongoDB Atlas (Base de données)**

1. **Créer un compte** : https://www.mongodb.com/cloud/atlas

2. **Créer un cluster gratuit** :
   - Cliquer "Create"
   - Provider: AWS
   - Region: eu-central-1
   - Cluster Tier: M0 (Free)
   - Cliquer "Create Cluster"

3. **Créer un utilisateur** :
   - Aller sur "Database Access"
   - Cliquer "Add New Database User"
   - Username: `admin`
   - Password: `GenerateSecurePassword`
   - Cliquer "Create User"

4. **Whitelister IP** :
   - Aller sur "Network Access"
   - Cliquer "Add IP Address"
   - Sélectionner "Allow Access from Anywhere" (0.0.0.0/0)
   - Cliquer "Confirm"

5. **Récupérer la connection string** :
   - Cliquer "Connect" sur le cluster
   - Sélectionner "Drivers"
   - Copier la string (remplacer `<password>` et `<username>`)
   ```
   mongodb+srv://admin:PASSWORD@cluster.mongodb.net/airline-tickets?retryWrites=true&w=majority
   ```

---

#### **ÉTAPE 4 : Backend sur Heroku**

1. **Créer un compte** : https://www.heroku.com/

2. **Installer Heroku CLI** :
   ```bash
   # Windows (Chocolatey)
   choco install heroku-cli
   
   # macOS (Homebrew)
   brew tap heroku/brew && brew install heroku
   
   # Linux
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

3. **Se connecter à Heroku**
   ```bash
   heroku login
   ```

4. **Créer l'app Heroku**
   ```bash
   heroku create airline-ticket-shop-api
   ```

5. **Ajouter les variables d'environnement**
   ```bash
   # MongoDB URI (de MongoDB Atlas)
   heroku config:set MONGO_URI=mongodb+srv://admin:PASSWORD@cluster.mongodb.net/airline-tickets?retryWrites=true&w=majority
   
   # JWT Secret (générer une clé longue)
   heroku config:set JWT_SECRET=your_super_secret_key_min_32_characters_very_long
   
   # Email (Gmail)
   heroku config:set EMAIL_USER=votre_email@gmail.com
   heroku config:set EMAIL_PASS=votre_mot_de_passe_app
   
   # Environment
   heroku config:set NODE_ENV=production
   ```

6. **Vérifier les variables**
   ```bash
   heroku config
   ```

7. **Déployer le backend**
   ```bash
   git push heroku main
   ```

8. **Vérifier le déploiement**
   ```bash
   heroku logs --tail
   ```

9. **Tester l'API**
   ```bash
   curl https://airline-ticket-shop-api.herokuapp.com/api/health
   
   # Doit afficher : {"message":"Server is running","timestamp":"..."}
   ```

---

#### **ÉTAPE 5 : Mettre à jour le Frontend**

1. **Mettre à jour VITE_API_URL** sur Vercel
   ```
   Settings → Environment Variables
   VITE_API_URL=https://airline-ticket-shop-api.herokuapp.com/api
   ```

2. **Redéployer le frontend**
   ```bash
   # Via GitHub (auto) ou :
   vercel --prod
   ```

---

### ✅ Checklist Final

- [ ] MongoDB Atlas configuré et testé
- [ ] Backend sur Heroku avec bonnes variables
- [ ] Frontend sur Vercel avec VITE_API_URL correcte
- [ ] Email configuré et testé
- [ ] JWT_SECRET défini
- [ ] CORS autorisé pour Vercel URL
- [ ] Test d'une recherche de vol complet
- [ ] Test d'une réservation complète

---

### 📊 Architecture finale

```
User Browser
    ↓
https://airline-ticket-shop.vercel.app (Frontend React)
    ↓ HTTP Requests
https://airline-ticket-shop-api.herokuapp.com/api (Backend Express)
    ↓ Queries
MongoDB Atlas Cloud Database
```

---

## 🔗 URLs Finales

| Composant | URL |
|-----------|-----|
| Frontend | https://airline-ticket-shop.vercel.app |
| Backend API | https://airline-ticket-shop-api.herokuapp.com/api |
| MongoDB | mongodb+srv://... (cloud) |
| GitHub | https://github.com/dd21-mac/airline-ticket-shop |

---

## 🐛 Troubleshooting Déploiement

### ❌ Erreur : "Cannot GET /"

**Cause** : Frontend ne buildé correctement

**Solution** :
```bash
# Vérifier le build local
npm run build

# Vérifier la taille du dist
ls -la dist/

# Redéployer sur Vercel
vercel --prod
```

---

### ❌ Erreur : "API connection timeout"

**Cause** : Backend URL incorrecte ou non accessible

**Solution** :
```bash
# Tester le backend
curl https://airline-ticket-shop-api.herokuapp.com/api/health

# Vérifier les logs Heroku
heroku logs --tail

# Vérifier VITE_API_URL sur Vercel
```

---

### ❌ Erreur : "MongoDB connection failed"

**Cause** : MONGO_URI incorrecte ou IP non whitelistée

**Solution** :
```bash
# Vérifier la MONGO_URI
heroku config:get MONGO_URI

# Vérifier IP whitelist sur MongoDB Atlas
# Network Access → autoriser 0.0.0.0/0

# Redémarrer le dyno
heroku restart
```

---

### ❌ Erreur : "Email not sending"

**Cause** : Credentials Gmail incorrects

**Solution** :
1. Activer 2FA sur Gmail
2. Générer un mot de passe d'application
3. Mettre à jour EMAIL_PASS
```bash
heroku config:set EMAIL_PASS=nouveau_mot_de_passe_app
```

---

## 📈 Monitoring

### Heroku
```bash
# Voir les logs
heroku logs --tail

# Voir l'utilisation des ressources
heroku ps

# Redémarrer l'app
heroku restart
```

### Vercel
- Dashboard : vercel.com/dashboard
- Analytics : Vitesses et erreurs en temps réel

### MongoDB Atlas
- Voir les connexions actives
- Analyser les requêtes lentes

---

## 🎉 Félicitations !

Votre boutique de billets d'avion est maintenant **EN LIGNE** ! 🚀

**Prochaines étapes** :
1. Tester complètement
2. Ajouter des vols de test
3. Faire des réservations test
4. Vérifier les emails
5. Partager l'URL

---

## 💡 Tips Pro

✅ Utiliser un domaine custom
✅ Configurer HTTPS (auto sur Vercel/Heroku)
✅ Mettre en place un CDN (Vercel auto)
✅ Monitorer les performances
✅ Configurer des alertes d'erreur

**Bon déploiement ! ✈️**
