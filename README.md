# Randomio V2
Live at https://randomio.rinini.dev/

<img width="1182" height="652" alt="Recording2026-08-24154812-ezgif com-optimize" src="https://github.com/user-attachments/assets/d44f59ec-cb3b-4e55-9ac5-4944f7ae7f42" />

> Miss the days of turning on the TV and just watching whatever is on? Emulate the ease of life with Randomio!

This is a remake of [Randomio](https://github.com/stevenld165/randomio-webapp) using Express.js as a backend, and Nuxt.js as a frontend. The goal of this remake is to incorporate more user-friendly UI, and individual user accounts that store user's lists of shows.

🎲 Randomio is a full-stack web application that allows you to randomly choose an episode from a list of shows you pick and open it directly in Stremio. Search shows, add them to your list, filter by season, and toggle them off and on as you please! Randomio also is designed with Android TV and mobile in mind. Set up your list on your computer or phone, then login on your Android TV to choose a random episode!

# Features ⭐
- Create an account
- Add shows to your show list
- Toggle shows on and off
- Filter shows by season
- Add extra episodes individually
- Roll for a random episode based on your show list
- Go back to previously rolled episodes

# Improvements from V1! 📈
- Visually pleasing, responsive UI for editing the show list
- User accounts to maintain show lists across devices
- Ability to select individual seasons rather than a single range (If you only like a show's first and last season, now you won't need to ever see the middle again!)

# To-do ☑️
- [ ] Add email verification & reset password capabilities
- [ ] QR Code based login for TV layout
  - [ ] Capacitor-based Android TV specific app  
- [ ] Add toggle for using the web version of Stremio instead of the app
- [ ] Multiple show lists
- [ ] Show list presets

# Tech Stack 🛠️
- Frontend: Nuxt.js + PrimeVue
- Backend: Express.js + DrizzleORM + BetterAuth

> Note: Randomio is not affilitated with Stremio nor any third-party plugins created for Stremio. Please use Randomio responsibly.
