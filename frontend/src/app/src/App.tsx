import { RouterProvider } from 'react-router-dom'
import '../styles/App.css'
import { router } from '../router/config'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return <RouterProvider router ={router}></RouterProvider>
}

export default App
