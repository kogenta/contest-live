# ⚡ Quick Start Guide (5 Minutes)

Follow these steps to get your contest voting system ready for tomorrow!

## Step 1: Firebase Setup (2 minutes)

### Create Firebase Project
1. Visit https://console.firebase.google.com/
2. Click "Add project"
3. Name it (e.g., "my-contest-vote")
4. Disable Google Analytics (optional)
5. Click "Create project"

### Enable Realtime Database
1. Click "Build" → "Realtime Database"
2. Click "Create Database"
3. Choose your location
4. Select "Start in test mode"
5. Click "Enable"

### Set Database Rules
1. Click "Rules" tab
2. Copy and paste:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
3. Click "Publish"

### Get Your Config
1. Click ⚙️ (gear icon) → "Project settings"
2. Scroll to "Your apps" section
3. Click Web icon `</>`
4. Register app with nickname
5. Copy the firebaseConfig object (looks like this):
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "my-project.firebaseapp.com",
  databaseURL: "https://my-project-default-rtdb.firebaseio.com",
  projectId: "my-project",
  storageBucket: "my-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123"
};
```

## Step 2: Update config.js (1 minute)

1. Open `config.js` in this repository
2. Replace everything between lines with your Firebase config:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```
3. Save the file

## Step 3: Enable GitHub Pages (1 minute)

1. Go to your GitHub repository
2. Click **Settings**
3. Click **Pages** in the sidebar
4. Under "Source":
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 2 minutes
7. Your app URL will appear at the top

## Step 4: Test It! (1 minute)

### Test Judge Login
1. Open your GitHub Pages URL
2. Click "👨‍⚖️ Judge Login"
3. Select "Judge 1"
4. Enter PIN: `1234`
5. Click "Login"

### Test Admin Panel
1. Go back and click "⚙️ Admin Panel"
2. Add a test contestant:
   - Name: "Test Lion"
   - Number: 1
3. Click "Add Contestant"

### Test Scoring
1. Login as Judge 1 again
2. Score the test contestant
3. Click "Submit Score"

### Test Public Display
1. Go back and click "🖥️ Public Display"
2. You should see your contestant ranked!

## Step 5: Prepare for Event

### Add Real Contestants
1. Open Admin Panel
2. Add all your contestants with their numbers

### Change Judge PINs (Recommended)
1. Go to Firebase Console
2. Click "Realtime Database"
3. Navigate to `judges` → `judge1` → `pin`
4. Change "1234" to your desired PIN
5. Repeat for all active judges

### Bookmark on iPads
1. Open the app URL on each iPad
2. Add to Home Screen for easy access
3. Test login on each device

## Event Day Setup

### 10 Minutes Before:
- [ ] Verify all contestants are added
- [ ] Test WiFi connection
- [ ] Login all 5 judges on their iPads
- [ ] Open Public Display on projector
- [ ] Put projector in full-screen mode (F11)

### During Contest:
- Judges score independently
- Rankings update automatically
- Monitor public display for issues

### After Contest:
- Take screenshot of final rankings
- Export data from Firebase if needed

## Default Settings

- **Judge PINs**: All set to `1234`
- **Active Judges**: Judge 1-5
- **Scoring Criteria**: 4 categories, 10 points each
- **Sample Contestants**: 3 pre-loaded (can delete)

## Need Help?

### App not loading?
- Check internet connection
- Clear browser cache
- Try incognito/private mode

### Scores not syncing?
- Verify Firebase config is correct
- Check Firebase Console for data
- Ensure database rules are published

### Can't login?
- Default PIN is `1234`
- Try different judge number
- Check if judge is active in Firebase

## Tips for Success

✅ **Test everything the day before**
✅ **Have stable WiFi for all judges**
✅ **Brief judges 10 minutes before contest**
✅ **Keep projector on public display**
✅ **Have backup paper scoring ready**

---

## You're Ready! 🎉

Your contest voting system is now live and ready for tomorrow!

Share the GitHub Pages URL with your judges:
`https://yourusername.github.io/contest-live/`

Good luck with your animal-themed contest! 🐾
