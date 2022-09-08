import { useEffect, useState } from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';

const apiUrl = 'http://localhost:4000';

function App() {
  const [movies, setMovies] = useState([]);
  const [createMobvieError, setCreateMobvieError] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {

    fetch(`${apiUrl}/movie`)
      .then(res => res.json())
      .then(res => setMovies(res.data.movies)
      );

  }, []);

  useEffect(() => {

    fetch(`${apiUrl}/movie`)
      .then(res => res.json());

  }, [movies]);


  const handleRegister = async ({ username, password }) => {

    try {

      const respone = await fetch('http://localhost:4000/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await respone.json();
      console.log(data.data);

    } catch (error) {
      console.log({ error });
    }
  };

  const handleLogin = async ({ username, password }) => {
    try {

      const respone = await fetch('http://localhost:4000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await respone.json();
      data.token ? localStorage.setItem('authorization', data.token) : setLoginError(data.error);

    } catch (e) {
      console.log({ e });
    }
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    try {

      const token = localStorage.getItem('authorization');
      const respone = await fetch('http://localhost:4000/movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, runtimeMins })
      
      });

      const data = await respone.json();
      console.log(data,data.data.movie);
      // setContacts([...contacts, contact])
      data.data.movie ?  setMovies([...movies, data.data.movie]): setCreateMobvieError(data.error);
    
    } catch (e) {
      console.log({ e });
    }
  }

  return (
    <div className="App">
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />

      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} />
      {loginError && <p>{loginError}</p>}

      <h1>Create a movie</h1>
      <MovieForm handleSubmit={handleCreateMovie} />

      {createMobvieError && <p>{createMobvieError}</p>}

      <h1>Movie list</h1>
      <ul>
        {movies && movies.map(movie => {
          return (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Description: {movie.description}</p>
              <p>Runtime: {movie.runtimeMins}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;