import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMoviesHandler = useCallback(async function () {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(
				'https://react-http-ae809-default-rtdb.europe-west1.firebasedatabase.app/films.json'
			);
			if (!response.ok) {
				setIsLoading(false);
				throw new Error('HTTP request failed.');
			}
			const data = await response.json();

			const loadedMovies = [];

			for (const key in data){
				loadedMovies.push({id: key,
					title: data[key].title,
					openingText: data[key].openingText,
					releaseDate: data[key].releaseDate})
			}

			// const transformedMovies = data.results.map((item) => {
			// 	return {
			// 		id: item.episode_id,
			// 		title: item.title,
			// 		openingText: item.opening_crawl,
			// 		releaseDate: item.release_date
			// 	};
			// });

			console.log('JSON translation');
			setMovies(loadedMovies);
			console.log(loadedMovies);
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	let content = <p>The movies list is empty.</p>;

	if (movies.length > 0) {
		content = <MoviesList movies={movies} />;
	}

	if (error) {
		content = <p>An error "{error}" ocurred.</p>;
	}

	if (isLoading) {
		content = <p>Loading ...</p>;
	}

	async function addMovieHandler(movie) {
		const response = await fetch(
			'https://react-http-ae809-default-rtdb.europe-west1.firebasedatabase.app/films.json',
			{
				method: 'POST',
				body: JSON.stringify(movie),
				headers: { 'Content-Type': 'application/json' }
			}
		);
		const data = await response.json()
		console.log(data);

	}

	return (
		<React.Fragment>
			<section>
				<AddMovie onAddMovie={addMovieHandler} />
			</section>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>{content}</section>
		</React.Fragment>
	);
}

export default App;
