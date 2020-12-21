import React,{useState} from 'react';
import {Button,ButtonList} from 'assemble-react-bulma';

const ValidadeLocal = (props) => {
    let postes = props.postes
    
    function onClickSim(poste){
        checkDistance(poste)
    }

    function checkDistance(poste){
      let postes_ok = new Array();
      for(let i = 0; i < postes.length; i++){
        let distancia = haversineDistance([poste.latitude,poste.longitude],[postes[i].latitude,postes[i].longitude]);
        if(distancia <= 0.150 && postes[i].new != true){
          postes_ok.push(postes[i].codigo)
        }
     }
    
     if(postes_ok.length <= 0  ){
        props.onCheckDistance("Não é possível a instalação","help is-danger");
     }else{
        props.onCheckDistance("A instalação é possível nos postes: "+postes_ok.join(),"help is-success");
     }

    }

    function onClickNao(poste){
        
    }

    return <>
            <p>Verificar a possibilidade de inclusão?</p>
                <ButtonList>
                    <Button label="SIM" definition="is-success" onClick={()=>onClickSim(props.poste)}/>
                    <Button label="NÃO" definition="is-danger" onClick={()=>onClickNao(props.poste)}/>
                </ButtonList>
             </>
}

// Atenção: Não fiz esse método, peguei ele na internet para acelerar o processo
// Tentei usar a API MATRIX DISTANCE, mas vi que era outra chave
// Teste os valores retornados pelo método fazendo comparação com o Google Maps
// Existe uma perda de valores se considerarmos curvas,em linha reta apresenta uma grande precisão


/**
     * Calculates the haversine distance between point A, and B.
     * @param {number[]} latlngA [lat, lng] point A
     * @param {number[]} latlngB [lat, lng] point B
     * @param {boolean} isMiles If we are using miles, else km.
     */
    const haversineDistance = ([lat1, lon1], [lat2, lon2], isMiles = false) => {
        const toRadian = angle => (Math.PI / 180) * angle;
        const distance = (a, b) => (Math.PI / 180) * (a - b);
        const RADIUS_OF_EARTH_IN_KM = 6371;
  
        const dLat = distance(lat2, lat1);
        const dLon = distance(lon2, lon1);
  
        lat1 = toRadian(lat1);
        lat2 = toRadian(lat2);
  
        // Haversine Formula
        const a =
          Math.pow(Math.sin(dLat / 2), 2) +
          Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.asin(Math.sqrt(a));
  
        let finalDistance = RADIUS_OF_EARTH_IN_KM * c;
  
        if (isMiles) {
          finalDistance /= 1.60934;
        }
     
        return finalDistance;
};

export default ValidadeLocal;