# Auto-Translate Feature - Setup Guide

## API Credentials Setup

To enable the auto-translate feature, you need to set up Google Cloud Translate API credentials.

### Option 1: API Key (Recommended for Development)

1. **Get a Google Cloud API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the "Cloud Translation API"
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the generated API key

2. **Add to Environment Variables:**
   - Create or edit `.env.local` in the project root
   - Add the following line:
     ```
     GOOGLE_TRANSLATE_API_KEY=your_api_key_here
     ```
   - Replace `your_api_key_here` with your actual API key

3. **Restart the Development Server:**
   ```bash
   npm run dev
   ```

### Option 2: Service Account (Recommended for Production)

1. **Create a Service Account:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Go to "IAM & Admin" → "Service Accounts"
   - Click "Create Service Account"
   - Grant it the "Cloud Translation API User" role
   - Create and download the JSON key file

2. **Add to Environment Variables:**
   - Place the JSON file in a secure location (e.g., `./config/google-credentials.json`)
   - Add to `.env.local`:
     ```
     GOOGLE_APPLICATION_CREDENTIALS=./config/google-credentials.json
     ```

3. **Restart the Development Server**

## Usage

### Posts Page

1. Navigate to `/admin/posts`
2. Click "Add Post" or edit an existing post
3. Fill in the English (EN) translation fields:
   - Title
   - Description (supports HTML formatting)
4. Click the **"Auto-Translate from EN"** button
5. Wait for translations to complete (progress shown in button)
6. Review and adjust translations as needed
7. Click "Save"

### Airdrops Page

1. Navigate to `/admin/airdrops`
2. Click "Add Airdrop" or edit an existing airdrop
3. Fill in the English (EN) translation fields:
   - Name
   - Description (supports HTML formatting)
   - How to Participate / Steps (supports HTML formatting)
4. Click the **"Auto-Translate from EN"** button
5. Wait for translations to complete
6. Review and adjust translations
7. Click "Save"

## Features

- ✅ Automatic translation from English to 8 languages (es, fr, de, zh, ja, ko, ru, pt)
- ✅ HTML preservation (formatting in rich text editor is maintained)
- ✅ Batch translation for efficiency
- ✅ Confirmation before overwriting existing translations
- ✅ Loading states and error handling
- ✅ Admin-only access (authentication required)

## Notes

- Translation quality depends on Google Translate API
- Always review automated translations before publishing
- HTML tags and formatting are preserved during translation
- The feature requires an active internet connection
- API usage may incur costs based on Google Cloud pricing
