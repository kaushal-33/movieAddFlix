import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/Home"
import AddMovie from "./pages/AddMovie"
import { ToastContainer } from "react-toastify"
import Header from "./components/Header"

const App = () => {
    return (
        <>
            <BrowserRouter>
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add-movie" element={<AddMovie />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App