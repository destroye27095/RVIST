# RVISTApp Android

Native Android application for **Rift Valley National Polytechnic (RVNP)** School Management System.

## 📱 Features

- **Student Portal**: Access profile, fee balance, and academic results
- **QR Attendance System**: Scan QR codes for automated attendance tracking  
- **GPS Tracking**: Location-based features (planned)
- **Elections & Voting**: Student leadership voting system
- **Staff Management**: Teacher and administrative staff tracking
- **Course Management**: Browse courses and performance statistics
- **Real-time Notifications**: Stay updated with announcements

## 🛠 Tech Stack

- **Language**: Kotlin
- **Architecture**: MVVM (Model-View-ViewModel)
- **UI**: XML Layouts with Material Design
- **Networking**: Retrofit + OkHttp
- **Local Database**: Room Database
- **Dependency Injection**: Manual DI (can migrate to Hilt/Koin)
- **Async**: Kotlin Coroutines + Flow
- **QR Scanner**: ZXing library
- **Location**: Google Play Services Location API

## 📁 Project Structure

```
app/src/main/java/com/rvist/app/
├── activities/          # Activity screens
│   ├── LoginActivity.kt
│   └── DashboardActivity.kt
├── admin/              # Admin monitoring features
├── auth/               # Authentication logic
├── core/               # Application class
├── features/           # Feature modules
│   ├── elections/      # Voting system
│   ├── gps/           # GPS tracking
│   └── qr/            # QR scanning
├── models/             # Data models
└── MainActivity.kt     # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Android Studio Hedgehog (2023.1.1) or later
- JDK 8 or later
- Android SDK API 24+ (Android 7.0 Nougat)
- Gradle 8.2+

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd RVISTApp_Android
```

2. Open project in Android Studio
```
File > Open > Select RVISTApp_Android folder
```

3. Sync Gradle dependencies
```
Tools > Sync Project with Gradle Files
```

4. Run on emulator or physical device
```
Run > Run 'app'
```

## 📦 Dependencies

- AndroidX Core KTX: `1.12.0`
- Material Components: `1.11.0`
- Retrofit: `2.9.0`
- Room Database: `2.6.1`
- Coroutines: `1.7.3`
- ZXing QR Scanner: `4.3.0`
- Play Services Location: `21.1.0`

## 🔐 Authentication

Default mock authentication:
- **Username**: Any valid ID
- **Password**: 8-16 characters

## 📝 TODO

- [ ] Implement backend API integration
- [ ] Complete Room database setup
- [ ] Add biometric authentication
- [ ] Implement push notifications (FCM)
- [ ] Add offline mode support
- [ ] Implement data synchronization
- [ ] Add comprehensive unit tests
- [ ] Setup CI/CD pipeline
- [ ] Implement analytics tracking
- [ ] Add dark mode support

## 👨‍💻 Author

**WAMOTO RAPHAEL**  
Meru University IT Student  
2 Years Experience in App Development

## 📄 License

© 2026 RVNP RIFTVALLEY NATIONAL POLYTECHNIC. ALL COPYRIGHTS RESERVED.  
TERMS AND CONDITIONS APPLIED.

## 🤝 Contributing

This is an institutional project. For contributions, please contact the administration office.
