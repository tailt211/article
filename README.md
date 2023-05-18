### Project Article

### Technologies Used

This project is a web application using:

- ReactJS
- TypeScript
- Material-UI
- Redux
- Axios
- LocalStorage
- React-hook-form
- SCSS

### Main Features

- Login
- Register
- Logout
- User
  - List User
  - Delete user (not you)
  - Detail (only you)
  - Update (only you)
- Article:
  - Create
  - List
  - Detail
  - Update
  - Delete
- Comment:
  - Create
  - List
  - Detail
  - Update

### Installation

1. Install the dependencies by running the following command:

npm install

2. Start the project by running the following command:

npm start

### Usage

After installing and starting the project, you can access the web application on your browser using the link http://localhost:3000/

### Project Structure

This project is divided into the following directories:

- src: contain the source code of the application
  - assets: contains pictures and icons
  - component: contains the React component
  - https: config Axios
  - model: store definitions related to data models or objects.
  - pages: contains the component of page
  - router: defines Path of route
  - store: contain Redux state management
    - .service.js: file to communication with an API and fetching data
    - .slice.js: file defines a slice of the Redux store and the actions
    - .thunk.js: fil define a thunk, used for asynchronous actions such as making an API call
    - .store.js: defines the Redux store
  - utils: contains helper function
  - app.jsx: The main component
  - index.js: The main file to start the application

### Note
