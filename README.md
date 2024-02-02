Project Instructions

## Requirements:

1. Fetch and display information on a single SpaceX launch.
2. Fetch and display information on multiple SpaceX launches.
3. Allow users to add a SpaceX launch to their favorites.
4. Data should be persisted in `localStorage` to ensure data isn't lost on page refresh.

## Technical Stack:

- **Frontend**: React (using Vite)
- **API**: [SpaceX-API](https://github.com/r-spacex/SpaceX-API) (no api key required for queries)
- **Deployment**: Vercel

## Steps:

1. **Setup**:
    - Initialize a new Vite project with React and TypeScript: `npm init vite@latest -- --template react-ts`
2. **API Consumption**:
    - Fetch data from the SpaceX-API to get details on launches.
    - Implement the necessary logic to handle GET requests for 1 item, many items, and adding an item to the local storage list.
3. **Local Storage Integration**:
    - Use the browser's `localStorage` API to store and manage the user's list of favorite SpaceX launches.
4. **React Components**:
    - Implement the three main components (`SingleItem`, `ItemsList`, and `FavoritesList`) using the fetched data and integrate the `localStorage` logic.
    - Use React hooks like `useState` and `useEffect` for state management and side effects respectively.
5. **Styling**:
    - Use CSS or any preferred styling library to style the components.
    - Make sure the application is responsive.
6. **Deployment**:
    - Deploy the application to Vercel. Follow the [official Vercel documentation](https://vercel.com/docs) to set up deployment.


7. **Additional Notes**
    - The project as it currently stands is written as a Javascript react project, with the intent to be converted over to a Typescript focused project as I am learning the syntax of TS. The App file functions as the parent component and passes props down to the rest of the child components, namely SingleItem, FavoritesList, and ItemsList. As I was adding in the requested componenets, I worked to keep App as the primary disperser of the fetched data.
    - Self Diagnosed areas of improvement include:
        - There is a flickering that occurs on the loading of some of the background rocket images. Possibly could be fixed with altering the CSS, or performing the slideshow effect using Javascript/TS instead of CSS.
        - Currently it is not mobile friendly (by default). It can be adjusted manually to fit a phone screen. Additional layout contraints via CSS need to be added to account for mobile users.
        - Efficiency is always an area of improvement. Multiple instances of using similar/same conditional logic to display compononent divs can be condensed to reduce code cluttrer

    - Items to add:
        - Fix the toast notification when adding or removing a favorite from the favorites list
        - Add a random launch component that will fetch a random launch from the list
        - Display additional information, possibly as part of an additional modal, or navigating to another url setup. I picked out only some of the available information present from the fetched data. Full details of the fetched data could be added. The links to additional sources in particular would be an interesting addition.
        - More detailed CSS/Layout!
