## Features
  - Recommended subreddits
  - Search for a subreddit
  - Load older posts
  - Fetches newer posts every minute

## Technology decision

The decision is made taking in consideration the most popular libraries to facilitate onboarding to new developers coming into the project. Most of the libraries are well known on the developer community and have become the prefered choice. It is worth to mention the following technologies: 

- **create-react-app** <br> 
Used to boilterplate the project, takes advantage of using the most stable version supported by the React Team. Allows to run, build, test the project with just one command. Many developers are familiar with this so it is really convinient to have it as part of the development process for easy onboarding.
- **Bootstrap**<br>
UI Framework used to style the project. Helps developers to build applications with less effort.
- **react-redux** <br>
Manipulates the state of the application, triggers actions to update its state, rendering the application accordingly. 
- **react-router** <br>
Add-on library to enable route navigation within the application, provides a set of functions that allow to create multiple routes and get parameters through the routes.
- **react-test-library + jest** <br>
Testing is an important piece of the code stability. This two libraries were used to test components, actions and reducers, as well as mocking network requests.
## Folder structure
```
src
├── __tests__
│   └── actions 
│   └── components
│   └── reducers
├── actions
├── api
├── components
└── mocks
└── reducers

```

## Naming conventions
 - **Variable naming:** camelCase ie. `const myVariable = 2;`
 - **Component filename:** PascalCase i.e. `PostList.js`
 - **Testing files:** Should live in `/src/__tests__` folder suffixing `.test` extension to filename i.e. `Post.test.js`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.