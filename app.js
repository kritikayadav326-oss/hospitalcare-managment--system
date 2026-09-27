/*
*/
/*
*/
function doctorDashboard() {
  const doctorName = state.user.name === 'Aarav Mehta' ? 'Ananya Rao' : state.user.name;
  return `${pageHeader('Doctor workspace', 'Welcome, Dr. ' + escapeHtml(doctorName), 'A focused view of your clinical day.')}
    <div class="stat-grid four">
      <article class="stat card"><div class="stat-icon">P</div><strong>18</strong><span>Today's Patients</span></article>
      <article class="stat card"><div class="stat-icon">T</div><strong>06</strong><span>Pending Appointments</span></article>
      <article class="stat card"><div class="stat-icon">✓</div><strong>12</strong><span>Completed Consultations</span></article>
      <article class="stat card"><div class="stat-icon">Q</div><strong>04</strong><span>Patients Waiting</span></article>
    </div>
    <div class="section-heading"><h2>Today's Appointments</h2><span class="pill">18 total</span></div>
    <div class="stack">
      ${[['Aarav Mehta', '09:30 AM', '24', 'Waiting'], ['Riya Sharma', '10:00 AM', '25', 'Confirmed'], ['Kabir Singh', '10:30 AM', '26', 'Confirmed']].map((patient) => `<article class="appointment-card card"><div class="appointment-main">${avatar(initials(patient[0]))}<div class="appointment-meta"><strong>${patient[0]}</strong><span>General consultation · Token ${patient[2]}</span><span>${patient[1]}</span></div></div><div class="appointment-actions"><span class="pill ${patient[3] === 'Waiting' ? 'amber' : ''}">${patient[3]}</span><button class="btn" data-action="consultation">Start Consultation</button></div></article>`).join('')}
    </div>`;
}
const app = document.querySelector('#app');
const toastRegion = document.querySelector('#toast-region');

const state = {
  booting: true,
  screen: 'login',
  role: 'patient',
  user: { name: 'Aarav Mehta', email: 'aarav@example.com' },
  selectedDoctor: null,
  selectedDepartment: null,
  booking: { step: 1, department: '', doctor: '', date: '2026-09-25', time: '', token: '' },
  appointmentTab: 'upcoming',
  doctorQuery: '',
  doctorFilter: 'All departments',
  queue: { current: 20, your: 24, waiting: 3, notifications: true },
  consultationSaved: false,
  adminQueue: [
    { token: 21, name: 'Riya Sharma', type: 'Cardiology', status: 'Waiting' },
    { token: 22, name: 'Kabir Singh', type: 'General Medicine', status: 'Waiting' },
    { token: 23, name: 'Isha Nair', type: 'Pediatrics', status: 'Waiting' },
    { token: 24, name: 'Aarav Mehta', type: 'Orthopedics', status: 'Waiting' }
  ]
};

const departments = [
  { name: 'General Medicine', icon: '✚', color: 'teal', description: 'Everyday health, prevention and primary care.' },
  { name: 'Cardiology', icon: '♡', color: 'rose', description: 'Heart health, diagnostics and cardiac care.' },
  { name: 'Orthopedics', icon: '◈', color: 'blue', description: 'Bones, joints, movement and recovery.' },
  { name: 'Pediatrics', icon: '✦', color: 'amber', description: 'Compassionate care for children and families.' },
  { name: 'Dermatology', icon: '◌', color: 'teal', description: 'Healthy skin, hair and nail treatment.' },
  { name: 'ENT', icon: '◒', color: 'blue', description: 'Ear, nose and throat specialist care.' }
];
const doctors = [
  { id: 1, name: 'Dr. Ananya Rao', initials: 'AR', department: 'Cardiology', specialization: 'Interventional Cardiologist', experience: '12 years', available: 'Today, 09:30 - 13:00', qualifications: 'MBBS, MD Cardiology', slots: ['09:30 AM', '10:15 AM', '11:30 AM', '12:15 PM'] },
  { id: 2, name: 'Dr. Vikram Shah', initials: 'VS', department: 'General Medicine', specialization: 'Senior Physician', experience: '15 years', available: 'Today, 10:00 - 15:00', qualifications: 'MBBS, MD Medicine', slots: ['10:00 AM', '11:00 AM', '01:30 PM', '02:30 PM'] },
  { id: 3, name: 'Dr. Meera Iyer', initials: 'MI', department: 'Orthopedics', specialization: 'Orthopedic Surgeon', experience: '9 years', available: 'Tomorrow, 11:00 - 16:00', qualifications: 'MBBS, MS Orthopedics', slots: ['11:00 AM', '12:00 PM', '03:00 PM', '04:00 PM'] },
  { id: 4, name: 'Dr. Rahul Menon', initials: 'RM', department: 'Pediatrics', specialization: 'Child Specialist', experience: '11 years', available: 'Today, 09:00 - 12:00', qualifications: 'MBBS, DCH, MD Pediatrics', slots: ['09:00 AM', '10:30 AM', '11:15 AM'] },
  { id: 5, name: 'Dr. Sana Kapoor', initials: 'SK', department: 'Dermatology', specialization: 'Consultant Dermatologist', experience: '8 years', available: 'Tomorrow, 10:30 - 14:00', qualifications: 'MBBS, MD Dermatology', slots: ['10:30 AM', '11:30 AM', '01:00 PM'] },
  { id: 6, name: 'Dr. Arjun Bose', initials: 'AB', department: 'ENT', specialization: 'ENT Consultant', experience: '10 years', available: 'Today, 12:00 - 17:00', qualifications: 'MBBS, MS ENT', slots: ['12:00 PM', '01:00 PM', '03:30 PM'] }
];
const appointments = [
  { id: 1, doctor: 'Dr. Ananya Rao', initials: 'AR', department: 'Cardiology', date: '25 Sep 2026', time: '10:15 AM', token: 24, status: 'Upcoming' },
  { id: 2, doctor: 'Dr. Vikram Shah', initials: 'VS', department: 'General Medicine', date: '18 Aug 2026', time: '11:00 AM', token: 12, status: 'Completed' },
  { id: 3, doctor: 'Dr. Meera Iyer', initials: 'MI', department: 'Orthopedics', date: '02 Aug 2026', time: '03:00 PM', token: 8, status: 'Cancelled' }
];
const notifications = [
  { icon: '◷', title: 'Appointment reminder', text: 'Your Cardiology appointment is tomorrow at 10:15 AM.', date: 'Today, 8:42 AM', type: 'blue' },
  { icon: '⌁', title: 'Token update', text: 'You are 3 patients away from consultation.', date: 'Today, 8:20 AM', type: 'teal' },
  { icon: '✦', title: 'Health camp announcement', text: 'Free preventive health screening this Saturday.', date: 'Yesterday, 5:10 PM', type: 'amber' }
];
const documents = [
  { icon: 'Rx', title: 'Prescription', doctor: 'Dr. Vikram Shah', date: '18 Aug 2026', size: '240 KB' },
  { icon: '◫', title: 'Complete Blood Count', doctor: 'CareLabs Diagnostics', date: '17 Aug 2026', size: '1.2 MB' },
  { icon: '▣', title: 'Medical Certificate', doctor: 'Dr. Meera Iyer', date: '02 Aug 2026', size: '180 KB' }
];

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
const initials = (name) => name.split(' ').map((part) => part[0]).slice(0, 2).join('');
const showToast = (message, type = 'success') => {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastRegion.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
};
const navigate = (screen) => { state.screen = screen; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
const iconButton = (icon, label, action) => `<button class="icon-button" aria-label="${label}" data-action="${action}">${icon}</button>`;
const pageHeader = (eyebrow, title, description = '', back = '') => `<header class="page-header"><div>${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<h1>${title}</h1>${description ? `<p class="muted">${description}</p>` : ''}</div>${back ? iconButton('←', 'Go back', back) : ''}</header>`;
const avatar = (text, large = false) => `<div class="avatar ${large ? 'large' : ''}">${text}</div>`;

function render() {
  if (state.booting) { app.innerHTML = splashScreen(); return; }
  if (['login', 'register'].includes(state.screen)) { app.innerHTML = state.screen === 'login' ? loginScreen() : registerScreen(); bindEvents(); return; }
  app.innerHTML = `<div class="app-shell"><div class="app-frame">${topbar()}<main class="page-wrap">${screenContent()}</main></div>${bottomNav()}</div>`;
  bindEvents();
}
function splashScreen() { return `<main class="splash"><section class="splash-inner"><div class="brand-mark">+</div><h1>HospitalCare</h1><p class="muted">Smart Healthcare Management</p><div class="loader" aria-label="Loading"><span></span></div><p class="small muted" style="margin-top:16px">Preparing your care experience</p></section></main>`; }
function authBrand() { return `<div class="brand"><span class="brand-mark">+</span><span>HospitalCare</span></div>`; }
function loginScreen() { return `<div class="auth-layout"><aside class="auth-aside"><div class="auth-aside-content"><p class="eyebrow">Your health, connected</p><h1>Care that keeps you moving.</h1><p class="muted">A calmer, more connected way to manage appointments, queues and everyday healthcare.</p><ul><li><span>✓</span> Book appointments in a few taps</li><li><span>⌁</span> See your live queue position</li><li><span>♡</span> Keep all your care details together</li></ul></div></aside><main class="auth-main"><section class="auth-box">${authBrand()}<p class="eyebrow">Secure patient portal</p><h1>Welcome Back</h1><p class="muted">Sign in to continue your healthcare journey.</p><form class="form-grid" data-form="login" style="margin-top:24px"><div class="field"><label for="email">Email address</label><input id="email" type="email" value="aarav@example.com" placeholder="you@example.com" required /></div><div class="field"><label for="password">Password</label><input id="password" type="password" value="password" placeholder="Enter your password" required /></div><div class="field"><div class="row between"><label>Sign in as</label><button class="link small" type="button" data-action="forgot">Forgot password?</button></div><div class="role-selector">${roleOption('patient', 'Patient', '♙')}${roleOption('doctor', 'Doctor', '✚')}${roleOption('admin', 'Reception/Admin', '▦')}</div></div><div class="auth-actions"><button class="btn full" type="submit">Login <span>→</span></button><button class="btn secondary full" type="button" data-action="register">Create Account</button></div></form><p class="auth-footer muted">Demo prototype · No real credentials required</p></section></main></div>`; }
function roleOption(role, label, icon) { return `<button type="button" class="role-option ${state.role === role ? 'active' : ''}" data-role="${role}">${icon}<br>${label}</button>`; }
function registerScreen() { return `<div class="auth-layout"><aside class="auth-aside"><div class="auth-aside-content"><p class="eyebrow">Join HospitalCare</p><h1>Better care starts with a simple step.</h1><p class="muted">Create a demo account and explore the experience from a patient, doctor or admin perspective.</p></div></aside><main class="auth-main"><section class="auth-box">${authBrand()}<button class="btn ghost" type="button" data-action="login">← Back to login</button><p class="eyebrow" style="margin-top:28px">New account</p><h1>Create Account</h1><p class="muted">Tell us a little about yourself.</p><form class="form-grid" data-form="register" style="margin-top:22px"><div class="field"><label for="fullName">Full name</label><input id="fullName" placeholder="Aarav Mehta" required /><span class="form-error" data-error="fullName"></span></div><div class="field"><label for="regEmail">Email address</label><input id="regEmail" type="email" placeholder="you@example.com" required /><span class="form-error" data-error="regEmail"></span></div><div class="field"><label for="mobile">Mobile number</label><input id="mobile" type="tel" placeholder="+91 98765 43210" required /><span class="form-error" data-error="mobile"></span></div><div class="content-grid two-col"><div class="field"><label for="regPassword">Password</label><input id="regPassword" type="password" placeholder="At least 6 characters" required /></div><div class="field"><label for="confirmPassword">Confirm password</label><input id="confirmPassword" type="password" placeholder="Repeat password" required /></div></div><div class="field"><label>Choose a role</label><div class="role-selector">${roleOption('patient', 'Patient', '♙')}${roleOption('doctor', 'Doctor', '✚')}${roleOption('admin', 'Reception/Admin', '▦')}</div></div><button class="btn full" type="submit">Create Account <span>→</span></button></form></section></main></div>`; }

function topbar() { return `<header class="topbar"><div class="brand"><span class="brand-mark">+</span><span>HospitalCare</span></div><div class="topbar-actions">${iconButton('◔', 'Open notifications', 'notifications')}${avatar(initials(state.user.name))}</div></header>`; }
function navItems() { if (state.role === 'doctor') return [['doctor-dashboard', '⌂', 'Dashboard'], ['doctors', '♙', 'Patients'], ['queue', '⌁', 'Queue'], ['notifications', '◔', 'Notifications'], ['profile', '○', 'Profile']]; if (state.role === 'admin') return [['admin-dashboard', '⌂', 'Dashboard'], ['appointments', '▤', 'Appointments'], ['admin-queue', '⌁', 'Queue'], ['reports', '▥', 'Reports'], ['profile', '○', 'Profile']]; return [['dashboard', '⌂', 'Home'], ['appointments', '▤', 'Appointments'], ['queue', '⌁', 'Queue'], ['notifications', '◔', 'Notifications'], ['profile', '○', 'Profile']]; }
function bottomNav() { return `<nav class="bottom-nav" aria-label="Primary navigation">${navItems().map(([screen, icon, label]) => `<button class="nav-item ${state.screen === screen ? 'active' : ''}" data-action="${screen}"><span>${icon}</span><span>${label}</span></button>`).join('')}</nav>`; }
function screenContent() { const screens = { dashboard: patientDashboard, appointments: appointmentsScreen, queue: queueScreen, doctors: doctorsScreen, 'doctor-profile': doctorProfileScreen, departments: departmentsScreen, documents: documentsScreen, profile: profileScreen, notifications: notificationsScreen, settings: settingsScreen, 'book-appointment': bookingScreen, 'booking-success': bookingSuccessScreen, 'doctor-dashboard': doctorDashboard, consultation: consultationScreen, 'admin-dashboard': adminDashboard, 'admin-queue': adminQueueScreen, reports: reportsScreen }; return (screens[state.screen] || patientDashboard)(); }
function patientDashboard() { return `<div class="content-grid two-col"><div><section class="hero-card card"><p class="eyebrow" style="color:#9be0d9">${greeting()}</p><h1>Good Morning, ${escapeHtml(state.user.name.split(' ')[0])}</h1><p class="muted">Stay on top of your health, one small step at a time.</p><button class="btn" style="margin-top:14px;background:#fff;color:var(--teal-dark)" data-action="book-appointment">Book an appointment <span>→</span></button></section><div class="section-heading"><h2>Today at a glance</h2><button class="link" data-action="appointments">View all</button></div><div class="stat-grid"><article class="stat card"><div class="stat-icon">◷</div><strong>01</strong><span>Upcoming appointment</span></article><article class="stat card"><div class="stat-icon">⌁</div><strong>#24</strong><span>Current token</span></article></div></div><div><div class="section-heading" style="margin-top:0"><h2>Quick actions</h2></div><div class="quick-grid">${quickAction('＋', 'Book Appointment', 'book-appointment')}${quickAction('▤', 'My Appointments', 'appointments')}${quickAction('⌁', 'Token / Queue', 'queue')}${quickAction('♙', 'Doctors', 'doctors')}${quickAction('◈', 'Departments', 'departments')}${quickAction('▣', 'Medical Documents', 'documents')}${quickAction('○', 'My Profile', 'profile')}${quickAction('⚙', 'Settings', 'settings')}</div></div><section><div class="section-heading"><h2>Upcoming appointment</h2><button class="link" data-action="appointments">Manage</button></div>${appointmentCard(appointments[0])}</section><section><div class="section-heading"><h2>Next steps</h2></div><div class="card card-pad row between"><div class="row">${avatar('AR')}<div><h3>Dr. Ananya Rao</h3><p class="muted small">Cardiology · Tomorrow at 10:15 AM</p></div></div><span class="pill">Confirmed</span></div></section></div>`; }
function greeting() { const hour = new Date().getHours(); return hour < 12 ? 'Your care overview' : 'Your care overview'; }
function quickAction(icon, label, action) { return `<button class="quick-action" data-action="${action}"><span class="quick-icon">${icon}</span><span>${label}</span></button>`; }
function appointmentCard(item) { return `<article class="appointment-card card"><div class="appointment-main">${avatar(item.initials)}<div class="appointment-meta"><strong>${item.doctor}</strong><span>${item.department}</span><span>${item.date} · ${item.time} · Token ${item.token}</span></div></div><div class="appointment-actions"><span class="pill ${item.status === 'Cancelled' ? 'rose' : item.status === 'Completed' ? 'blue' : ''}">${item.status}</span><button class="btn secondary" data-action="view-appointment" data-id="${item.id}">View</button>${item.status === 'Upcoming' ? `<button class="btn danger" data-action="cancel-appointment" data-id="${item.id}">Cancel</button>` : ''}</div></article>`; }
function appointmentsScreen() { const filtered = appointments.filter((item) => item.status === state.appointmentTab); return `${pageHeader('Care calendar', 'My Appointments', 'Keep track of every visit in one place.') }<div class="tabs">${['Upcoming', 'Completed', 'Cancelled'].map((tab) => `<button class="tab ${state.appointmentTab === tab ? 'active' : ''}" data-tab="${tab}">${tab}</button>`).join('')}</div><div class="stack">${filtered.length ? filtered.map(appointmentCard).join('') : `<div class="empty card"><div class="empty-icon">▤</div><h3>No ${state.appointmentTab.toLowerCase()} appointments</h3><p class="muted">Your care history will appear here.</p><button class="btn" data-action="book-appointment">Book appointment</button></div>`}</div>`; }
function queueScreen() { return `${pageHeader('Live updates', 'Token / Queue', 'Know when it is your turn before you reach the hospital.') }<section class="queue-hero card"><p class="eyebrow">Your Token</p><div class="queue-number">${state.queue.your}</div><div class="row between small muted"><span>Queue progress</span><span>${state.queue.your - state.queue.current} served</span></div><div class="progress-track" style="margin-top:9px"><span></span></div><div class="queue-stats"><div class="queue-stat"><strong>${state.queue.current}</strong><span>Now Serving</span></div><div class="queue-stat"><strong>${state.queue.your - state.queue.current - 1}</strong><span>Patients Before You</span></div><div class="queue-stat"><strong>15 min</strong><span>Estimated Wait</span></div></div></section><div class="card card-pad row between" style="margin-top:16px"><div><h3>Queue notifications</h3><p class="muted small">Get an alert when your turn is close.</p></div><label class="switch"><input type="checkbox" data-action="queue-toggle" ${state.queue.notifications ? 'checked' : ''}><span class="switch-track"></span></label></div><div class="row" style="margin-top:16px"><button class="btn" data-action="refresh-queue">↻ Refresh Queue</button><button class="btn secondary" data-action="appointments">My appointment</button></div>`; }
function doctorsScreen() { const filtered = doctors.filter((doctor) => doctor.name.toLowerCase().includes(state.doctorQuery.toLowerCase()) && (state.doctorFilter === 'All departments' || doctor.department === state.doctorFilter)); return `${pageHeader('Specialist network', 'Find a Doctor', 'Choose the right expert for your next visit.') }<div class="search-row"><input class="search-input" data-input="doctor-query" value="${escapeHtml(state.doctorQuery)}" placeholder="Search doctors..." aria-label="Search doctors" /><select class="filter-select" data-input="doctor-filter" aria-label="Filter by department"><option>All departments</option>${departments.map((department) => `<option ${state.doctorFilter === department.name ? 'selected' : ''}>${department.name}</option>`).join('')}</select></div><div class="stack">${filtered.length ? filtered.map(doctorCard).join('') : `<div class="empty card"><div class="empty-icon">⌕</div><h3>No doctors found</h3><p class="muted">Try another name or department.</p></div>`}</div>`; }
function doctorCard(doctor) { return `<article class="doctor-card card">${avatar(doctor.initials)}<div class="doctor-body"><h3>${doctor.name}</h3><p>${doctor.specialization}</p><p>${doctor.experience} experience · ${doctor.available}</p></div><div class="doctor-action"><button class="btn secondary" data-action="doctor-profile" data-doctor="${doctor.id}">View Profile</button><button class="btn" data-action="start-booking" data-doctor="${doctor.id}">Book</button></div></article>`; }
function doctorProfileScreen() { const doctor = state.selectedDoctor || doctors[0]; return `${pageHeader('Specialist profile', 'Doctor Profile', 'Meet your care partner.', 'doctors')}<section class="card profile-head">${avatar(doctor.initials, true)}<div class="profile-info"><h2>${doctor.name}</h2><p class="muted">${doctor.specialization}</p><span class="pill">Available ${doctor.available}</span></div></section><div class="content-grid two-col" style="margin-top:16px"><section class="card card-pad"><h3>About the doctor</h3><div class="detail-list"><div class="detail-item"><span>Department</span><strong>${doctor.department}</strong></div><div class="detail-item"><span>Experience</span><strong>${doctor.experience}</strong></div><div class="detail-item"><span>Qualifications</span><strong>${doctor.qualifications}</strong></div><div class="detail-item"><span>Consultation</span><strong>₹ 700</strong></div></div></section><section class="card card-pad"><h3>Available time slots</h3><div class="time-grid" style="margin-top:14px">${doctor.slots.map((slot) => `<button class="time-slot" data-action="start-booking" data-doctor="${doctor.id}" data-time="${slot}">${slot}</button>`).join('')}</div><button class="btn full" style="margin-top:18px" data-action="start-booking" data-doctor="${doctor.id}">Book Appointment</button></section></div>`; }
function departmentsScreen() { return `${pageHeader('Care specialties', 'Departments', 'Explore services and find the right team.') }<div class="department-grid">${departments.map((department) => `<button class="department-card card" data-action="department-detail" data-department="${department.name}"><span class="department-icon">${department.icon}</span><h3>${department.name}</h3><p>${department.description}</p><span class="link" style="text-align:left">View doctors →</span></button>`).join('')}</div>`; }
function documentsScreen() { return `${pageHeader('Your records', 'Medical Documents', 'Keep your important health documents close.') }<div class="stack">${documents.map((document) => `<article class="document-card card"> <div class="document-icon">${document.icon}</div><div class="document-body"><h3>${document.title}</h3><p>${document.doctor} · ${document.date} · ${document.size}</p></div><button class="btn secondary" data-action="view-document">View</button><button class="icon-button" data-action="download-document" aria-label="Download ${document.title}">↓</button></article>`).join('')}</div><section class="card card-pad" style="margin-top:16px"><div class="row between"><div><h3>Upload a document</h3><p class="muted small">Add a prescription, report or referral letter.</p></div><span class="pill blue">Demo</span></div><label class="btn secondary" style="margin-top:15px">＋ Choose file<input type="file" data-action="upload-document" hidden /></label></section>`; }
function profileScreen() { return `${pageHeader('Account', 'My Profile', 'Your personal details and preferences.') }<section class="card profile-head">${avatar('AM', true)}<div class="profile-info"><h2>${escapeHtml(state.user.name)}</h2><p class="muted">Patient ID · HC-2048</p><span class="pill">Active member</span></div></section><section class="card card-pad" style="margin-top:16px"><div class="detail-list"><div class="detail-item"><span>Full Name</span><strong>${escapeHtml(state.user.name)}</strong></div><div class="detail-item"><span>Age / Gender</span><strong>28 years · Male</strong></div><div class="detail-item"><span>Mobile</span><strong>+91 98765 43210</strong></div><div class="detail-item"><span>Email</span><strong>${escapeHtml(state.user.email)}</strong></div><div class="detail-item"><span>Address</span><strong>Indiranagar, Bengaluru</strong></div></div></section><div class="stack" style="margin-top:16px"><button class="btn secondary" data-action="edit-profile">✎ Edit Profile</button><button class="btn ghost" data-action="change-password">Change Password</button><button class="btn danger" data-action="logout">Log out</button><button class="btn ghost" data-action="settings">⚙ Settings</button></div>`; }
function notificationsScreen() { return `${pageHeader('Stay in the loop', 'Notifications', 'Helpful updates from your care team.') }<div class="stack">${notifications.map((notification) => `<article class="card card-pad row"><div class="department-icon" style="background:var(--${notification.type}-soft);color:var(--${notification.type})">${notification.icon}</div><div style="flex:1"><h3>${notification.title}</h3><p class="muted small">${notification.text}</p><p class="muted" style="margin:7px 0 0;font-size:.7rem">${notification.date}</p></div><span class="pill"></span></article>`).join('')}</div>`; }
function settingsScreen() { return `${pageHeader('Preferences', 'Settings', 'Make HospitalCare work your way.') }<section class="card card-pad"><div class="detail-list"><div class="detail-item"><span>Notifications</span><label class="switch"><input type="checkbox" checked><span class="switch-track"></span></label></div><div class="detail-item"><span>Language</span><strong>English <span class="muted">⌄</span></strong></div><div class="detail-item"><span>Dark Mode</span><label class="switch"><input type="checkbox" data-action="dark-mode"><span class="switch-track"></span></label></div><div class="detail-item"><span>Privacy</span><button class="link">View policy →</button></div><div class="detail-item"><span>Help & Support</span><button class="link" data-action="help">Contact us →</button></div></div></section><button class="btn danger full" style="margin-top:16px" data-action="logout">Log out</button>`; }

function bookingScreen() { const steps = ['Department', 'Doctor', 'Date', 'Time', 'Confirm']; return `${pageHeader('Schedule care', 'Book Appointment', 'A simple five-step booking flow.', state.booking.step > 1 ? 'book-back' : '') }<div class="stepper">${steps.map((step, index) => `<div class="step ${index + 1 <= state.booking.step ? 'active' : ''}"><span class="step-circle">${index + 1 <= state.booking.step ? '✓' : index + 1}</span><span>${step}</span></div>`).join('')}</div><section class="card form-card">${bookingStepContent()}</section>`; }
function bookingStepContent() { if (state.booking.step === 1) return `<p class="eyebrow">Step 1 of 5</p><h2>Choose a department</h2><div class="department-grid" style="margin-top:18px">${departments.map((department) => `<button class="department-card card ${state.booking.department === department.name ? 'selected' : ''}" data-action="select-department" data-department="${department.name}"><span class="department-icon">${department.icon}</span><h3>${department.name}</h3></button>`).join('')}</div>`; if (state.booking.step === 2) return `<p class="eyebrow">Step 2 of 5</p><h2>Choose a doctor</h2><div class="stack" style="margin-top:18px">${doctors.filter((doctor) => doctor.department === state.booking.department).map(doctorCard).join('')}</div>`; if (state.booking.step === 3) return `<p class="eyebrow">Step 3 of 5</p><h2>Choose a date</h2><div class="form-grid" style="margin-top:18px"><div class="field"><label for="booking-date">Appointment date</label><input id="booking-date" type="date" value="${state.booking.date}" min="2026-09-23" data-input="booking-date" /></div><button class="btn" data-action="next-booking">Continue to time <span>→</span></button></div>`; if (state.booking.step === 4) { const doctor = doctors.find((item) => item.id === Number(state.booking.doctor)) || doctors[0]; return `<p class="eyebrow">Step 4 of 5</p><h2>Select a time</h2><p class="muted">Available slots for ${doctor.name}</p><div class="time-grid" style="margin:18px 0">${doctor.slots.map((slot) => `<button class="time-slot ${state.booking.time === slot ? 'active' : ''}" data-action="select-time" data-time="${slot}">${slot}</button>`).join('')}</div>`; } const doctor = doctors.find((item) => item.id === Number(state.booking.doctor)) || doctors[0]; return `<p class="eyebrow">Step 5 of 5</p><h2>Confirm your appointment</h2><div class="card card-pad" style="margin:18px 0;background:var(--canvas)"><div class="row">${avatar(doctor.initials)}<div><h3>${doctor.name}</h3><p class="muted small">${doctor.department} · ${doctor.specialization}</p></div></div><div class="detail-list" style="margin-top:12px"><div class="detail-item"><span>Date</span><strong>${formatDate(state.booking.date)}</strong></div><div class="detail-item"><span>Time</span><strong>${state.booking.time}</strong></div><div class="detail-item"><span>Consultation fee</span><strong>₹ 700</strong></div></div></div><button class="btn full" data-action="confirm-booking">Confirm Appointment</button>`; }
function bookingSuccessScreen() { const doctor = doctors.find((item) => item.id === Number(state.booking.doctor)) || doctors[0]; return `<section class="success-panel card"><div class="success-icon">✓</div><p class="eyebrow">You are all set</p><h1>Appointment Confirmed</h1><p class="muted">Your visit has been added to your care calendar.</p><div class="card card-pad" style="width:100%;margin:18px 0;text-align:left"><div class="row">${avatar(doctor.initials)}<div><h3>${doctor.name}</h3><p class="muted small">${doctor.department}</p></div></div><div class="detail-list" style="margin-top:12px"><div class="detail-item"><span>Date</span><strong>${formatDate(state.booking.date)}</strong></div><div class="detail-item"><span>Time</span><strong>${state.booking.time}</strong></div><div class="detail-item"><span>Token Number</span><strong>#${state.booking.token || 25}</strong></div></div></div><button class="btn full" data-action="appointments">View Appointment</button><button class="btn ghost" data-action="dashboard">Back to home</button></section>`; }
function formatDate(value) { return new Date(`${value}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
/*

function doctorDashboard() { return `${pageHeader('Doctor workspace', 'Welcome, Dr. ${escapeHtml(state.user.name === 'Aarav Mehta' ? 'Ananya Rao' : state.user.name)}', 'A focused view of your clinical day.') }<div class="stat-grid four"><article class="stat card"><div class="stat-icon">♙</div><strong>18</strong><span>Today's Patients</span></article><article class="stat card"><div class="stat-icon">◷</div><strong>06</strong><span>Pending Appointments</span></article><article class="stat card"><div class="stat-icon">✓</div><strong>12</strong><span>Completed Consultations</span></article><article class="stat card"><div class="stat-icon">⌁</div><strong>04</strong><span>Patients Waiting</span></article></div><div class="section-heading"><h2>Today's Appointments</h2><span class="pill">18 total</span></div><div class="stack">${[['Aarav Mehta', '09:30 AM', '24', 'Waiting'], ['Riya Sharma', '10:00 AM', '25', 'Confirmed'], ['Kabir Singh', '10:30 AM', '26', 'Confirmed']].map((patient) => `<article class="appointment-card card"><div class="appointment-main">${avatar(initials(patient[0]))}<div class="appointment-meta"><strong>${patient[0]}</strong><span>General consultation · Token ${patient[2]}</span><span>${patient[1]}</span></div></div><div class="appointment-actions"><span class="pill ${patient[3] === 'Waiting' ? 'amber' : ''}">${patient[3]}</span><button class="btn" data-action="consultation">Start Consultation</button></div></article>`).join('')}</div>`; }
function consultationScreen() { return `${pageHeader('Clinical workspace', 'Doctor Consultation', 'Record the essentials for a thoughtful follow-up.', 'doctor-dashboard')}<div class="consultation-grid"><section class="card card-pad"><p class="eyebrow">Selected patient</p><div class="row">${avatar('AM', true)}<div><h2>Aarav Mehta</h2><p class="muted small">Patient ID · HC-2048</p></div></div><div class="detail-list" style="margin-top:15px"><div class="detail-item"><span>Age / Gender</span><strong>28 years · Male</strong></div><div class="detail-item"><span>Appointment</span><strong>09:30 AM</strong></div><div class="detail-item"><span>Token</span><strong>#24</strong></div></div></section><section class="card form-card"><form class="form-grid" data-form="consultation"><div class="field"><label for="symptoms">Symptoms</label><textarea id="symptoms" placeholder="Describe the patient's symptoms..."></textarea></div><div class="field"><label for="diagnosis">Diagnosis</label><input id="diagnosis" placeholder="Enter diagnosis" /></div><div class="field"><label for="notes">Doctor Notes</label><textarea id="notes" placeholder="Add clinical notes..."></textarea></div><div class="field"><label for="medicines">Medicines</label><input id="medicines" placeholder="Medicine name and dosage" /></div><div class="field"><label for="followup">Follow-up Date</label><input id="followup" type="date" /></div><button class="btn full" type="submit">Save Consultation</button></form></section></div>`; }
function adminDashboard() { return `${pageHeader('Operations hub', 'Reception / Admin', 'Keep the hospital day moving smoothly.') }<div class="stat-grid four"><article class="stat card"><div class="stat-icon">♙</div><strong>1,248</strong><span>Total Patients</span></article><article class="stat card"><div class="stat-icon">◷</div><strong>42</strong><span>Today's Appointments</span></article><article class="stat card"><div class="stat-icon">✚</div><strong>18</strong><span>Doctors Available</span></article><article class="stat card"><div class="stat-icon">⌁</div><strong>09</strong><span>Waiting Patients</span></article></div><div class="section-heading"><h2>Quick actions</h2></div><div class="quick-grid">${quickAction('＋', 'Register Patient', 'register-patient')}${quickAction('▤', 'Manage Appointments', 'appointments')}${quickAction('♙', 'Manage Doctors', 'doctors')}${quickAction('⌁', 'Queue Management', 'admin-queue')}${quickAction('◈', 'Departments', 'departments')}${quickAction('▥', 'Reports', 'reports')}</div><div class="section-heading"><h2>Live queue snapshot</h2><button class="link" data-action="admin-queue">Open queue</button></div><div class="card card-pad row between"><div class="row"><div class="token">${state.adminQueue[0]?.token || '--'}</div><div><h3>Current token</h3><p class="muted small">${state.adminQueue[0]?.name || 'Queue cleared'} · ${state.adminQueue[0]?.type || ''}</p></div></div><span class="pill amber">Waiting</span></div>`; }
function adminQueueScreen() { const current = state.adminQueue[0]; return `${pageHeader('Front desk tools', 'Queue Management', 'Call, skip and reset the live patient queue.') }<section class="card queue-hero"><p class="eyebrow">Now serving</p><div class="queue-number">${current ? current.token : '--'}</div><p class="muted">${current ? `${current.name} · ${current.type}` : 'The queue is clear'}</p><div class="row" style="justify-content:center;margin-top:18px"><button class="btn" data-action="call-next">Call Next Patient</button><button class="btn secondary" data-action="skip-token">Skip Token</button></div><button class="btn ghost" style="margin-top:8px" data-action="reset-queue">Reset Queue</button></section><div class="section-heading"><h2>Patient queue</h2><span class="pill">${state.adminQueue.length} waiting</span></div><div class="queue-list">${state.adminQueue.length ? state.adminQueue.map((patient) => `<div class="queue-row card"><div class="token">${patient.token}</div><div style="flex:1"><h3>${patient.name}</h3><p class="muted small">${patient.type}</p></div><span class="pill ${patient.status === 'Called' ? 'blue' : ''}">${patient.status}</span></div>`).join('') : `<div class="empty card"><div class="empty-icon">✓</div><h3>Queue is clear</h3><p class="muted">New patients will appear here.</p></div>`}</div>`; }
function reportsScreen() { return `${pageHeader('Operations insights', 'Reports', 'A lightweight overview for today.') }<div class="content-grid two-col"><section class="card card-pad"><h3>Appointment completion</h3><div class="queue-number" style="font-size:3rem;text-align:left">84%</div><div class="progress-track"><span style="width:84%"></span></div><p class="muted small" style="margin-top:12px">35 of 42 appointments completed today.</p></section><section class="card card-pad"><h3>Department activity</h3>${departments.slice(0, 4).map((department, index) => `<div class="row between" style="margin-top:15px"><span class="small">${department.name}</span><strong>${12 - index * 2}</strong></div>`).join('')}</section></div><button class="btn" style="margin-top:16px" data-action="download-report">↓ Download daily report</button>`; }
*/

function consultationScreen() {
  return `${pageHeader('Clinical workspace', 'Doctor Consultation', 'Record the essentials for a thoughtful follow-up.', 'doctor-dashboard')}<div class="consultation-grid"><section class="card card-pad"><p class="eyebrow">Selected patient</p><div class="row">${avatar('AM', true)}<div><h2>Aarav Mehta</h2><p class="muted small">Patient ID · HC-2048</p></div></div><div class="detail-list" style="margin-top:15px"><div class="detail-item"><span>Age / Gender</span><strong>28 years · Male</strong></div><div class="detail-item"><span>Appointment</span><strong>09:30 AM</strong></div><div class="detail-item"><span>Token</span><strong>#24</strong></div></div></section><section class="card form-card"><form class="form-grid" data-form="consultation"><div class="field"><label for="symptoms">Symptoms</label><textarea id="symptoms" placeholder="Describe the patient's symptoms..."></textarea></div><div class="field"><label for="diagnosis">Diagnosis</label><input id="diagnosis" placeholder="Enter diagnosis" /></div><div class="field"><label for="notes">Doctor Notes</label><textarea id="notes" placeholder="Add clinical notes..."></textarea></div><div class="field"><label for="medicines">Medicines</label><input id="medicines" placeholder="Medicine name and dosage" /></div><div class="field"><label for="followup">Follow-up Date</label><input id="followup" type="date" /></div><button class="btn full" type="submit">Save Consultation</button></form></section></div>`;
}

function adminDashboard() {
  return `${pageHeader('Operations hub', 'Reception / Admin', 'Keep the hospital day moving smoothly.')}<div class="stat-grid four"><article class="stat card"><div class="stat-icon">P</div><strong>1,248</strong><span>Total Patients</span></article><article class="stat card"><div class="stat-icon">T</div><strong>42</strong><span>Today's Appointments</span></article><article class="stat card"><div class="stat-icon">D</div><strong>18</strong><span>Doctors Available</span></article><article class="stat card"><div class="stat-icon">Q</div><strong>09</strong><span>Waiting Patients</span></article></div><div class="section-heading"><h2>Quick actions</h2></div><div class="quick-grid">${quickAction('＋', 'Register Patient', 'register-patient')}${quickAction('▤', 'Manage Appointments', 'appointments')}${quickAction('♙', 'Manage Doctors', 'doctors')}${quickAction('⌁', 'Queue Management', 'admin-queue')}${quickAction('◈', 'Departments', 'departments')}${quickAction('▥', 'Reports', 'reports')}</div><div class="section-heading"><h2>Live queue snapshot</h2><button class="link" data-action="admin-queue">Open queue</button></div><div class="card card-pad row between"><div class="row"><div class="token">${state.adminQueue[0]?.token || '--'}</div><div><h3>Current token</h3><p class="muted small">${state.adminQueue[0]?.name || 'Queue cleared'}</p></div></div><span class="pill amber">Waiting</span></div>`;
}

function adminQueueScreen() {
  const current = state.adminQueue[0];
  return `${pageHeader('Front desk tools', 'Queue Management', 'Call, skip and reset the live patient queue.')}<section class="card queue-hero"><p class="eyebrow">Now serving</p><div class="queue-number">${current ? current.token : '--'}</div><p class="muted">${current ? `${current.name} · ${current.type}` : 'The queue is clear'}</p><div class="row" style="justify-content:center;margin-top:18px"><button class="btn" data-action="call-next">Call Next Patient</button><button class="btn secondary" data-action="skip-token">Skip Token</button></div><button class="btn ghost" style="margin-top:8px" data-action="reset-queue">Reset Queue</button></section><div class="section-heading"><h2>Patient queue</h2><span class="pill">${state.adminQueue.length} waiting</span></div><div class="queue-list">${state.adminQueue.length ? state.adminQueue.map((patient) => `<div class="queue-row card"><div class="token">${patient.token}</div><div style="flex:1"><h3>${patient.name}</h3><p class="muted small">${patient.type}</p></div><span class="pill ${patient.status === 'Called' ? 'blue' : ''}">${patient.status}</span></div>`).join('') : `<div class="empty card"><div class="empty-icon">✓</div><h3>Queue is clear</h3><p class="muted">New patients will appear here.</p></div>`}</div>`;
}

function reportsScreen() {
  return `${pageHeader('Operations insights', 'Reports', 'A lightweight overview for today.')}<div class="content-grid two-col"><section class="card card-pad"><h3>Appointment completion</h3><div class="queue-number" style="font-size:3rem;text-align:left">84%</div><div class="progress-track"><span style="width:84%"></span></div><p class="muted small" style="margin-top:12px">35 of 42 appointments completed today.</p></section><section class="card card-pad"><h3>Department activity</h3>${departments.slice(0, 4).map((department, index) => `<div class="row between" style="margin-top:15px"><span class="small">${department.name}</span><strong>${12 - index * 2}</strong></div>`).join('')}</section></div><button class="btn" style="margin-top:16px" data-action="download-report">↓ Download daily report</button>`;
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (form.dataset.form === 'login') {
    const email = form.querySelector('#email').value.trim();
    if (!email.includes('@')) return showToast('Enter a valid email address', 'error');
    state.user = { name: state.role === 'doctor' ? 'Dr. Ananya Rao' : state.role === 'admin' ? 'Nisha Verma' : 'Aarav Mehta', email };
    state.screen = state.role === 'doctor' ? 'doctor-dashboard' : state.role === 'admin' ? 'admin-dashboard' : 'dashboard';
    showToast(`Welcome back, ${state.user.name.split(' ')[0]}`);
    return render();
  }
  if (form.dataset.form === 'register') {
    const fullName = form.querySelector('#fullName').value.trim();
    const password = form.querySelector('#regPassword').value;
    const confirm = form.querySelector('#confirmPassword').value;
    if (fullName.length < 2) return showToast('Please enter your full name', 'error');
    if (password.length < 6) return showToast('Password must be at least 6 characters', 'error');
    if (password !== confirm) return showToast('Passwords do not match', 'error');
    state.user = { name: fullName, email: form.querySelector('#regEmail').value };
    state.screen = 'dashboard';
    state.role = 'patient';
    showToast('Account created. Welcome to HospitalCare!');
    return render();
  }
  if (form.dataset.form === 'consultation') {
    state.consultationSaved = true;
    showToast('Consultation saved successfully');
    return navigate('doctor-dashboard');
  }
}

setTimeout(() => { state.booting = false; render(); }, 1700);

function bindEvents() {
  document.querySelectorAll('[data-action]').forEach((element) => {
    if (element.dataset.action === 'upload-document') return;
    element.addEventListener('click', handleAction);
    if (element.type === 'checkbox') element.addEventListener('change', handleAction);
  });
  document.querySelectorAll('[data-role]').forEach((element) => element.addEventListener('click', () => { state.role = element.dataset.role; render(); }));
  document.querySelectorAll('[data-tab]').forEach((element) => element.addEventListener('click', () => { state.appointmentTab = element.dataset.tab; render(); }));
  document.querySelectorAll('[data-input]').forEach((element) => element.addEventListener('input', handleInput));
  document.querySelectorAll('[data-form]').forEach((form) => form.addEventListener('submit', handleSubmit));
}
function handleInput(event) { const input = event.target; if (input.dataset.input === 'doctor-query') state.doctorQuery = input.value; if (input.dataset.input === 'doctor-filter') state.doctorFilter = input.value; if (input.dataset.input === 'booking-date') state.booking.date = input.value; }
function handleAction(event) {
  const element = event.currentTarget;
  const action = element.dataset.action;

  if (action === 'register') return navigate('register');
  if (action === 'login') return navigate('login');
  if (action === 'forgot') return showToast('A reset link would be sent in a connected build.');
  if (action === 'logout') {
    state.screen = 'login';
    state.role = 'patient';
    return render();
  }

  const directScreens = ['dashboard', 'appointments', 'queue', 'doctors', 'departments', 'documents', 'profile', 'notifications', 'settings', 'book-appointment', 'doctor-dashboard', 'admin-dashboard', 'admin-queue', 'reports'];
  if (directScreens.includes(action)) return navigate(action);
  if (action === 'doctor-profile') {
    state.selectedDoctor = doctors.find((doctor) => doctor.id === Number(element.dataset.doctor));
    return navigate('doctor-profile');
  }
  if (action === 'start-booking') {
    state.booking = { ...state.booking, step: 1, doctor: element.dataset.doctor || '', time: element.dataset.time || '' };
    if (element.dataset.doctor) {
      state.booking.department = doctors.find((doctor) => doctor.id === Number(element.dataset.doctor)).department;
      state.booking.step = element.dataset.time ? 4 : 3;
    }
    return navigate('book-appointment');
  }
  if (action === 'select-department') {
    state.booking.department = element.dataset.department;
    state.booking.step = 2;
    return render();
  }
  if (action === 'select-time') {
    state.booking.time = element.dataset.time;
    state.booking.step = 5;
    return render();
  }
  if (action === 'next-booking') {
    state.booking.step = 4;
    return render();
  }
  if (action === 'book-back') {
    state.booking.step = Math.max(1, state.booking.step - 1);
    return render();
  }
  if (action === 'confirm-booking') {
    state.booking.token = 25;
    state.screen = 'booking-success';
    showToast('Appointment confirmed successfully');
    return render();
  }
  if (action === 'cancel-appointment') {
    const item = appointments.find((appointment) => appointment.id === Number(element.dataset.id));
    if (item) item.status = 'Cancelled';
    showToast('Appointment cancelled');
    return render();
  }
  if (action === 'view-appointment') return showToast('Appointment details are ready in this demo.');
  if (action === 'refresh-queue') {
    state.queue.current += 1;
    showToast(`Queue refreshed. Now serving ${state.queue.current}.`);
    return render();
  }
  if (action === 'queue-toggle') {
    state.queue.notifications = element.checked;
    return showToast(element.checked ? 'Queue notifications enabled' : 'Queue notifications paused');
  }
  if (action === 'department-detail') {
    state.doctorFilter = element.dataset.department;
    return navigate('doctors');
  }
  if (action === 'view-document') return showToast('Opening document preview...');
  if (action === 'download-document') return showToast('Demo document downloaded');
  if (action === 'upload-document') return showToast('Document added to your records');
  if (action === 'edit-profile') return showToast('Profile editing is ready for connection to a backend.');
  if (action === 'change-password') return showToast('Password change flow opened.');
  if (action === 'help') return showToast('Support is available at help@hospitalcare.demo');
  if (action === 'consultation') return navigate('consultation');
  if (action === 'call-next') {
    if (state.adminQueue.length) {
      state.adminQueue[0].status = 'Called';
      showToast(`Token ${state.adminQueue[0].token} called`);
    } else {
      showToast('No patients waiting', 'error');
    }
    return render();
  }
  if (action === 'skip-token') {
    if (state.adminQueue.length) {
      const skipped = state.adminQueue.shift();
      state.adminQueue.push({ ...skipped, status: 'Skipped' });
      showToast(`Token ${skipped.token} skipped`);
    }
    return render();
  }
  if (action === 'reset-queue') {
    state.adminQueue = [];
    showToast('Queue reset for the next session');
    return render();
  }
  if (action === 'register-patient') return showToast('Patient registration form opened.');
  if (action === 'download-report') return showToast('Daily report downloaded');
}
function handleSubmit(event) { event.preventDefault(); const form = event.currentTarget; if (form.dataset.form === 'login') { const email = form.querySelector('#email').value.trim(); if (!email.includes('@')) return showToast('Enter a valid email address', 'error'); state.user = { name: state.role === 'doctor' ? 'Dr. Ananya Rao' : state.role === 'admin' ? 'Nisha Verma' : 'Aarav Mehta', email }; state.screen = state.role === 'doctor' ? 'doctor-dashboard' : state.role === 'admin' ? 'admin-dashboard' : 'dashboard'; showToast(`Welcome back, ${state.user.name.split(' ')[0]}`); return render(); } if (form.dataset.form === 'register') { const fullName = form.querySelector('#fullName').value.trim(); const password = form.querySelector('#regPassword').value; const confirm = form.querySelector('#confirmPassword').value; if (fullName.length < 2) return showToast('Please enter your full name', 'error'); if (password.length < 6) return showToast('Password must be at least 6 characters', 'error'); if (password !== confirm) return showToast('Passwords do not match', 'error'); state.user = { name: fullName, email: form.querySelector('#regEmail').value }; state.screen = 'dashboard'; state.role = 'patient'; showToast('Account created. Welcome to HospitalCare!'); return render(); } if (form.dataset.form === 'consultation') { state.consultationSaved = true; showToast('Consultation saved successfully'); return navigate('doctor-dashboard'); } }

setTimeout(() => { state.booting = false; render(); }, 1700);
