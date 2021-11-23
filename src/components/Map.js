import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const Map = ({data}) => {

    return (
        <MapContainer  zoom={5} scrollWheelZoom={false} center={data.countryInfo.position} >
        <div style={{height:'94vh'}}>
        <TileLayer
          url={'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'}
          id={'mapbox/streets-v11'}
          maxZoom={25}
          tileSize={512}
          zoomOffset={-1}
          accessToken={'pk.eyJ1IjoicGFzcWFsbHkiLCJhIjoiY2t2MXVmaHZoMDJkYzJwbngzem9pemh0ciJ9.NSWDDOUrZN0-egdnXP6ckQ'}
        />
        <GeoJSON data={data} pathOptions={{color:'red'}}/>
        </div>
      </MapContainer>
    )
}

export default Map
