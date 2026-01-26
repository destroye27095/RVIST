# RVISTApp (RVNP Management System)

A premium School Management System for **Rift Valley National Polytechnic (RVNP / RVIST)** 2026.

## 🌟 Features

### Core Modules
- **📊 Dashboard**: Central administration hub with real-time statistics
- **👨‍🎓 Student Registry**: Manage admissions, fee balances, and academic profiles
- **👥 Staff Management**: Teacher tracking, attendance, and department oversight
- **📚 Course Management**: Browse courses, enrollment stats, and schedules
- **🔧 Project Tracking**: Monitor student and department projects with progress bars
- **📢 Announcements**: Digital notice board with priority levels
- **🗳️ Student Voice**: Polls, feedback, and leadership communication

### Technical Features
- **Glassmorphism UI**: Modern, premium design with blur effects
- **Dynamic Data Loading**: Fetch API integration with JSON data sources
- **Real-time Search**: Live filtering across all modules
- **ACID Transaction Simulation**: Activity logging and transaction management
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Authentication System**: Role-based access control
- **Toast Notifications**: User-friendly feedback system
- **Modal Dialogs**: Bootstrap-powered interactive modals

## 📁 Project Structure

```
RVISTApp/
├── index.html              # Main Dashboard
├── pages/
│   ├── login.html         # Secure login portal
│   ├── students.html      # Student management
│   ├── staff.html         # Staff directory
│   ├── courses.html       # Course catalog
│   ├── projects.html      # Project tracker
│   ├── announcements.html # Announcements board
│   └── voice.html         # Student polls & feedback
├── css/
│   └── style.css          # Global styles with CSS variables
├── js/
│   ├── app.js             # Core application logic
│   └── utils.js           # Utility functions & helpers
├── data/
│   ├── students.json      # Student records
│   ├── staff.json         # Staff directory
│   ├── courses.json       # Course catalog
│   ├── projects.json      # Project data
│   ├── announcements.json # Announcements feed
│   └── voice.json         # Polls and feedback
└── README.md              # Documentation
```

## 🚀 Getting Started

### ⚡ Easy Launch (Recommended)
If you are on Windows, simply double-click the **`START_SYSTEM.bat`** file in the root directory. This will start a local server and fix any "Not Loading" issues in Chrome.

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (REQUIRED for data loading)

### Installation

1. **Clone or download** the repository
```bash
git clone <repository-url>
cd RVISTApp
```

2. **Serve locally** (choose one method):

   **Option A: Using Python**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -M SimpleHTTPServer 8000
   ```

   **Option B: Using Node.js**
   ```bash
   npx http-server -p 8000
   ```

   **Option C: Using VS Code**
   - Install "Live Server" extension
   - Right-click `index.html` > "Open with Live Server"

3. **Access the application**
   ```
   http://localhost:8000
   ```

### Default Credentials

**Student Login:**
- Username: Any valid ID
- Password: 8-16 characters

**Admin Login:**
- Username: `principal` or `admin`
- Password: 8-16 characters

## 🎨 Design System

### Color Palette
```css
--primary: #0f172a    /* Deep Slate Blue */
--accent: #d4af37     /* Gold */
--bg-dark: #020617    /* Dark Background */
--success: #10b981    /* Green */
--danger: #ef4444     /* Red */
--text-light: #f8fafc /* Light Text */
--text-muted: #94a3b8 /* Muted Text */
```

### Typography
- **Font Family**: 'Outfit', sans-serif
- **Headings**: 700 weight
- **Body**: 400 weight
- **Accent**: 600 weight

### Components
- Glassmorphism panels with backdrop blur
- Gold accent highlighting
- Status badges (Active/Pending)
- Progress bars with gradient fills
- Phosphor Icons for UI elements

## 💻 Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, flexbox, grid, animations
- **JavaScript ES6+**: Async/await, modules, classes
- **Bootstrap 5**: Component framework
- **Phosphor Icons**: Icon library
- **Fetch API**: Data loading
- **LocalStorage**: Session management

## 📊 Data Structure

### Students (`students.json`)
```json
{
  "id": "RVNP001",
  "name": "Alice Wanjiku",
  "course": "Computer Science",
  "year": 2,
  "feeBalance": 15000,
  "attendance": 92,
  "status": "Active"
}
```

### Courses (`courses.json`)
```json
{
  "id": "CS101",
  "name": "Introduction to Programming",
  "code": "CS101",
  "department": "Computer Science",
  "students": 45,
  "instructor": "Dr. Margaret Kamau",
  "credits": 4,
  "schedule": "Mon, Wed, Fri 9:00 AM",
  "status": "Active"
}
```

## 🔧 Key Functions

### Global Utilities (window.RVISTUtils)
- `formatDate(dateString)` - Format dates consistently
- `formatCurrency(amount)` - Format currency values
- `calculatePercentage(value, total)` - Calculate percentages
- `generateId(prefix)` - Generate unique IDs
- `debounce(func, wait)` - Debounce function calls

### Toast Notifications (window.RVISTToast)
```javascript
RVISTToast.show('Success message', 'success', 3000);
RVISTToast.show('Error message', 'error', 3000);
```

### Form Validation (window.RVISTValidator)
```javascript
RVISTValidator.email('test@example.com');
RVISTValidator.phone('+254712345678');
RVISTValidator.password('securepass123');
```

### Storage (window.RVISTStorage)
```javascript
RVISTStorage.set('key', value);
RVISTStorage.get('key');
RVISTStorage.remove('key');
```

## 🔒 Security Features

- Password length validation (8-16 characters)
- LocalStorage-based session management
- Role-based access control
- XSS protection through proper escaping
- CSRF token support (backend required)

## 📱 Responsive Breakpoints

- Desktop: 1024px and above
- Tablet: 768px - 1023px
- Mobile: 320px - 767px

## 🛠️ Development

### Adding New Pages

1. Create HTML file in `pages/` directory
2. Include common header, sidebar, and footer
3. Add navigation link in sidebar
4. Create corresponding data file in `data/` if needed
5. Update `js/app.js` to fetch new data

### Customizing Styles

Edit `css/style.css` to modify:
- CSS custom properties (colors, fonts)
- Component styles
- Utility classes
- Responsive breakpoints

## 📝 TODO / Future Enhancements

- [ ] Backend API integration
- [ ] Real-time notifications (WebSocket)
- [ ] PDF report generation
- [ ] Data export (Excel, CSV)
- [ ] Advanced analytics dashboard
- [ ] Mobile app integration
- [ ] Biometric authentication
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Offline mode with service workers

## 👨‍💻 Author

**WAMOTO RAPHAEL**  
Meru University IT Student  
2 Years Experience in App Development

## 📄 License

© 2026 RVNP RIFTVALLEY NATIONAL POLYTECHNIC. ALL COPYRIGHTS RESERVED.  
TERMS AND CONDITIONS APPLIED.

## 🤝 Contributing

This is an institutional project. For contributions or issues:
1. Contact the administration office
2. Submit proposals through official channels
3. Follow institutional coding standards

## 📞 Support

For technical support or inquiries:
- Email: admin@rvnp.ac.ke
- Phone: +254 XXX XXX XXX
- Office: IT Department, Main Campus

---

**Built with ❤️ for RVNP Community**
