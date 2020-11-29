## [PromptDeck](https://promptdeck.com)
This project utilizes the Firebase and Redux to view, create, and generate writing prompts. Current project can be
viewed at the link [PromptDeck](https://promptdeck.com). Hosted by Firebase.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), 
using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.


## How to run the project locally
### `Local Setup`
1. Install Node.js (recommended version v13.4.0)
2. Clone this repo
3. Run `npm install` in the cloned repo's root
4. Run `npm start` to view the locally hosted site in the browser

### `Development server`
Run `npm start` for a dev server. 
Page will automatically open in browser, 
or navigate to http://localhost:300 to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.

### `Create a Build`
Run `npm run build` to build the project for production. The build artifacts will be stored
in the `build/` directory. 

## Project Notes
### `Thought Process`
I realized early that I would need to set aside some additional features to focus on getting
a MVP complete that showed off Firebase authentication and full CRUD cycle. 

What surprised me was how bad my mobile mocks were when I went to implement them. 
Completely re-conceptualizing the user experience for mobile was well worthwhile, and as a benefit,
gave me an opportunity to work with bootstrap media queries to drastically change the styling for different
device screen sizes. 


### `With more time`
Currently, all cards are set to private by default and can only be changed by the administrator in the firebase console. 
With more time I would expand this to allow users to set their decks (and thereby the cards inside the decks)
to public and share their prompt creations with others. 

For optimization, I would streamline firebase calls to make them consistent. The firebaseCollectionsHelper file
is acting as a service layer, and all firebase calls should go through a similar file (though they should also be
broken up into multiple files since it's too much content already). From there all calls could be wrapped in a try/catch 
block, and redux could be used in the service layer to lighten the burden on calling firebase more than needed.


## Available Scripts

In the project directory, you can run:

### `npm run lint`

Runs the linter. Eslint Airbnb standards and enforced on commit. 
Alternatively 'npm run lint:js' can be used to run javascript, and 
'npm run lint:css' to check the css.

### `npm test`
run npm test in the console to run the test suite.

Also, 'npm test:coverage' launches the test coverage for the project. Current settings require global 80% 
coverage to push.



