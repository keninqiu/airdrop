# Quick Server Log Check Guide

## Where to Check Logs

### 1. PM2 Application Logs (Most Important)
```bash
# View real-time logs
pm2 logs airdrop

# View last 100 lines
pm2 logs airdrop --lines 100

# View only error logs
pm2 logs airdrop --err
```

### 2. Nginx Error Logs
```bash
# View real-time errors
sudo tail -f /var/log/nginx/airdrop-error.log

# View last 100 lines
sudo tail -n 100 /var/log/nginx/airdrop-error.log
```

### 3. Nginx Access Logs
```bash
# View real-time access logs
sudo tail -f /var/log/nginx/airdrop-access.log
```

## Common Error Messages to Look For

### Missing AUTH_SECRET
```
Error: AUTH_SECRET is not set
```
**Fix:** Add `AUTH_SECRET` to your `.env` file

### Database Connection Error
```
Error: Can't reach database server
```
**Fix:** Check `DATABASE_URL` in `.env` and verify MySQL is running

### Port Already in Use
```
Error: Port 3000 is already in use
```
**Fix:** `pm2 restart airdrop` or kill the process using port 3000

## Quick Diagnostic Commands

```bash
# 1. Check if application is running
pm2 status

# 2. Check environment variables (on server)
cd /var/www/airdrop
cat .env

# 3. Verify database connection
npx prisma db pull

# 4. Check if port 3000 is listening
sudo lsof -i :3000

# 5. Test nginx configuration
sudo nginx -t
```

## Most Likely Issue: Missing AUTH_SECRET

Run this on your production server:
```bash
# 1. Generate a secret
openssl rand -base64 32

# 2. Edit .env file
cd /var/www/airdrop
nano .env

# 3. Add this line (replace with your generated secret):
AUTH_SECRET="your-generated-secret-here"
NEXTAUTH_URL="https://yourdomain.com"

# 4. Save and restart
pm2 restart airdrop

# 5. Check logs
pm2 logs airdrop
```
