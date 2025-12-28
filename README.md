# Backdoor Cleats E-commerce

## Description

A modern e-commerce web application for selling soccer boots and team jerseys. Built with React, Node.js, Express, PostgreSQL, and PayFast payments.

## Features

- Product catalog with boots and jerseys
- Shopping cart functionality
- Secure checkout with PayFast
- Responsive design with Tailwind CSS
- RESTful API backend

## Tech Stack

- Frontend: React (Vite) + Tailwind CSS
- Backend: Node.js + Express
- Database: PostgreSQL
- Payments: PayFast

## Installation

1. Install Node.js from https://nodejs.org/
2. Clone or set up the project
3. Install dependencies for frontend and backend
4. Set up PostgreSQL database
5. Run schema.sql and seed.sql
6. Configure environment variables

## Running Locally

1. Backend: `cd backend && npm install && npm start`
2. Frontend: `cd frontend && npm install && npm run dev`

## Environment Variables

### Backend (.env)

DATABASE_URL=postgresql://user:password@localhost:5432/backdoor_cleats

PAYFAST_MERCHANT_ID=your_merchant_id

PAYFAST_MERCHANT_KEY=your_merchant_key

PAYFAST_PASSPHRASE=your_passphrase

PORT=5000

## Deployment to Render

### Frontend (Static Site)

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables if needed

### Backend (Web Service)

1. Connect GitHub repository
2. Set build command: `npm install`
3. Start command: `npm start`
4. Add environment variables: DATABASE_URL, PAYFAST_*

### Database

1. Create PostgreSQL instance on Render
2. Run schema.sql and seed.sql

## PayFast Integration

- Uses custom integration with redirect
- Handles ITN notifications for payment confirmation
- Supports one-time payments

## License

MIT