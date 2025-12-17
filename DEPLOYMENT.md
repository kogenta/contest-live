# 🚀 GitHub Pages Deployment Guide

This app is designed to work with GitHub Pages out of the box!

## Automatic Deployment

GitHub Pages will automatically serve your files from the root directory.

## Steps to Deploy

1. **Push your code** to the `main` branch of your repository
2. Go to your repository on GitHub
3. Click **Settings** → **Pages**
4. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for deployment
7. Your site will be available at: `https://yourusername.github.io/contest-live/`

## Before Your Event

1. ✅ Update `config.js` with your Firebase credentials
2. ✅ Test the app works locally by opening `index.html` in a browser
3. ✅ Push changes to GitHub
4. ✅ Verify GitHub Pages deployment is working
5. ✅ Test on actual iPads/tablets that judges will use
6. ✅ Bookmark the URL on all judge devices

## Testing Locally

Simply open `index.html` in any modern web browser:

```bash
# Option 1: Direct open
open index.html  # macOS
start index.html # Windows

# Option 2: Simple HTTP server (if you have Python)
python -m http.server 8000
# Then visit: http://localhost:8000

# Option 3: Simple HTTP server (if you have Node.js)
npx http-server
# Then visit: http://localhost:8080
```

## Custom Domain (Optional)

If you have a custom domain:

1. In repository Settings → Pages
2. Add your custom domain
3. Follow GitHub's instructions to configure DNS

## SSL Certificate

GitHub Pages automatically provides HTTPS for all sites.

## Updates During Event

If you need to make changes during the event:

1. Edit files locally
2. Commit and push to GitHub
3. Wait ~1 minute for deployment
4. Have judges refresh their browsers

## Performance Tips

- GitHub Pages is fast and free
- Firebase Realtime Database provides instant sync
- No server-side processing needed
- Works with 50+ simultaneous users

## Troubleshooting Deployment

### Site not showing up?

- Wait 2-3 minutes after enabling Pages
- Check that `index.html` is in the root directory
- Verify branch and folder settings in Pages configuration

### Getting 404 errors?

- Ensure all file names are lowercase
- Check that `config.js`, `app.js`, and `styles.css` are in the same directory as `index.html`

### Changes not appearing?

- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Wait a minute for GitHub to rebuild the site
- Check that changes were actually pushed to GitHub

## Support

For GitHub Pages issues: https://docs.github.com/en/pages
For Firebase issues: https://firebase.google.com/docs

---

**Your app should be live and ready to use! 🎉**
