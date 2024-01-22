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
7. **Documentation**:
    - Document any assumptions or decisions you've made during the development.