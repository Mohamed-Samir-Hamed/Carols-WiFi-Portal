# Premium Hotel Wi-Fi Captive Portal
**Designed for Carols Beau Rivage Matrouh**

This project is a modern, responsive, and premium UI/UX redesign for a luxury hotel Wi-Fi captive portal. It features a cinematic video intro, smooth animations, dedicated view-switching, and a seamless login experience tailored for both mobile and desktop users.

## 🚀 How to Run and Test

This project is built using pure HTML, CSS, and Vanilla JavaScript. There are no frameworks or heavy dependencies required.

1. Extract all project files into a single folder.
2. Ensure you have added your background image (`hotel-image.jpg`), logo (`logo.png`), and video (`hotel-video.mp4`) into the `assets/` folder.
3. Simply double-click `index.html` to open it in any modern web browser (Chrome, Safari, Edge, Firefox).

## 🧪 Testing the Mock Data

The JavaScript file (`script.js`) currently includes a **Mock API** (simulated backend) so you can test the UI transitions, loading states, and error validations without needing a real database connection. 

Use the following credentials to test the portal:

### 1. Voucher Login
* **To test a SUCCESSFUL connection:**
  * Enter Voucher Code: `VIP123`
  * Check the *Terms & Conditions* box.
  * Click **Connect to Wi-Fi**.
  * *Result:* The button will show a loading spinner for 1 second, and you will be smoothly redirected to the "You're Connected" screen.
* **To test an ERROR state:**
  * Enter any random text.
  * Check the *Terms & Conditions* box and click connect.
  * *Result:* The UI will display a red inline error message: *"The voucher code is invalid or has expired."*

### 2. Account Login
Click the **"Account Login"** button at the bottom of the form to switch views.
* **To test a SUCCESSFUL connection:**
  * Enter Account: `guest`
  * Enter Password: `hotel2026`
  * Check the *Terms & Conditions* box.
  * Click **Login**.
  * *Result:* The button will load, and you will see the success screen.
* **To test an ERROR state:**
  * Enter any random account or password.
  * Check the box and click login.
  * *Result:* The UI will display a red inline error message: *"The account details could not be verified."*

*(Note: Leaving the inputs blank or forgetting to check the Terms & Conditions box will trigger local UI validations before attempting to connect).*

## 📁 File Structure

```text
/captive-portal
│
├── index.html        # The main structural layout and UI elements
├── style.css         # Premium design system, responsive rules, and animations
├── script.js         # UI logic, countdown timer, and mock API handling
└── /assets           # Folder containing media
    ├── logo.png             # Hotel logo
    ├── hotel-video.mp4      # Cinematic 10-second intro video
    └── hotel-image.jpg       # Background image for the login screen
