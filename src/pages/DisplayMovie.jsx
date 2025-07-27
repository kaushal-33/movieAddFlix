import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Rating, Chip } from "@mui/material";
import { Link } from "react-router-dom";

const GENRES = {
    1: "Action",
    2: "Comedy",
    3: "Drama",
    4: "Thriller",
    5: "Horror",
    6: "Romance",
};

const movies = [
    {
        id: 1,
        name: "Inception",
        url: "https://example.com/inception.jpg",
        genre: 1,
        rating: 4.5,
        description: "A mind-bending thriller about dreams within dreams."
    },
];

const DisplayMovie = ({ data = movies, onEdit, onDelete, onView }) => (
    <section className="movies-bg">
        <div className="movie-container my-12">
            <div className="flex justify-between items-center mb-4">
                <Link to={"/"}>
                    <img src="/LOGO.png" alt="LOGO" width={100} />
                </Link>
                <h2 className="uppercase font-bold text-end font-mono text-4xl text-orange-600">
                    movies list
                </h2>
            </div>
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
                        {data.map(movie => (
                            <TableRow
                                key={movie.id}
                            >
                                <TableCell>
                                    <img
                                        src={movie.url || "/noImage.png"}
                                        onError={e => (e.target.src = "/noImage.png")}
                                        alt={movie.name}
                                        className="rounded w-20 h-20 object-cover"
                                    />
                                </TableCell>
                                <TableCell className="font-mono font-bold text-orange-700" style={{ color: "gray" }}>{movie.name}</TableCell>
                                <TableCell>
                                    <Chip label={GENRES[movie.genre] || "Unknown"} color="warning" variant="outlined" className="capitalize" />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Rating value={movie.rating} readOnly precision={0.5} size="small"
                                            sx={{ "& .MuiRating-iconEmpty": { color: "gray" } }}
                                        />
                                        <span className="text-orange-700 font-semibold text-sm">{movie.rating}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex gap-2 justify-end">
                                        <Button title="Description" size="small" variant="outlined" color="warning" onClick={() => onView?.(movie)}>View</Button>
                                        <Button size="small" variant="contained" color="warning" onClick={() => onEdit?.(movie)}>Edit</Button>
                                        <Button size="small" variant="outlined" color="error" onClick={() => onDelete?.(movie)}>Delete</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            {/* Responsive helper: stack on mobile */}
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
    </section>
);

export default DisplayMovie;
