# Social Media Configuration

Add these environment variables to your `.env` or `.env.local` file to configure your social media links in the footer:

```bash
# Social Media Links
NEXT_PUBLIC_TELEGRAM_URL="https://t.me/yourhandle"
NEXT_PUBLIC_TWITTER_URL="https://twitter.com/yourhandle"
NEXT_PUBLIC_FACEBOOK_URL="https://facebook.com/yourpage"
NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/yourhandle"
NEXT_PUBLIC_YOUTUBE_URL="https://youtube.com/@yourchannel"
NEXT_PUBLIC_LINKEDIN_URL="https://linkedin.com/company/yourcompany"
```

## Social Media Icons in Footer

The footer now displays 6 social media icons in the bottom left:
1. **Telegram** - Using Send icon
2. **Twitter (X)** - Using Twitter icon
3. **Facebook** - Using Facebook icon
4. **Instagram** - Using Instagram icon
5. **YouTube** - Using YouTube icon
6. **LinkedIn** - Using LinkedIn icon

## How to Update

1. Add the environment variables to your `.env.local` file
2. Replace the placeholder URLs with your actual social media profile URLs
3. Restart your development server
4. The icons will appear in the footer with your links

## Default Behavior

If environment variables are not set, the icons will still display with placeholder URLs. Update them in your environment file to use your actual social media profiles.
