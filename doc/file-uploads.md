# File Upload System

This application uses a separate file storage system for uploaded images.

## How It Works

1. **Upload Directory**: Files are stored in `public/uploads/`
2. **API Endpoint**: `/api/upload` handles file uploads
3. **File Naming**: Files are renamed with timestamp prefix to avoid conflicts
4. **Size Limit**: Maximum file size is 5MB
5. **Allowed Types**: Only image files are accepted

## Usage in Admin Panel

### Airdrops - Logo Upload
- Navigate to `/admin/airdrops`
- Click "Add Airdrop" or edit an existing one
- Either:
  - Enter a URL in the "Logo" field, OR
  - Click "Choose File" to upload an image
- Uploaded files are automatically saved to `/uploads/` and the URL is populated

### Posts - Image Upload
- Navigate to `/admin/posts`
- Click "Add Post" or edit an existing one
- Either:
  - Enter a URL in the "Image" field, OR
  - Click "Choose File" to upload an image
- Uploaded files are automatically saved to `/uploads/` and the URL is populated

## File Storage Structure

```
public/
└── uploads/
    ├── .gitkeep (tracked by git)
    ├── 1234567890-logo.png (ignored by git)
    ├── 1234567891-banner.jpg (ignored by git)
    └── ... (other uploaded files)
```

## Git Configuration

- The `public/uploads/` directory structure is tracked
- Actual uploaded files are ignored via `.gitignore`
- Only `.gitkeep` is committed to preserve the directory

## Production Deployment

### Important Notes

1. **Uploads Directory**: Ensure `public/uploads/` exists and is writable
   ```bash
   mkdir -p /var/www/airdrop/public/uploads
   chmod 755 /var/www/airdrop/public/uploads
   ```

2. **File Permissions**: The Node.js process must have write access
   ```bash
   sudo chown -R $USER:$USER /var/www/airdrop/public/uploads
   ```

3. **Backup Strategy**: Include uploads in your backup script
   ```bash
   # Add to backup script
   tar -czf /backups/uploads_$(date +%Y%m%d).tar.gz /var/www/airdrop/public/uploads
   ```

4. **Nginx Configuration**: Already configured to serve static files from `/public`

## File Upload API

### Endpoint
`POST /api/upload`

### Request
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: FormData with `file` field

### Response (Success)
```json
{
  "success": true,
  "url": "/uploads/1234567890-filename.jpg",
  "filename": "1234567890-filename.jpg"
}
```

### Response (Error)
```json
{
  "error": "Error message"
}
```

### Validation Rules
- File must be an image (image/*)
- Maximum size: 5MB
- Filename is sanitized (special characters replaced with underscores)
- Timestamp prefix added to prevent conflicts

## Security Considerations

1. **File Type Validation**: Only image MIME types are accepted
2. **Size Limit**: 5MB maximum to prevent abuse
3. **Filename Sanitization**: Special characters are removed
4. **Directory Traversal**: Prevented by using path.join()
5. **Public Access**: Files are publicly accessible via URL

## Troubleshooting

### Upload Fails
- Check directory permissions
- Verify disk space
- Check file size (must be < 5MB)
- Ensure file is an image

### Files Not Accessible
- Verify Nginx is serving `/public` correctly
- Check file permissions (should be 644)
- Ensure Next.js is serving static files

### Production Issues
- Check PM2 logs: `pm2 logs airdrop`
- Verify uploads directory exists
- Check ownership and permissions
