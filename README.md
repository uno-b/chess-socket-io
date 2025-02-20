# Chess Frontend

This project is the frontend for a chess application, designed to work with the backend developed by Unumandakh Bayandelger.

## Folder Structure

- **src/**: Contains the main source code.
- **app/**: Contains the app router and routing logic.
- **components/**: Reusable UI components for the chess application.
- **styles/**: Contains stylesheets and CSS modules.
- **types/**: TypeScript type definitions used across the project.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Socket.io Client**: Real-time communication with the backend.
- **React-Chess**: [Main code logic](https://github.com/TalhaAwan/react-chess)

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/uno-b/chess-socket-io.git`
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd chess-socket-io
   ```

3. **Install Dependencies**

   ```bash
    yarn install
   ```

4. **Add .env file for backend**

   ```bash
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   ```

5. **Run the Project**

   Start the development server:

   ```bash
   yarn dev
   ```

## Deployment

Frontend: https://chess-socket-io.vercel.app/

(2 players required to play)

Backend: Deployed on Google Run.

## Contact

For any questions or feedback, please reach out to unumandakh.b@gmail.com.
