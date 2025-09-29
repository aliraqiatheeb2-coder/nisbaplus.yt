# Nisba+ Productivity App

A modern productivity application for habit tracking, task management, and focus enhancement.

## Features

- Habit tracking with streak visualization
- Smart task management with priority levels
- Pomodoro timer for focus sessions
- Beautiful animations and sound effects
- Cross-platform support (Web, Android)

## Website

The professional website has been updated with:
- New stunning design with animations
- Android-only download (iOS and Web coming soon)
- Language toggle between Arabic and English
- Responsive layout for all devices

## Website Deployment

The website is automatically deployed to GitHub Pages using GitHub Actions.

### To check if GitHub Pages is configured:

1. Go to your repository settings on GitHub: https://github.com/aliraqiatheeb2-coder/nisbaplus.yt/settings
2. Scroll down to the "Pages" section
3. If it shows "Source: GitHub Actions", the website should be available at: https://aliraqiatheeb2-coder.github.io/nisbaplus.yt/
4. If not, select "GitHub Actions" as the source and save

### Local Development

To run the website locally:
```bash
npx serve website
```

Then open http://localhost:3000 in your browser.

## Android App

The Android app can be built using Capacitor:
```bash
npx cap sync
npx cap open android
```

## Technologies Used

- React with TypeScript
- Vite build system
- Tailwind CSS for styling
- Capacitor for mobile deployment
- Web Audio API for sound effects
- AOS (Animate On Scroll) for animations

## Project Structure

- `src/` - Main application source code
- `website/` - Landing page website
- `android/` - Android project files
- `sounds/` - Audio files for sound effects

## Latest Updates
- Privacy policy updated with correct developer information