# Todo App

A React Native todo application built with Expo, TypeScript, and Zustand for state management.

## Features

- Add todos with due dates
- Edit existing todos
- Mark todos as complete/incomplete
- Delete todos
- Persistent storage using AsyncStorage
- Calendar date picker for selecting due dates
- Clean and modern UI with React Native Paper

## Prerequisites

- Node.js (v14 or later)
- Bun package manager
- Expo Go app installed on your mobile device / Android Studio

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

## Running the App

1. Start the development server:

   ```bash
   bun run start
   ```

2. Scan the QR code with your mobile device's camera (iOS) or the Expo Go app (Android)

## Development

The app is built with:

- React Native
- TypeScript
- Expo
- Zustand (state management)
- AsyncStorage (persistent storage)
- React Native Reanimated (animations)

## Project Structure

- `src/components/` - Reusable UI components
- `src/store/` - Zustand store and types
- `App.tsx` - Main application component
