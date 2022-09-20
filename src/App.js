import React, {useState, useEffect, } from "react";
import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
import useHttp from "./Hooks/useHttp";
import "./App.css";
//Async
function App() {
  const [movies, setMovies] = useState([]);
  const [Loading, setLoading ] =useState(false)




const { isLoading, error, sendRequest: fetchMoviesHandler } =useHttp();

useEffect(() =>{
  const TransformTask = (taskObj) =>{
    const loadedMovies =[];
     for(const key in taskObj){
      loadedMovies.push({
        id:key, 
        title: taskObj[key].title,
        openingText: taskObj[key].openingText,
        releaseDate: taskObj[key].releaseDate,
      })
     }
         
            setMovies(loadedMovies)
   }
     fetchMoviesHandler({url:'https://react-http-a0d56-default-rtdb.firebaseio.com/movies.json'}, TransformTask);
    },[])
  
    

// {const fetchMoviesHandler=useCallback(async ()=> {
 
//     setLoading(true)
//     setError(null)
//     try{ 
//       const response= await fetch('https://react-http-a0d56-default-rtdb.firebaseio.com/movies.json')
//       if(!response.ok){
//         throw new Error('Something went wrong....!!!')
//       } 
//     const data= await response.json();
          
//    const loadedMovies =[];
//    for(const key in data){
//     loadedMovies.push({
//       id:key,
//       title: data[key].title,
//       openingText: data[key].openingText,
//       releaseDate: data[key].releaseDate,
//     })
//    }
       
//           setMovies(loadedMovies)
//         }
//           catch(error){
//             setError(error.message)
//           }
//           setLoading(false)
//   },[])
//   useEffect(() =>{
//     fetchMoviesHandler();
//    },[fetchMoviesHandler])}
  

  async function addMovieHandler(movie) {
  const response= await fetch('https://react-http-a0d56-default-rtdb.firebaseio.com/movies.json',{
    method: 'POST',
    body: JSON.stringify(movie),
    headers: {
      'Content-Type': 'application/json'
    }
   });
   const data =await response.json();

   console.log(data)
  }

  let content =<p>Found no movies!!!</p>

  if(error){
    content= <p>{error}</p>
  }

  if(movies.length > 0){
    content = <MoviesList movies={movies} />
  }

    if(Loading){
      content=<p>Loading.........</p>
    }
  ///Sync
    // {fetch('https://swapi.dev/api/films/')
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     const transformedMovies = data.results.map((movieData) => {
    //       return {
    //         id: movieData.episode_id,
    //         title: movieData.title,
    //         openingText: movieData.opening_crawl,
    //         releaseDate: movieData.release_date,
    //       };
    //     });
    //     setMovies(transformedMovies);
    //   });}
  

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

