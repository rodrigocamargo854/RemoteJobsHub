# 🏢 CompaniesHub

**CompaniesHub** is a modern and responsive web application built with **Next.js** and **Tailwind CSS**, designed to display and search for companies with their profiles, logos, descriptions, and links to their websites or calendars.

This project aims to provide an organized and user-friendly interface where users can browse companies, check their details, and access their external links.

---

## 🚀 Technologies Used

- Next.js (React Framework)
- Tailwind CSS (Styling)
- JavaScript
- Next/Image (Optimized image handling)
- API or local JSON (Dynamic companies data)

---

## 📱 Features

- 🏢 Displays a list of companies with logos, names, and descriptions
- 🔗 Shows a link for each company (website, calendar, or contact page)
- 🖼️ Fallback image when no logo is provided
- 🎨 Responsive UI (mobile-first) with Tailwind CSS
- ⚡ Smooth hover and transition effects
- 🔄 Dynamic fetching of company data from `/companies` endpoint

---

## 🏗️ Project Structure

```
/app
  ├── components     # UI Components (if separated)
  ├── public         # Images and static assets
  ├── styles         # Tailwind and global styles
  ├── pages          # Next.js routes
```

---

## 🔗 API Reference

Your `/companies` endpoint or local JSON should look like this:

```json
[
  {
    "name": "Tech Solutions",
    "picture": "/tech.png",
    "info": "A company focused on innovative tech solutions.",
    "calendar": "https://companywebsite.com"
  }
]
```

---

## 💡 How to Run Locally

1. Clone this repository:

```bash
git clone https://github.com/yourusername/companieshub.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open in your browser:

```
http://localhost:3000
```

---

## 🤝 Contribution

Contributions are welcome! Feel free to open issues, suggest improvements, or submit pull requests.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🙏 Acknowledgements

Thanks to all contributors and the community.