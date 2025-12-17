# 🐾 Contest Live - Animal Theme Voting System 🐾

A real-time contest voting and scoring system perfect for costume, fashion, and talent contests with an animal theme. Built for speed, ease of use, and deployed for FREE on GitHub Pages with Firebase Realtime Database.

## ✨ Features

- **🔐 Judge PIN/Lock System**: Secure PIN authentication for 5-10 judges
- **🏆 Multiple Contestants**: Add unlimited contestants with live ranking
- **🖥️ Public Ranking Screen**: Perfect for projector display with live updates
- **📱 Mobile/Tablet Optimized**: Works seamlessly on iPads and mobile devices
- **📊 Score Breakdown**: 4 scoring criteria (Appearance, Creativity, Performance, Theme)
- **⚡ Real-time Sync**: Instant ranking updates using Firebase Realtime Database
- **🎨 Animal Theme**: Beautiful animal-themed UI with paw prints and emojis

## 🚀 Quick Setup (5 Minutes)

### Step 1: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or use existing project
3. Enter project name (e.g., "contest-vote")
4. Disable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Realtime Database

1. In Firebase Console, go to **Build** → **Realtime Database**
2. Click "Create Database"
3. Choose location (closest to your event)
4. Start in **Test mode** (we'll set rules next)
5. Click "Enable"

### Step 3: Set Database Rules

1. In Realtime Database, go to **Rules** tab
2. Replace with this (allows read/write for demo):

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

3. Click "Publish"

⚠️ **Note**: These rules are for demo/testing. For production, implement proper security rules.

### Step 4: Get Firebase Config

1. In Firebase Console, click the gear icon ⚙️ → "Project settings"
2. Scroll down to "Your apps" section
3. Click the Web icon `</>`
4. Register app with a nickname (e.g., "contest-vote-web")
5. Copy the `firebaseConfig` object

### Step 5: Update config.js

1. Open `config.js` in this repository
2. Replace the placeholder config with your Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Step 6: Enable GitHub Pages

1. Go to your repository **Settings**
2. Navigate to **Pages** (in the sidebar)
3. Under "Source", select **Deploy from a branch**
4. Select **main** branch and **/ (root)** folder
5. Click "Save"
6. Wait 1-2 minutes for deployment
7. Your app will be available at: `https://yourusername.github.io/contest-live/`

## 📖 How to Use

### For Judges (5 judges on iPads simultaneously)

1. Open the app URL on your iPad/tablet
2. Click **"👨‍⚖️ Judge Login"**
3. Select your judge number (Judge 1-10)
4. Enter PIN: **1234** (default for all judges)
5. Score each contestant on 4 criteria (0-10 points each):
   - Appearance / Costume
   - Creativity / Originality
   - Performance / Presentation
   - Theme Adherence (Animal)
6. Click **"Submit Score"** for each contestant
7. Scores sync in real-time!

### For Admin

1. Click **"⚙️ Admin Panel"**
2. **Add Contestants**: Enter name and number
3. **View All Contestants**: See and manage contestants
4. **Reset Scores**: Clear all scores (use with caution!)
5. **Judge PINs**: Default is 1234 for all judges

### For Public Display (Projector)

1. Open the app on a computer connected to projector
2. Click **"🖥️ Public Display"**
3. Rankings update automatically in real-time
4. Top 3 get medals 🥇🥈🥉

## 🔧 Customization

### Change Judge PINs

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Navigate to **Realtime Database**
3. Find `judges` → `judge1` (or any judge)
4. Click on `pin` value and change from "1234" to your desired PIN
5. Repeat for other judges

### Modify Scoring Criteria

Edit `app.js` and modify the `CRITERIA` array:

```javascript
const CRITERIA = [
    { id: 'appearance', name: 'Appearance / Costume', max: 10 },
    { id: 'creativity', name: 'Creativity / Originality', max: 10 },
    { id: 'performance', name: 'Performance / Presentation', max: 10 },
    { id: 'theme', name: 'Theme Adherence (Animal)', max: 10 }
];
```

### Change Theme

Edit `styles.css` to modify colors, fonts, and styling.

## 🎯 Use Cases

- Costume contests (Halloween, cosplay, etc.)
- Fashion shows
- Talent competitions
- Pet shows (perfect for animal theme!)
- School events
- Community festivals
- Dance competitions

## 📱 Tested On

- ✅ iPad (Safari)
- ✅ iPhone (Safari)
- ✅ Android tablets (Chrome)
- ✅ Desktop browsers (Chrome, Firefox, Safari, Edge)

## 🆘 Troubleshooting

### Scores not syncing?

1. Check Firebase Console → Realtime Database
2. Verify database rules are set correctly
3. Check browser console for errors (F12)
4. Ensure internet connection is stable

### Can't login as judge?

1. Default PIN is **1234** for all judges
2. Check if judge is marked as "active" in Firebase
3. Try a different judge number

### Rankings not showing?

1. Make sure at least one judge has submitted scores
2. Check Firebase Console to verify data is being saved
3. Refresh the public display page

## 🔒 Security Notes

⚠️ **Important**: The current database rules allow anyone to read/write. For production use:

1. Implement Firebase Authentication
2. Set proper security rules
3. Use environment variables for sensitive config
4. Change all judge PINs from default "1234"

## 💡 Tips

- **Test Before Event**: Run through the entire flow with test contestants
- **Backup Plan**: Take screenshots of Firebase data during event
- **Network**: Ensure stable WiFi for all judges
- **Projector**: Use full-screen mode (F11) for public display
- **Judge Training**: Brief judges on the app 10 minutes before contest

## 📦 What's Included

- `index.html` - Main application structure
- `styles.css` - Animal-themed styling and responsive design
- `app.js` - Application logic and Firebase integration
- `config.js` - Firebase configuration (update with your credentials)
- `README.md` - This file

## 🎉 Event Day Checklist

- [ ] Update Firebase config with your credentials
- [ ] Test on all judge devices (iPads)
- [ ] Add all contestants in admin panel
- [ ] Change judge PINs if needed
- [ ] Test score submission from multiple judges
- [ ] Set up projector with public display
- [ ] Ensure stable WiFi connection
- [ ] Have backup scoring method ready

## 📞 Support

If you encounter issues:
1. Check the Troubleshooting section above
2. Verify Firebase setup is complete
3. Check browser console for errors
4. Ensure all judges have internet connection

## 📄 License

This project is open source and available for anyone to use and modify.

---

**Ready for your contest tomorrow! Good luck! 🎊**
