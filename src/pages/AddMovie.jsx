import { InputLabel, MenuItem, Select, TextField, FormControl, Typography, Rating, Button } from "@mui/material"
import { useState } from "react"
import TextEditor from "../components/TextEditor"
import axios from "axios"
import { toast } from "react-toastify"
import { Link } from "react-router"

const AddMovie = () => {

    const [inputs, setInputs] = useState({ name: "", url: "", genre: "", rating: "0.5", description: "" })
    let handleChange = (e) => { setInputs({ ...inputs, [e.target.name]: e.target.value }) }
    const selectStyles = {
        color: 'gray',
        '&:before': {
            borderBottom: '1px solid gray',
        },
        '&:hover:not(.Mui-disabled):before': {
            borderBottom: '1px solid gray',
        },
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (Object.values(inputs).some(value => value === "")) {
            toast.error("Fill all the Input fields...!");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/users", inputs);
            setInputs({ name: "", url: "", genre: "", rating: 0.5, description: "" })
            console.log(response.data);
            toast.success("Movied added successfully...!")
        } catch (error) {
            console.error("Error adding user:", error);
        }
    }

    return (
        <section className="movies-bg">
            <div className="movie-container my-12">
                <div className="flex justify-between items-center">
                    <Link to={"/"}>
                        <img src="/LOGO.png" alt="LOGO" width={100} />
                    </Link>
                    <h2 className="uppercase font-bold text-end font-mono text-4xl text-orange-600">add movie</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap items-center">
                        <div className="md:w-1/2 w-full md:order-1 order-2">
                            <div className="px-5 flex justify-center h-full items-center flex-col">
                                <img onError={(e) => e.target.src = "/noImage.png"} src={inputs.url ? inputs.url : "/noImage.png"} alt={inputs.url ? inputs.name : "NO images"} width={200} className="rounded-lg" />
                                <p className="text-gray-500 capitalize text-center mt-2">image URL preview</p>
                            </div>
                        </div>
                        <div className="md:w-1/2 w-full order-1 md:order-2">
                            <div className="px-5 border-s border-orange-600">
                                {/* Movie Title */}
                                <div className="mb-5">
                                    <FormControl variant="standard" color="warning" fullWidth>
                                        <TextField
                                            name="name"
                                            onChange={handleChange}
                                            value={inputs.name}
                                            variant="standard"
                                            label="Movie Title"
                                            fullWidth
                                            color="warning"
                                            sx={{ input: { color: "gray", borderBottom: "1px solid gray" }, label: { color: 'gray' } }}
                                        />
                                    </FormControl>
                                </div>
                                {/* Image URL */}
                                <div className="mb-5">
                                    <FormControl variant="standard" color="warning" fullWidth>
                                        <TextField
                                            name="url"
                                            value={inputs.url}
                                            onChange={handleChange}
                                            variant="standard"
                                            label="Image URL"
                                            fullWidth
                                            color="warning"
                                            sx={{ input: { color: "gray", borderBottom: "1px solid gray", }, label: { color: 'gray' } }}
                                        />
                                    </FormControl>
                                </div>

                                {/* Genre Select */}
                                <FormControl variant="standard" color="warning" fullWidth>
                                    <InputLabel id="genre-label" sx={{ color: 'gray' }}>Genre</InputLabel>
                                    <Select
                                        labelId="genre-label"
                                        value={inputs.genre}
                                        onChange={handleChange}
                                        name="genre"
                                        sx={selectStyles}
                                    >
                                        <MenuItem value="1">Action</MenuItem>
                                        <MenuItem value="2">Comedy</MenuItem>
                                        <MenuItem value="3">Drama</MenuItem>
                                        <MenuItem value="4">Thriller</MenuItem>
                                        <MenuItem value="5">Horror</MenuItem>
                                        <MenuItem value="6">Romance</MenuItem>
                                    </Select>
                                </FormControl>
                                <div className="mt-5">
                                    <Typography component="legend" style={{ color: "gray", marginBottom: "5px" }}>Rating</Typography>
                                    <Rating
                                        precision={0.5}
                                        size="large"
                                        name="rating"
                                        value={inputs.rating}
                                        onChange={handleChange}
                                        sx={{
                                            '& .MuiRating-iconEmpty': {
                                                color: 'gray', // gray border for empty stars
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-white">
                        <TextEditor value={inputs.description} onChange={handleChange} />
                    </div>
                    <div className="mt-5 text-end">
                        <Button color="warning" variant="contained" onClick={handleSubmit}>ADD MOVIE</Button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default AddMovie
