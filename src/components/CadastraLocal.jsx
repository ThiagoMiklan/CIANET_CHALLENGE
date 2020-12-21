import React, { useState } from 'react';
import { Message, Field, Button, ButtonList} from 'assemble-react-bulma';
import ValidadeLocal from './ValidadeLocal';


let key = "&key=AIzaSyCtfWooj-ekotGrZsROuysdC0Q28xAAwHE";
let adress_base = "https://maps.googleapis.com/maps/api/geocode/json?address=";


const CadastraLocal = (props) => {

    const [state, onChangeRua, onChangeNumero, onChangeCidade, onChangeEstado, onChangeCep, changeHelp, limpar,onClickMarker] = useModel();

    function useModel() {

        const [state, setState] = useState({
            value_rua: '',
            value_numero: '',
            value_cidade: '',
            value_estado: '',
            value_cep: '',
            value_help: '',
            value_help_ok: '',
            className_help_ok: '',
            className_help: 'help',
            element_search: <></>
        })

        function onChangeRua(e) {
            setState({ ...state, value_rua: e.target.value })
        }

        function onChangeNumero(e) {
            setState({ ...state, value_numero: e.target.value })
        }

        function onChangeCidade(e) {
            setState({ ...state, value_cidade: e.target.value })
        }

        function onChangeEstado(e) {
            setState({ ...state, value_estado: e.target.value })
        }

        function onChangeCep(e) {
            setState({ ...state, value_cep: e.target.value })
        }

        function changeHelp(text, className) {
            setState({ ...state, value_help: text, className_help: className });
        }

        function changeHelpOk(text,className){  
            setState({ ...state, value_help_ok: text, className_help_ok: className });
        }

        function limpar() {
            setState({ value_rua: '', value_numero: '', value_cidade: '', value_estado: '', value_cep: '', value_help: '', className_help: '' });
        }

        function onClickMarker(poste){
            setState({...state,element_search: <ValidadeLocal poste={poste} postes={props.unidades} onCheckDistance={changeHelpOk}/>,value_help_ok:'',className_help_ok:''})
        }

        return [state, onChangeRua, onChangeNumero, onChangeCidade, onChangeEstado, onChangeCep, changeHelp, limpar,onClickMarker];

    }

    function onClickLimpar() {
        limpar();
    }

    function onClickCadastrar() {
        let address = createAdress();
        let url = adress_base + address + key;
        getGeocode(url).then(res => props.onCadPoste(createPoste(res)))
    }

    function createPoste(res) {
        if (res.results.length <= 0) {
            changeHelp('Nenhum local adicionado!', "help is-danger");
        } else {
            changeHelp('Novo local adicionado no mapa!', "help is-success");
        }
        let poste = { latitude: res.results[0].geometry.location.lat, longitude: res.results[0].geometry.location.lng };
        poste.onClickMarker = onClickMarker;
        poste.new  = true;
        return poste;
    }

    function createAdress() {
        let keywords = new Array();
        keywords.push(state.value_rua)
        keywords.push(state.value_numero)
        keywords.push(state.value_cidade)
        keywords.push(state.value_estado)
        keywords.push(state.value_cep)
        let address = '';

        for (let i = 0; i < keywords.length; i++) {
            address += "+" + keywords[i];
        }

        address.replace(",", " ");
        return address;
    }

    async function getGeocode(url, params) {
        var respJson = await window.fetch(url, params).then(res => res.json());
        return respJson;
    }


    return <Message header="Cadastrar Local">
                <Field label="Rua" onChange={onChangeRua} value={state.value_rua} />
                <Field label="Número" onChange={onChangeNumero} value={state.value_numero} />
                <Field label="Cidade" onChange={onChangeCidade} value={state.value_cidade} />
                <Field label="Estado" onChange={onChangeEstado} value={state.value_estado} />
                <Field label="CEP" onChange={onChangeCep} value={state.value_cep} />
            
                <ButtonList>
                    <Button label="Cadastrar Local" definition="is-success" onClick={onClickCadastrar} />
                    <Button label="Limpar" definition="is-danger" onClick={onClickLimpar} />
                </ButtonList>
                
                {state.element_search}
                
                <p style={{fontSize:16}} className={state.className_help_ok} >{state.value_help_ok} </p>

            </Message>
}


export default CadastraLocal;