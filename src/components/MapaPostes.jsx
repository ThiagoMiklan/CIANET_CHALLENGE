import React from 'react';
import { GoogleApiWrapper, Map, Marker} from 'google-maps-react';

const MapaPostes = (props) => {

  let container = {
    display: 'flex'
  }

  function createMarker(poste) {
    let code = <></>

    if (poste.new == true) {
      code = <Marker position={{ lat: poste.latitude, lng: poste.longitude }}
              name={poste.codigo} onClick={() => poste.onClickMarker(poste)} 
              label={poste.codigo} 
              icon={{url: "https://www.flaticon.com/svg/static/icons/svg/1239/1239525.svg", anchor: new google.maps.Point(32, 32), scaledSize: new google.maps.Size(32, 32)}}/>
    } else {
      code = <Marker position={{ lat: poste.latitude, lng: poste.longitude }} 
              name={poste.codigo} onClick={() => poste.onClickMarker(poste)} 
              label={poste.codigo}/>
    }

    return code;
  }

  return (
    <div style={container}>
      <Map google={props.google} zoom={11} initialCenter={{ lat: -27.5969, lng: -48.5495 }} centerAroundCurrentLocation={true}>
        {(props.unidades.map(poste => createMarker(poste)))}
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({ apiKey: ("AIzaSyCtfWooj-ekotGrZsROuysdC0Q28xAAwHE"), language: "PT" })(MapaPostes)
