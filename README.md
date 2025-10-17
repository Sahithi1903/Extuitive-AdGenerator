## Extuitive AI Ad Generator

- Extuitive is a full-stack Next.js application that enables users to input a product idea and generate AI-powered ad headlines.The application provides a smooth, modern interface with error handling, tone selection, and the ability to refresh individual ad suggestions.

## Features

- Built with Next.js 14 App Router

- Backend API endpoint at /api/generate

- Supports multiple ad tones including playful, professional, and luxury

- Regenerate individual ad suggestions without affecting others

- Responsive card display with hover effects and animations

- Custom loading indicators and smooth transitions

- User-friendly error messages and input validation

## Installation and Setup

1. Clone the repository and navigate to the project directory:

   git clone <repository_url>
   cd <project_directory>

2. Install dependencies:

   npm install

3. Create a .env.local file in the root directory and add your OpenAI API key:

   OPENAI_API_KEY=sk-your_openai_key_here

4. Run the development server:

   npm run dev

5. Open the application in your browser:

   http://localhost:3000

## Usage

- Enter a product description in the input field.

- Select a tone for the ad headlines.

- Click the generate button to receive multiple AI-generated ad suggestions.

- Optionally, refresh individual ads to get new suggestions without regenerating all.

## Tech Stack

- Next.js 14

- React 18

- OpenAI Chat Completions API

- CSS for animations and responsive design

## Notes

- Ensure that your OpenAI API key has the required permissions for the Chat Completions API.

- The application is designed to provide a smooth user experience with real-time feedback and error handling.
