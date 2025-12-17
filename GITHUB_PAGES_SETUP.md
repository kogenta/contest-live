# GitHub Pages Setup Instructions

This repository is configured for automatic deployment to GitHub Pages.

## Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. In the left sidebar, click **Pages**
4. Under "Build and deployment":
   - Source: Select **GitHub Actions** (recommended)
   - OR if you prefer: Select **Deploy from a branch** → **main** → **/ (root)**
5. Click **Save**

## Using GitHub Actions (Recommended)

The included `.github/workflows/pages.yml` file will automatically deploy your site when you push to the main branch.

**First Time Setup:**
1. Merge this PR to the main branch
2. GitHub Actions will automatically deploy
3. Check the "Actions" tab to see deployment progress
4. Your site will be available at: `https://yourusername.github.io/contest-live/`

## Using Branch Deployment (Alternative)

If you prefer not to use GitHub Actions:
1. In Pages settings, choose "Deploy from a branch"
2. Select "main" branch and "/ (root)" folder
3. Wait 1-2 minutes for deployment
4. Your site will be available at: `https://yourusername.github.io/contest-live/`

## Verify Deployment

After enabling Pages, you can verify:
1. Go to Settings → Pages
2. You should see: "Your site is live at [URL]"
3. Click the URL to test your app
4. Remember to update `config.js` with your Firebase credentials!

## Custom Domain (Optional)

If you want to use a custom domain:
1. In Settings → Pages
2. Enter your custom domain
3. Follow GitHub's instructions to configure DNS
4. SSL certificate is provided automatically

## Troubleshooting

### Site not loading?
- Wait 2-3 minutes after enabling Pages
- Check that all files are in the root directory
- Verify `index.html` exists
- Clear browser cache (Ctrl+Shift+R)

### Actions failing?
- Check the Actions tab for error details
- Ensure Pages is enabled in Settings
- Verify the workflow file is in `.github/workflows/`

### Getting 404?
- Ensure repository is public (or you have GitHub Pro for private sites)
- Check that GitHub Pages is enabled
- Verify the URL format: `username.github.io/repository-name`

## Next Steps

After deployment:
1. ✅ Update `config.js` with Firebase credentials
2. ✅ Test the app at your GitHub Pages URL
3. ✅ Share the URL with judges for tomorrow's event
4. ✅ Bookmark on all iPads/tablets

Your contest voting system is ready to go! 🎉
