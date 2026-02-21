# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Foodies – Online Food Delivery Frontend

Foodies is a modern **Food Delivery Frontend Application** built using **React with Vite**.  
It provides a fast, responsive, and user-friendly interface for browsing food items, managing a cart, placing orders, and making online payments using **Razorpay**.

This project is developed as a **BCA Final Year Major Project** and follows real-world frontend development practices.

---

## Project Overview

The Foodies frontend communicates with backend REST APIs to simulate a real food delivery system.  
It focuses on performance, clean UI, and scalable project structure.

---

## Technology Stack

- **Frontend:** React
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Styling:** Bootstrap 5, Bootstrap Icons
- **API Requests:** Axios
- **State Management:** Context API
- **Notifications:** React Toastify
- **Payment Gateway:** Razorpay
- **Code Quality:** ESLint

---

## Features

### Authentication
- User Registration & Login
- JWT-based authentication
- Protected routes
- Logout functionality

### Food Listing
- Dynamic food item display
- Category-based filtering
- Responsive food cards

### Cart Management
- Add food to cart
- Increase / decrease quantity
- Remove items
- Live price calculation

### Order System
- Place food orders
- View order history
- Track order status

### Online Payment
- Razorpay payment gateway integration
- Secure checkout process
- Payment success & failure handling

### UI & UX
- Fully responsive design
- Bootstrap-based layout
- Toast notifications
- Loading indicators
