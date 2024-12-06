Here’s the updated `README.md` to reflect your setup with the hardcoded `API_URL` and `API_ID` in `src/api/index.ts`:

---

# Weather App 🌦️

A cross-platform React Native app to fetch and display real-time weather data using an external weather API.

## Features
- **Get Current Weather**: Displays current weather conditions.
- **Location-Based Data**: Fetches weather data for the user's location.
- **Search Functionality**: Search for weather data in other cities.
- **Cross-Platform**: Works on both Android and iOS.

---

## Prerequisites

1. **Node.js**: Ensure you have Node.js installed (recommended version: 16.x or later).
2. **React Native CLI**: Install the React Native CLI for development.
3. **Android Studio**: Required for Android development.
4. **Xcode**: Required for iOS development (macOS only).
5. **Weather API Key**: Obtain an API key from a weather data provider like [OpenWeatherMap](https://openweathermap.org/).

---

## Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repo/weather-app.git
   cd weather-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up API Configuration**
   - The API details are hardcoded in `src/api/index.ts`. Verify the following:
     ```typescript
     export const API_URL = 'https://api.openweathermap.org/data/2.5/';
     export const API_ID = 'your_api_key_here'; // Replace with your actual API key
     ```
   - Update `API_ID` with your actual API key.

---

## Run the App

### iOS
1. Install CocoaPods dependencies:
   ```bash
   cd ios
   pod install
   cd ..
   ```

2. Start the Metro Bundler:
   ```bash
   npm start
   ```

3. Run the app on an iOS simulator or connected device:
   ```bash
   npx react-native run-ios
   ```

### Android
1. Start the Metro Bundler:
   ```bash
   npm start
   ```

2. Run the app on an Android emulator or connected device:
   ```bash
   npx react-native run-android
   ```

---

## Scripts

- **Start Metro Bundler**: `npm start`
- **Run on iOS**: `npx react-native run-ios`
- **Run on Android**: `npx react-native run-android`
- **Lint**: `npm run lint`

---

## Notes

1. **Android Emulator**: Ensure Android Studio's emulator is set up with the proper SDK version (API level 30+ recommended).
2. **iOS Simulator**: Requires macOS with Xcode installed.
3. **API Rate Limits**: Check your API provider for any rate limits or restrictions.

---

## Troubleshooting

1. **Build Errors**:
   - Run `npm install` and ensure dependencies are correctly installed.
   - For iOS: Try `cd ios && pod install` again.

2. **Metro Bundler Issues**:
   - Clear the cache and restart:
     ```bash
     npm start --reset-cache
     ```

3. **API Issues**:
   - Ensure the `API_ID` is correctly configured in the `src/api/index.ts` file.
   - Check for API rate limits or incorrect city names.

---