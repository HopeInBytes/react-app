import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
function App(){
    return(
        <div>
            <h1>Custom App !</h1>
        </div>
    )
}
createRoot(document.getElementById('root')).
render(

    <App />

)
