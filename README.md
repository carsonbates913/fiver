# Fiver

Link: https://fiver-lfhk.onrender.com/

## Description

Fiver is a workplace-focused social media app designed to foster collaboration and positivity within teams. It allows team members to create and share "fives"—virtual post-it notes filled with appreciation, encouragement, or recognition. Whether celebrating achievements, acknowledging great work, or simply spreading kind words, Fiver helps build a supportive and uplifting workplace culture. Just create an account, customize your personal profile, and join the fun!

## Design

Check out the Figma design for this project: [View on Figma](https://www.figma.com/design/JsCHWYHVM0j8xbcDNOFdDg/Fiver?node-id=0-1&t=i4ljmgm9bKmuYi8z-1)

## Screenshots

![App Screenshot](https://github.com/carsonbates913/fiver/blob/main/frontend/src/assets/DaliScreenshot1.png?raw=true)
![App Screenshot](https://github.com/carsonbates913/fiver/blob/main/frontend/src/assets/DaliScreenshot2.png?raw=true)
![App Screenshot](https://github.com/carsonbates913/fiver/blob/main/frontend/src/assets/DaliScreenshot3.png?raw=true)
![App Screenshot](https://github.com/carsonbates913/fiver/blob/main/frontend/src/assets/DaliScreenshot4.png?raw=true)
![App Screenshot](https://github.com/carsonbates913/fiver/blob/main/frontend/src/assets/DaliScreenshot5.png?raw=true)
![App Screenshot](https://github.com/carsonbates913/fiver/blob/main/frontend/src/assets/DaliScreenshot6.png?raw=true)

## Running it locally

To run Fiver locally, follow these setup instructions. They assume that you already have Node.js installed on your computer.

1. Clone the Repository

```sh
  git clone https://github.com/carsonbates913/fiver.git
```

2. Navigate to the Project Directory

```sh
cd yourrepository
```

3. Install Dependencies

```sh
npm install
```

4. Run the Development Server

```sh
npm run dev
```

## Learning Journey

### Inspiration

What inspired me to create this app was the incredible sense of community I experienced while working at Jeni’s Ice Cream. I had the privilege of working with the best team, and one of the highlights of our positive work environment was the high-five board. This board allowed employees to shout out their teammates’ good work and share kind, encouraging notes. Inspired by this experience, I wanted to digitize the concept and expand it with additional features that promote positivity in the workplace. Looking ahead, I envision Fiver growing with features such as word clouds, positivity metrics, and even mini-games or rewards to further enhance team building. I also see the potential to turn Fiver into a mobile app to better support employees who are on the go. Ultimately, my goal is for this app to help employees connect and build stronger relationships, just as I did with my coworkers.

### Process

The first step in creating Fiver was designing the app in Figma. I find Figma invaluable for visualizing and planning my designs, which helps me build a solid foundation for the project. Once the site’s flow and design were established, I focused on identifying the key data types I would need for my MongoDB database. I decided on two primary models: fives (the positive notes) and users. One important consideration was the relationship between these models — a user can have multiple fives, but each five is associated with a single sender. With the database design in place, I turned my attention to the front-end and back-end development. I structured the page using HTML and CSS, and created the necessary backend routes to handle data requests from the front end.

### Technologies

This project taught me a lot about modern web development practices. One key learning experience was implementing JWT tokens for auto-login and HTTP request authentication. Inspired by established platforms like Instagram, I wanted users to remain signed in without needing to log in repeatedly.

I also explored Multer for handling multipart form data, which allowed me to store and display user profile images. This feature was essential in creating a more personalized community page, with faces to go along with the names.

Lastly, I implemented password hashing and salting for added security. By using 12 rounds of salting, I ensured that user data would be protected and that the app would be resistant to attacks
