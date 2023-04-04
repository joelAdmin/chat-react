import React, {useEffect, useState} from "react";
import {Alert, Button, Form} from 'react-bootstrap';
import { Dropdown, TextInput } from "../helpers/FormsComponents";
import axios from 'axios';
import Cookies from 'universal-cookie';
import {validatorBootstrap, headers} from '../lib/Lib';
import Swal from 'sweetalert2';
import $ from 'jquery';
import {useSelector, useDispatch} from 'react-redux';
import {openChat, getChatsUser, getChatsMaster, getSubChatsMaster} from '../../features/user/chatSlice';
import {getChatsU as getApiChatsU, getChatsM as getApiChatsM} from '../helpers/Chat';

export const NewConsulta =()=> {
    const cookies = new Cookies();
    const userAuth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        emisorId:userAuth.userAuth.usuario_id,
        tipoConsulta:'',
        asunto:'',
        nombre:'',
        telefono:'',
        cargo:'',
    });
    const [validated, setValidated] = useState(false);
    const handleSubmit =(event)=> {
        const formulario = event.currentTarget;
        console.log(formulario.checkValidity());
        event.preventDefault();
        if (formulario.checkValidity() === false) {            
            event.stopPropagation();
        }else
        {
            console.log('Eviado form:', form);
            axios.post(process.env.REACT_APP_URL_API+'newConsulta', form, {
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer '+cookies.get('token')
                },
                mode:'cors',
                data: {},
            }).then(response => {            
                if(response.data.res)
                { 
                    setValidated(false);  
                    //se limpia el formulario y se procede a cerrar 
                    formulario.reset();
                    formulario.classList.remove('was-validated');
                    const btnMiModal = document.getElementById('btnCloseModalmodalNewConsulta');
                    btnMiModal.click();

                    //actualizo las variables de estado para lista de chats
                    getApiChatsU(userAuth.userAuth.usuario_id).then(resp => {
                        dispatch(getChatsUser(resp.result));
                    }).catch(error => {
                        console.log('Error 0001x consulta chat user', error);
                    });

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Guardado!',
                        text: response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    });                    
                }else
                {
                    /**
                     * en caso de no tener respuesta muestro los mensajes 
                     * de error que vienen en el objeto response.data
                     * donde @property {data.errors} contiene los errores de los inpust generados 
                     * desde la configuración del modelo y @property {data.message} es un mensaje 
                     * personalizado en caso de no ingresar los credenciales correctos.
                     */
                    console.log('validando errores de inicio de sesion');
                    console.log(response);
                    setValidated(true);
                    validatorBootstrap(response.data.errors, '.newConsultaForm');
                                   
                    if(response.data.message){       
                        console.log('validando errores de inicio de sesion 3');         
                        //getMessage(response.data.message);
                    }   
                }        
            }).catch(error => {
                console.log('Error 0001x Send form', error);
            }); 
        }
        setValidated(true);
    }

    const handleChange =(event)=> {
        setForm({...form, [event.target.name]:event.target.value});
        console.log('form:', form);
    }

    return (<>
        <Form className="newConsultaForm" noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">               
                <Dropdown title="Por favor, seleccionar tipo de consulta" 
                label="Seleccionar tipo de consulta"
                name="tipoConsulta"
                id="tipoConsulta"
                placeholder="Seleccionar aqui"
                handleChange = {handleChange}
                options={
                        [
                            { label: "Asesoría", value: "Asesoría" },
                            { label: "Cobro de cartera prejuridico", value: "Defensa" }
                        ]
                    } 
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <TextInput 
                required
                maxlength    = "255"
                label        = "Asunto" 
                title        = "Por favor, ingresar asunto"
                placeholder  = "Ingresar asunto:maxímo 255 caracteres" 
                handleChange = {handleChange}
                name         = "asunto"
                id           = "asunto"  
                textMini     = {[
                        {class : "text-danger"},
                        {text  : ""}
                    ]
                }
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <TextInput 
                required
                label        = "Nombre completo del solicitante" 
                title        = "Por favor, ingresar Nombre completo del solicitante" 
                handleChange = {handleChange}
                name         = "nombre"
                id           = "nombre"  
                textMini     = {[
                        {class : "text-danger"},
                        {text  : ""}
                    ]
                }
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <TextInput 
                pattern       = "[0-9]*"
                label        = "Número de contacto" 
                title        = "Por favor, ingresar número de contacto del solicitante" 
                handleChange = {handleChange}
                name         = "telefono"   
                id           = "telefono"  
                textMini     = {[
                        {class : "text-danger"},
                        {text  : ""}
                    ]
                }
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <TextInput 
                label        = "Cargo" 
                title        = "Por favor, ingresar cargo" 
                handleChange = {handleChange}
                name         = "cargo"
                id           = "cargo"  
                textMini     = {[
                        {class : "text-danger"},
                        {text  : ""}
                    ]
                }
                />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Guardar
            </Button>
        </Form>
    </>);
}