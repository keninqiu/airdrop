# Fix Image Upload 400 Error

## Problem
Uploaded images at `/uploads/` return 400 errors when accessed through Next.js Image component:
```
GET https://airdropscan.ai/_next/image?url=%2Fuploads%2F...&w=1200&q=75 400 (Bad Request)
```

## Root Cause
1. Images are uploaded to `public/uploads/` directory
2. Next.js Image Optimization tries to optimize them via `/_next/image`
3. In production, Next.js Image Optimization can't access dynamically uploaded files
4. Nginx doesn't have a specific configuration to serve `/uploads` directly

## Solution

### Option 1: Serve Uploads Directly via Nginx (Recommended)

Add this location block to your nginx configuration **before** the main `location /` block:

```nginx
# Serve uploaded files directly (bypass Next.js)
location /uploads/ {
    alias /data/all/airdrop/public/uploads/;
    expires 30d;
    add_header Cache-Control "public, immutable";
    access_log off;
}
```

**Full nginx config location:** `/etc/nginx/sites-available/airdrop`

Insert the block around line 128, before `location /`:

```nginx
server {
    listen 443 ssl http2;
    # ... other config ...
    
    # Serve uploaded files directly
    location /uploads/ {
        alias /data/all/airdrop/public/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # Main proxy location
    location / {
        proxy_pass http://nextjs_airdrop;
        # ... rest of config ...
    }
}
```

### Apply the Fix

```bash
# 1. Edit nginx config
sudo nano /etc/nginx/sites-available/airdrop

# 2. Add the /uploads/ location block (see above)

# 3. Test nginx configuration
sudo nginx -t

# 4. Reload nginx
sudo systemctl reload nginx

# 5. Test the image URL directly
curl -I https://airdropscan.ai/uploads/1764001827316-aster.png
# Should return 200 OK
```

### Option 2: Disable Image Optimization for Uploads (Alternative)

If you prefer to keep Next.js handling the images, you can disable optimization for uploaded files by using `unoptimized` prop:

```tsx
<Image 
    src="/uploads/image.png" 
    unoptimized={true}  // Bypass Next.js optimization
    width={1200} 
    height={800} 
    alt="Uploaded image" 
/>
```

## Recommended: Option 1 (Nginx Direct Serving)

**Pros:**
- Faster (no Next.js processing)
- Better caching
- Lower server load
- Works with any image size

**Cons:**
- No automatic image optimization
- No responsive image sizes

For uploaded images that don't need optimization, serving directly via nginx is the best approach.
