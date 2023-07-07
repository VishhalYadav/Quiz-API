# Quiz-API
This is a RESTful API for a Quiz application. It allows creator to create quizzes,user to participate in quizzes, and view quiz results. The API is built using Node.js, Express.js, and MongoDB.

## Features
- User authentication and authorization using JWT (JSON Web Tokens)
- Quiz creation with multiple-choice questions
- Shareable quiz URLs for participants
- Quiz submission and scoring
- Participants' scores tracking
- API endpoints for CRUD operations on quizzes and participants

## Installation

1. Clone the repository:
   git clone https://github.com/VishhalYadav/Quiz-API.git
   
2. Install dependencies:
   cd Quiz-API
   npm install
   
3.Start the API server:
  npm start


## API Endpoints
The API consists of following endpoints-
1. Quiz Routes
- POST `/api/v1/quizzes/create-quiz`: The creator can create quiz using this route. The route is requires authenciation and restricted to admin only(authorization).
- GET `/api/v1/quizzes/:quizId`: gets the quiz by id. The route is requires authenciation.
- GET `/api/v1/quizzes/:quizId/participants`: gets all participants for a specific quizId. The route is requires authenciation and authorization.
- POST `/api/v1/quizzes/:quizId/submit`: expects answers of the quiz and submits the quiz, returns the score. The route is requires authenciation.

2. User Routes
- POST `/api/v1/users/signup`: route to signup for new user, the API creates a new user and reverts with jwt token.
- POST `/api/v1/users/login`: route to login for existing users, the API reverts with jwt token.
- GET `api/v1/users`: gets all partcipants(except the creator or admin).

## Contributions
Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.



   
