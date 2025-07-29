import {
    Table, TableBody, TableCell, TableHead, TableRow,
    Paper, Button, Rating, Chip,
    DialogTitle,
    Dialog,
    DialogContent,
    DialogActions,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GENRES = {
    1: "Action",
    2: "Comedy",
    3: "Drama",
    4: "Thriller",
    5: "Horror",
    6: "Romance",
};

const DisplayMovie = () => {
    const [movies, setMovies] = useState([]);
    const [openMovie, setOpenMovie] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        fetchMovies();
    }, []);
    const handleViewMovie = (movie) => {
        setOpenMovie(movie);
    };
    const handleCloseMovie = () => setOpenMovie(null);
    const fetchMovies = async () => {
        try {
            const res = await axios.get("http://localhost:5000/users");
            setMovies(res.data);
        } catch (error) {
            console.error("Failed to fetch movies:", error);
        }
    };

    const handleDeleteMovie = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/users/${id}`);
            fetchMovies();
            toast.warning("Movie deleted...!");
        } catch (err) {
            console.log(err)
            toast.error("Due to some internal error, movie not deleted...!");
        }
    };

    const handleEditMovie = (id) => {
        navigate(`/update-movie/${id}`)
    }



    return (
        <section className="movies-bg h-screen">
            <div className="movie-container my-12 h-[90vh] overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                    <Link to={"/"}>
                        <img src="/LOGO.png" alt="LOGO" width={100} />
                    </Link>
                    <h2 className="uppercase font-bold text-end font-mono text-4xl text-orange-600">
                        movies list
                    </h2>
                </div>

                <div className="h-[71vh] overflow-y-auto">

                    <Paper className="overflow-auto" style={{ backgroundColor: "transparent" }}>
                        <Table className="min-w-full">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ color: "orange" }}>Poster</TableCell>
                                    <TableCell style={{ color: "orange" }}>Title</TableCell>
                                    <TableCell style={{ color: "orange" }}>Genre</TableCell>
                                    <TableCell style={{ color: "orange" }}>Rating</TableCell>
                                    <TableCell style={{ textAlign: "end", color: "orange" }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {movies.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <div className="flex flex-col items-center gap-4 py-10">
                                                <img
                                                    src="/noImage.png"
                                                    alt="No Movies"
                                                    className="rounded w-24 h-24 object-center border border-gray-400"
                                                    style={{ objectFit: "contain" }}
                                                />
                                                <span className="text-white text-lg font-semibold">
                                                    Movie not found
                                                </span>
                                                <Button
                                                    variant="contained"
                                                    color="warning"
                                                    onClick={() => navigate("/add-movie")}
                                                >
                                                    Add Movie
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : movies.map(movie => (
                                    <TableRow key={movie.id}>
                                        <TableCell>
                                            <img
                                                src={movie.url || "/noImage.png"}
                                                onError={e => (e.target.src = "/noImage.png")}
                                                alt={movie.name}
                                                className="rounded w-20 h-20 object-center"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-mono font-bold text-orange-700 text-lg capitalize">{movie.name}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={GENRES[movie.genre] || "Unknown"}
                                                color="warning"
                                                variant="outlined"
                                                className="capitalize"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Rating
                                                    value={movie.rating}
                                                    readOnly
                                                    precision={0.5}
                                                    size="small"
                                                    sx={{ "& .MuiRating-iconEmpty": { color: "gray" } }}
                                                />
                                                <span className="text-orange-700 font-semibold text-sm">
                                                    {movie.rating}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex gap-2 justify-end">
                                                <Button
                                                    title="Description"
                                                    size="small"
                                                    variant="outlined"
                                                    color="warning"
                                                    onClick={() => handleViewMovie(movie)}
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="warning"
                                                    onClick={() => handleEditMovie(movie.id)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => handleDeleteMovie(movie.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {movies.length > 0 && <TableRow>
                                    <TableCell colSpan={5} align="center" style={{ border: "none" }}>
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            onClick={() => navigate("/add-movie")}
                                        >
                                            Add Movie
                                        </Button>
                                    </TableCell>
                                </TableRow>}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>

                {/* Responsive helper */}
                <style>
                    {`
                    @media (max-width: 640px) {
                        .MuiTableCell-root {
                            padding: 8px 4px;
                            font-size: 0.85rem;
                        }
                        .max-w-[250px] {
                            max-width: 120px !important;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                    `}
                </style>
            </div>
            <Dialog
                open={!!openMovie}
                onClose={handleCloseMovie}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    className: "bg-[#1a1a1a] rounded-lg",
                    style: { padding: 0, background: "#222" }
                }}
            >
                <DialogTitle className="flex justify-between items-center px-6 pt-6 pb-2 bg-[#282828] text-orange-400 capitalize text-2xl font-bold">
                    <span>{openMovie?.name}</span>
                </DialogTitle>
                <DialogContent className="px-6 !py-5 !flex !flex-col md:!flex-row !gap-6 items-start bg-[#1a1a1a]">
                    <img
                        src={openMovie?.url || "/noImage.png"}
                        onError={e => (e.target.src = "/noImage.png")}
                        alt={openMovie?.name}
                        className="rounded-lg shadow-md w-full max-w-[180px] md:max-w-[220px] object-contain border border-gray-700 mx-auto md:mx-0"
                    />
                    <div className="flex-1 space-y-3 mt-4 md:mt-0 w-full">
                        <div>
                            <span className="block font-bold text-gray-400 mb-1">Genre:</span>
                            <Chip
                                label={GENRES[openMovie?.genre] || "Unknown"}
                                color="warning"
                                variant="filled"
                                className="capitalize"
                            />
                        </div>
                        <div>
                            <span className="block font-bold text-gray-400 mb-1">Rating:</span>
                            <span className="inline-flex items-center gap-2">
                                <Rating
                                    value={openMovie?.rating}
                                    readOnly
                                    precision={0.5}
                                    size="medium"
                                    sx={{ "& .MuiRating-iconEmpty": { color: "gray" }, color: "#ff9800" }}
                                />
                                <span className="text-orange-400 text-sm font-semibold">
                                    {openMovie?.rating}
                                </span>
                            </span>
                        </div>
                        <div>
                            <span className="block font-bold text-gray-400 mb-1">Description:</span>
                            <p className="text-gray-200 text-base font-mono">
                                {(openMovie?.description || "").replace(/<[^>]*>?/gm, " ") || "No description provided."}
                            </p>
                        </div>
                        <div>
                            <span className="block font-bold text-gray-400 mb-1">Release Year:</span>
                            <span className="text-gray-100 font-semibold">
                                {openMovie?.releaseYear || "NA"}
                            </span>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions className="px-6 pb-4 pt-2 bg-[#1a1a1a] flex justify-end">
                    <Button onClick={handleCloseMovie} color="warning" variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </section>
    );
};

export default DisplayMovie;
