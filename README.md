# HospitalCare

HospitalCare is a responsive, mobile-first hospital management frontend prototype. It uses only local HTML, CSS, and JavaScript with realistic in-memory demo data. No external APIs or credentials are required.

## Run in VS Code

Open `index.html` directly in a browser, or start the built-in static server from the project folder:

```powershell
python -m http.server 5500
```

Then visit <http://localhost:5500>.

## Demo roles

The login screen accepts any email and password. Choose Patient, Doctor, or Reception/Admin to explore each workspace and its role-specific navigation.

## Structure

- `index.html`: accessible app shell
- `styles.css`: responsive theme, layout, states, and motion
- `app.js`: mock data, screen renderers, navigation, forms, queue and booking interactions
- Firebase Authentication, Firestore, Storage, and push notifications can later replace the in-memory state without changing the screen structure.
