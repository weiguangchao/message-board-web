import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import MessageList from './pages/MessageList/MessageList';
import SubmitMessage from './pages/SubmitMessage/SubmitMessage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MessageList/>,
  },
  {
    path: "/admin",
    element: <SubmitMessage/>,
  },
]);

export const AppContext = React.createContext({
  account: ''
});

function App() {
  return (
    <div className="App">
      <AppContext.Provider value={{account: ''}}>
        <React.StrictMode>
          <RouterProvider router={router}/>
        </React.StrictMode>
      </AppContext.Provider>
    </div>
  );
}

export default App;
