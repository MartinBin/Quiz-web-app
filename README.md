# Quiz web app
 Task for internship

## Technologies used
React 18 project was made using Vite. Typescript was chosen as programming language for the React project and MaterialUI library for the UI.
The Backend uses .Net 9 core for the ASP.NET and EF Core in-memory database to store player score, email. Also the questions are stored in Questions.json file inside the Data folder.

## How to start?
Make sure to have nodeJS and npm installed for the frontend and have the .Net 9 installed for the backend.
To run React go to "quiz-client" folder.
```
cd quiz-client
```
Install needed packages.
```
npm install
```
Run as dev.
```
npm run dev
```

To run backend you can use any IDE that can run .NET projects or use terminal command inside backend folder.
```
dotnet run BackEnd.csproj 
```
