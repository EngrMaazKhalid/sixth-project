import { useState, useEffect, useCallback } from 'react';

const useHttp = ( ) =>{

    const [movies, setMovies] = useState([]);
  const [Loading, setLoading ] =useState(false)
  const [error, setError] = useState(null)


const sendRequest=useCallback(async (RequestConfig, applyData)=> {
 
    setLoading(true)
    setError(null)
    try{ 
      const response= await fetch(RequestConfig.url, {
        method: RequestConfig.method ? RequestConfig.method : 'GET',
        headers: RequestConfig.header ? RequestConfig.header : {},
        body: RequestConfig.body? JSON.stringify(RequestConfig.body) : null
      })
      if(!response.ok){
        throw new Error('Something went wrong....!!!')
      } 
    const data= await response.json();
    applyData(data)
//           {
//    const loadedMovies =[];
//    for(const key in data){
//     loadedMovies.push({
//       id:key,
//       title: data[key].title,
//       openingText: data[key].openingText,
//       releaseDate: data[key].releaseDate,
//     })
//    } setMovies(loadedMovies)
//}
       
         
        }
          catch(error){
            setError(error.message)
          }
          setLoading(false)
  },[])
  useEffect(() =>{
    sendRequest();
   },[sendRequest])

   return {
       Loading,
       error,
       sendRequest
   }
}

export default useHttp