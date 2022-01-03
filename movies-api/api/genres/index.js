import express from 'express';
import { genres } from './genres';
import Genre from './genreModel';


const router = express.Router(); 
router.get('/', (req, res) => {
    res.json(genres);
});

// Get movie genres
// router.get('/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     if (genres.id == id) {
//         res.status(200).json(genres);
//     } else {
//         res.status(404).json({
//             message: 'The resource you requested could not be found.',
//             status_code: 404
//         });
//     }
// });


// Get all genres
router.get('/', async (req, res) => {
    const genres = await Genre.find();
    res.status(200).json(genres);
});

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

export default router;