# Foraneo App
Foráneo App
Foráneo App is an application designed to improve daily management in three key areas: personal finances, recipes and meal planning, and emotion and task management. With this app, you can efficiently organize your daily activities all in one place.

Main Features
Daily Finances: Track your income, expenses, and savings in a simple and visual way.

Recipes and Daily Meal Plan: Find recipes, plan your meals, and keep track of your daily diet.

Emotion and Task Management: Organize your day, manage tasks, and track your emotional state.

Technologies Used
Node.js: JavaScript runtime environment for the server-side.

React: JavaScript library for building user interfaces.

Vite: Fast build tool for front-end applications.

Lucide Icons: Easy-to-integrate icon library.

Moment.js: Library for date and time manipulation and formatting.

Ant Design (Ant): React UI components library.

ApexCharts: Tool for creating interactive charts and visualizations.

FontAwesome: Icon library supporting various sizes and styles.

Firebase: Backend-as-a-Service (BaaS) platform for authentication, real-time database, and more.

Redux: State management library for React applications.

How to Initialize the Project
Prerequisites
Make sure you have the following installed on your machine:

Node.js: Download it from here.

Git: Install it from here.

Installation Instructions
Clone the repository:

Open your terminal and clone the repository to your local machine:

bash
Copiar
git clone https://github.com/your-username/foraneo-app.git
Switch to the develop branch:

After cloning the repository, switch to the develop branch:

bash
Copiar
git checkout develop
Install dependencies:

Navigate to the project folder and run the following command to install all the necessary dependencies:

bash
Copiar
cd foraneo-app
npm install
Run the app:

Once the dependencies are installed, run the following command to start the application locally:

bash
Copiar
npm run dev
This will open the app in your browser at http://localhost:3000 (by default).

Firebase Configuration (if necessary):

If you're using Firebase, make sure your project is set up in Firebase Console. Create a .env file at the root of the project and add your Firebase configuration variables there. You can find these variables in your Firebase Console under Project Settings -> Firebase SDK Configuration.

Example .env file:

env
Copiar
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
