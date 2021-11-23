import Actions from "./components/Actions";
import Map from "./components/Map";
import { useEffect, useState } from 'react'


const App = ()=> {
  const [coords, setCoords] = useState({})
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition( async (position) => {
        try {
          const {latitude, longitude } = position.coords;
          const  res = await fetch('http://localhost:5000',{
            method:'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify({coords: [latitude,longitude]})
          });
          const data = await res.json();
          // console.log(data)
          setCoords(data);
        } catch (error) {
          
        }
      });
    } else {
      setCoords([0,0]);
    }
    
  }, [])
  return (
    <>
      <Actions/>
      {
       Object.keys(coords).length && <Map data={coords}/>
      }
    </>
  );
}

export default App;
