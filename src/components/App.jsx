import React, { useState } from 'react';
import { Message, Container, Columns, Column } from 'assemble-react-bulma'
import MapaPostes from './MapaPostes';
import CadastraLocal from './CadastraLocal';

//var chave = "AIzaSyCtfWooj-ekotGrZsROuysdC0Q28xAAwHE"

const App = (props) => {
    let postes = require('../data/postes.json');
    let unidades = postes.unidades;

    const[state,setState] = useState({unidades:unidades});

    function onCadPoste(poste_add){
        var unidades = state.unidades;
        unidades.push(poste_add);
        setState({...state,unidades: unidades});
    }
    
    return <Columns definition="is-multiline">
                 <Column definition="is-half">
                    <CadastraLocal onCadPoste={onCadPoste} unidades={unidades}/>
                </Column>

                <Column definition="is-half">
                    <MapaPostes unidades={state.unidades} />
                </Column>
        </Columns>

}

export default App;

