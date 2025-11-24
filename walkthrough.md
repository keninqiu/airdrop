# Flutter Airdrop App Walkthrough

I have implemented a Flutter application `airdropapp` inside the `airdrop` repository. This app displays airdrops and posts, and supports multiple languages (English and Chinese).

## Features

1.  **Airdrops List**: Displays a list of airdrops with logo, name, description, status, and value.
2.  **Posts List**: Displays a list of posts with image, title, and description.
3.  **Localization**: Supports English and Chinese. You can switch languages in the Settings tab.
4.  **Data Fetching**: Tries to fetch data from `http://10.0.2.2:3000/api` (Android Emulator localhost). If the API is unreachable, it falls back to mock data.

## Project Structure

-   `lib/models`: Data models (`Airdrop`, `Post`) matching the Prisma schema.
-   `lib/services`: `ApiService` for fetching data.
-   `lib/providers`: `DataProvider` for state management and `LanguageProvider` for localization.
-   `lib/screens`: `HomeScreen` (tabs) and `SettingsScreen`.
-   `lib/widgets`: Reusable cards for airdrops and posts.
-   `lib/l10n`: Localization files (`app_en.arb`, `app_zh.arb`).

## How to Run

1.  **Navigate to the directory**:
    ```bash
    cd airdropapp
    ```

2.  **Install dependencies**:
    ```bash
    flutter pub get
    ```

3.  **Generate localization files**:
    ```bash
    flutter gen-l10n
    ```

4.  **Run the app**:
    ```bash
    flutter run
    ```

## Notes

-   The app assumes the backend is running on `localhost:3000`. If you are running on a real device, update `baseUrl` in `lib/services/api_service.dart` to your machine's IP address.
-   Mock data is provided if the backend is not running.
