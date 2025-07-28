import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/Home"
import AddMovie from "./pages/AddMovie"
import { ToastContainer } from "react-toastify"
import DisplayMovie from "./pages/DisplayMovie"
import UpdateMovie from "./pages/UpdateMovie"

const App = () => {
    return (
        <>
            <BrowserRouter>
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add-movie" element={<AddMovie />} />
                    <Route path="/browse-movies" element={<DisplayMovie />} />
                    <Route path="/update-movie/:id" element={<UpdateMovie />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App