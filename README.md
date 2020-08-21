This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## API
Used the following APIs:
 - themoviedb API to get movie data (https://developers.themoviedb.org)
 - giphy API to get random gif for the end game screen
 
 Note: movie trailer collections is created manually and stored in firebase.

## CI/CD
The project has a configured workflow in Github.
Once the pipeline is executed successfully, the build will be deployed (Firebase hosting).
Please refer to .github -> workflows -> ci.yml to see details


## Start and build the application

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
