# Testing Guide for Admin PIN and Judge Management Features

This guide helps you test the new admin authentication and judge management features.

## Prerequisites

1. Firebase Realtime Database configured and connected
2. Application deployed and accessible via web browser

## Test Scenarios

### 1. Admin PIN Login

#### Test Case 1.1: Valid Admin Login
1. Open the application
2. Click "⚙️ Admin Panel" button
3. Enter PIN: `9999` (default)
4. Click "Login"
5. **Expected**: Admin panel should open successfully

#### Test Case 1.2: Invalid Admin PIN
1. Open the application
2. Click "⚙️ Admin Panel" button
3. Enter PIN: `0000` (incorrect)
4. Click "Login"
5. **Expected**: Alert showing "Invalid admin PIN"

#### Test Case 1.3: Empty PIN
1. Open the application
2. Click "⚙️ Admin Panel" button
3. Leave PIN field empty
4. Click "Login"
5. **Expected**: Alert showing "Please enter a 4-digit PIN"

#### Test Case 1.4: Non-numeric PIN
1. Open the application
2. Click "⚙️ Admin Panel" button
3. Enter PIN: `abcd`
4. Click "Login"
5. **Expected**: Alert showing "PIN must be exactly 4 digits (0-9)"

### 2. Judge Management - View Judges

#### Test Case 2.1: View Judge List
1. Login to Admin Panel (PIN: 9999)
2. Navigate to "Manage Judges" section
3. **Expected**: 
   - List of judges displayed (Judge 1-10)
   - Each judge shows name and status (Active/Inactive)
   - Judges 1-5 should be active by default
   - Judges 6-10 should be inactive by default
   - Each judge has three buttons: "Change PIN", "Activate/Deactivate", "Delete"

### 3. Judge Management - Add New Judge

#### Test Case 3.1: Add New Judge Successfully
1. Login to Admin Panel
2. In "Add New Judge" section:
   - Judge Name: `Test Judge`
   - Judge Number: `15`
   - PIN: `5555`
   - Active: ✓ (checked)
3. Click "Add Judge"
4. **Expected**: 
   - Alert: "Judge added successfully! ✅"
   - New judge appears in the list
   - Judge 15 shows as Active

#### Test Case 3.2: Add Judge with Existing Number
1. Login to Admin Panel
2. Try to add a judge with number `1` (already exists)
3. **Expected**: Confirmation dialog asking to overwrite
4. Click "Cancel"
5. **Expected**: Judge 1 remains unchanged

#### Test Case 3.3: Add Judge with Invalid PIN
1. Login to Admin Panel
2. Try to add judge with PIN: `abc1`
3. **Expected**: Alert showing "Please enter a valid 4-digit PIN"

### 4. Judge Management - Change PIN

#### Test Case 4.1: Change Judge PIN Successfully
1. Login to Admin Panel
2. Find "Judge 1" in the list
3. Click "Change PIN" button
4. Enter new PIN: `7777`
5. Click OK
6. **Expected**: Alert "PIN updated successfully! ✅"
7. Verify by logging in as Judge 1 with new PIN

#### Test Case 4.2: Change PIN - Invalid Format
1. Login to Admin Panel
2. Click "Change PIN" for any judge
3. Enter: `12` (too short)
4. **Expected**: Alert "PIN must be exactly 4 digits (0-9)"

### 5. Judge Management - Toggle Status

#### Test Case 5.1: Deactivate Active Judge
1. Login to Admin Panel
2. Find an Active judge (e.g., Judge 1)
3. Click "Deactivate" button
4. **Expected**: 
   - Alert: "Judge deactivated successfully! ✅"
   - Judge status changes to "Inactive" (red badge)
   - Button changes to "Activate"

#### Test Case 5.2: Activate Inactive Judge
1. Login to Admin Panel
2. Find an Inactive judge (e.g., Judge 6)
3. Click "Activate" button
4. **Expected**: 
   - Alert: "Judge activated successfully! ✅"
   - Judge status changes to "Active" (green badge)
   - Button changes to "Deactivate"

#### Test Case 5.3: Inactive Judge Cannot Login
1. Deactivate Judge 2
2. Logout of Admin Panel
3. Try to login as Judge 2 with correct PIN
4. **Expected**: Alert "This judge account is not active. Please contact admin."

### 6. Judge Management - Delete Judge

#### Test Case 6.1: Delete Judge with Confirmation
1. Login to Admin Panel
2. Find any judge in the list
3. Click "Delete" button
4. **Expected**: Confirmation dialog appears
5. Click "OK"
6. **Expected**: 
   - Alert: "Judge deleted successfully! ✅"
   - Judge removed from the list

#### Test Case 6.2: Cancel Judge Deletion
1. Login to Admin Panel
2. Click "Delete" for any judge
3. Click "Cancel" on confirmation
4. **Expected**: Judge remains in the list

### 7. Integration Tests

#### Test Case 7.1: Judge Login After PIN Change
1. Login to Admin Panel
2. Change PIN for Judge 3 to `8888`
3. Logout
4. Try to login as Judge 3 with old PIN `1234`
5. **Expected**: Login fails
6. Login as Judge 3 with new PIN `8888`
7. **Expected**: Login successful

#### Test Case 7.2: Multiple Admin Sessions
1. Open application in Browser A
2. Open application in Browser B
3. Login to Admin Panel in Browser A
4. Make changes (add judge, change PIN, etc.)
5. Login to Admin Panel in Browser B
6. **Expected**: Changes from Browser A are visible in Browser B

### 8. Security Tests

#### Test Case 8.1: Admin PIN Protection
1. Try to access admin panel without login
2. **Expected**: Admin login screen appears first

#### Test Case 8.2: XSS Protection in Judge Names
1. Login to Admin Panel
2. Add judge with name: `<script>alert('XSS')</script>`
3. **Expected**: 
   - Judge name displayed as plain text
   - No JavaScript execution
   - No alert popup

#### Test Case 8.3: SQL Injection Protection in Judge Number
1. Login to Admin Panel
2. Try to add judge with number: `1'; DROP TABLE judges; --`
3. **Expected**: Firebase handles this safely (no SQL as it's NoSQL)

## Firebase Data Structure Verification

After adding/editing judges, verify in Firebase Console:

```
judges/
  judge1/
    name: "Judge 1"
    pin: "1234"
    active: true
  judge2/
    name: "Judge 2"
    pin: "1234"
    active: true
  ...

admin/
  pin: "9999"
  email: "admin@contest.local"
```

## Performance Tests

### Test Case 9.1: Large Number of Judges
1. Add 20 judges
2. Verify list loads quickly
3. Verify all actions (edit, delete, toggle) work smoothly

### Test Case 9.2: Rapid Fire Changes
1. Quickly change multiple judge PINs
2. Toggle multiple judge statuses
3. **Expected**: All changes saved correctly without conflicts

## Accessibility Tests

### Test Case 10.1: Keyboard Navigation
1. Use Tab key to navigate through admin login form
2. Press Enter to submit
3. **Expected**: Keyboard navigation works smoothly

### Test Case 10.2: Mobile Responsiveness
1. Open on mobile device or resize browser to mobile size
2. Access admin panel
3. **Expected**: 
   - Layout adjusts properly
   - All buttons accessible
   - Forms usable on mobile

## Cleanup

After testing:
1. Change admin PIN from default `9999`
2. Change all judge PINs from default `1234`
3. Remove any test judges created
4. Reset any deactivated judges to active if needed

## Known Limitations

1. Admin PIN stored in plain text in Firebase
2. Judge PINs stored in plain text in Firebase
3. No password recovery mechanism
4. No session timeout (stays logged in until browser refresh)

## Recommendations for Production

1. Change default admin PIN from 9999
2. Implement Firebase Security Rules
3. Use Firebase Authentication for better security
4. Add session timeout/auto-logout
5. Implement PIN encryption
6. Add audit logging for admin actions
