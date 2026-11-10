# Online Shop

A multi-page online shop built with React, React Router and Zustand. It loads products from the DummyJSON API, lets visitors filter them by title and category (the filters are stored in the URL), shows a detail page for each product, and provides a cart that is only available after logging in. The cart and the light/dark theme are remembered between visits.

To run it:

```bash
npm install
npm run dev
```

Demo login: the student e-mail set in `src/api/authApi.js` with the password `demo123456`.

## File organization

```
src/
├─ main.jsx                  entry point: wraps the app in BrowserRouter and AuthProvider
├─ App.jsx                   route table (all routes and the protected cart route)
├─ App.css, index.css        styles, including the light/dark theme variables
├─ api/
│  ├─ productsApi.js         fetch functions for the product list and a single product
│  └─ authApi.js             simulated login with a short delay
├─ hooks/
│  ├─ useFetch.js            loading/error/data handling with cancellation
│  └─ useLocalStorage.js     useState-like hook that keeps its value in localStorage
├─ context/
│  └─ AuthContext.jsx        logged-in user (Context + useReducer) and the useAuth hook
├─ store/
│  └─ cartStore.js           Zustand cart store, persisted to localStorage
├─ components/
│  ├─ Layout.jsx             shared page layout, owns the theme state
│  ├─ NavBar.jsx             navigation, login state, cart count, theme toggle
│  ├─ ProductCard.jsx        one product in the list
│  └─ ProtectedRoute.jsx     redirects to /login when nobody is logged in
└─ pages/
   ├─ Home.jsx               welcome page
   ├─ ProductList.jsx        product list with filters stored in the URL
   ├─ ProductDetail.jsx      product detail, add to cart, next product
   ├─ Cart.jsx               cart contents, quantities and total
   ├─ Login.jsx              login form
   └─ NotFound.jsx           404 page
```

The `api` folder only talks to the network and contains no React code. Hooks hold reusable logic, `context` and `store` hold shared state, `components` are reusable pieces, and each file in `pages` matches a route.

## Reasoning questions

### 1. State choices

Three questions were used to define each state: how many fields does it read, how frequently does it change, and should it stay in the refresh or be kept in a link?
Filters are in the URL because they should be able to be shared via a link and stay in the refresh.
Context is important since the user only examines a small number of components and they hardly ever change.
Zustand + localStorage should stay in the refresh since the cart is read in numerous locations, changes often, and should stay there.
The product list is in the useFetch state since it is server data that is unique to the page.
UseLocalStorage because the theme is a browser choice.
### 2. Context versus store

Every component that reads the context value is repainted when it changes. This is not an issue because the user hardly ever modifies it. Every addition would result in the redrawing of every component that reads it if it were in the Cart Context. The selector in Zustand allows the component to be updated only when the part it chooses changes (the NavBar only chooses the number). If not, putting the user in Zustand would function but be superfluous.
### 3. Custom hooks

The loading/error/data pattern, cancelation (AbortController), and cleanup logic are all shared by useFetch. Each call has its own purpose; it does not share state.Reducer`; there is no cache and the two pages cannot see each other's data. This is intentional: data sharing would require a separate store, but the hook code is reused.
### 4. Route parameters

The useParams function consistently returns a string (e.g., "3"). We utilized Number(id) + 1 for the "Next product" link because "3" + 1 would concatenate the string, yielding "31". If the input is not a numeric value (for instance, abc), it results in NaN, so we concealed the link using Number.isNaN.
### 5. Protected routes

Code that operates in the browser is called ProtectedRoute. DevTools allows users to examine and edit the code and state; in other words, it merely conceals the page; the data is not protected. The server must handle authentication and authorization for each request (real login, token/session, and the server rejecting unauthorized requests) in order to provide true security.
### 6. Deep links

One index.html file makes up the program, and JavaScript is used in the browser to handle routes. A 404 error is returned when a simple static server looks for a file at /products/3 but is unable to locate it. React Router parses the URL after the Vite development server, as a backup, returns index.html for unknown destinations. The server must be set up to use the same fallback in production.

## Challenges I faced

- **Setting up git and pushing to GitHub.** I first ran `git init` inside `src` instead of the project root, which created a nested repository and made `git add` fail. I fixed it by removing the inner `.git` folder and initialising at the root. Later, `git push` failed with a password authentication error because GitHub no longer accepts passwords over HTTPS, so I had to create a personal access token and check that the remote pointed to my own repository.

- **Understanding where hooks and JSX belong.** At one point I pasted test code at the top level of `App.jsx`, outside the component, which broke the page. This showed me that hooks can only be called inside a component (or another hook). Another time, pasting new code into `main.jsx` without removing the old content left two copies in the file and caused a syntax error.

- **A blank white page after adding pages.** The app showed an empty page and the console reported that `Cart.jsx` and `Login.jsx` did not provide an export named `default`. The files were missing `export default`. I learned to read the browser console first, and I now check every page and component for its default export.

- **Understanding shared state and context.** The hardest conceptual part for me was deciding where each piece of state should live: Context with `useReducer` for the user, Zustand for the cart, and the URL for the filters. Selectors in Zustand and the way a route's `state.from` carries the original path through the login redirect took me the longest to understand.

- **Working with the Vite default styles.** My theme toggle did not seem to change the colours because the default `index.css` created by Vite was applying its own dark colours. Replacing it with a minimal reset let the `theme-light` and `theme-dark` classes work as intended.

I worked on the assignment step by step and used an AI assistant to help me understand the concepts and the errors above. I made the commits myself, one for each step.
