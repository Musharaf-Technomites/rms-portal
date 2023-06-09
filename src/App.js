import SideBar from "./Components/SideBar"
import Dashboard from "./Pages/Dashboard"
import MainRoutes from "./Routes/MainRoutes"
import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import ReduxThunk from 'redux-thunk';
import AuthReducer from "./Store/AuthReducer"
export default function App() {
  const rootReducer = combineReducers({
    auth: AuthReducer
  })

  const Store = createStore(rootReducer, applyMiddleware(ReduxThunk))


  return (
    <Provider store={Store}>
      <MainRoutes />
    </Provider>

  )
}