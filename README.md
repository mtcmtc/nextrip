# Metro Transip NexTrip Case Study

## Summary
A web application that displays Minneapolis Metro Transit bus line information based on APIs available via Metro Transit NextTrip API. This particular project was built using Next.js React framework with Tailwind CSS.

### Case Study Requirements
The application must provide the following functionality:
* Select a bus route from a list of available routes
* Select a direction for a bus route
* For a given route and direction, display the stops
* Respond reasonably to browser back and forward buttons (for example, implement application
routing)

## Getting Started
To get a local copy up and running follow these simple example steps:

Clone this repo
```bash
git clone https://github.com/mtcmtc/nextrip.git
cd nextrip
```

Install the dependencies:

### yarn
```bash
yarn install
yarn dev
```
### npm
```bash
npm install
npm run dev
```

Navigate to [localhost:5000](localhost:5000). You should see your app running. You can edit components in `pages`, save, and see your changes.

## Running Tests

You will need to install jest to run tests.

```bash
jest
```

## Building and running in production mode

To create an optimised version of the app:

### yarn
```bash
yarn build
```

### npm
```bash
npm run build
```

You can run the newly built app with `yarn start` or `npm run start`.

## Assumptions Made
1. The user is accessing the app on-the-go on a mobile device.
	* Mobile experience should be prioritized
	* Minimal data usage and fetch requests
2. The user will likely make accidental selections.
	* Use browser routing to retrace steps and keep user on the same page.
3. User may have ADA accessibility needs
	* Account for screen readers
	* Account for contrast
	* Dark mode for light sensitivity

