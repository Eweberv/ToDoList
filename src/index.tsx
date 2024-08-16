import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from "./router/router.tsx";
import {store} from "./store/store.tsx";
import { Provider } from "react-redux";
import {RouterProvider} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  </StrictMode>,
)
