import React, {useEffect, useState} from "react";
import {Button, Form} from 'react-bootstrap';
import { Dropdown, TextInput } from "../helpers/FormsComponents";

export const NewConsulta =()=> {
    const [form, setForm] = useState({});
    const handleSubmit =(event)=> {
        event.preventDefault();
        alert('enviando datos');
    }

    const handleChange =(event)=> {
        setForm({...form, [event.target.name]:event.target.value});
        console.log('form:', form);
    }

    return (<>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="type">               
                <Dropdown title="Por favor, seleccionar tipo de consulta" 
                label="Seleccionar tipo de consulta"
                name="tipo"
                id="tipo"
                placeholder="Seleccionar aqui"
                options={
                        [
                            { label: "lasts hours", value: "hour" },
                            { label: "lasts days", value: "day" },
                            { label: "lasts weeks", value: "week" },
                            { label: "lasts months", value: "month" },
                            { label: "lasts years", value: "year" }
                        ]
                    } 
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <TextInput 
                label        = "Asunto" 
                title        = "Por favor, ingresar asunto" 
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <TextInput 
                label        = "Nombre completo" 
                title        = "Por favor, ingresar Nombre completo" 
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

            <Form.Group className="mb-3" controlId="formBasicContacto">
                <TextInput 
                label        = "Número de contacto" 
                title        = "Por favor, ingresar número de contacto" 
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

            <Form.Group className="mb-3" controlId="formBasicCargo">
                <TextInput 
                label        = "Cargo" 
                title        = "Por favor, ingresar cargo" 
                handleChange = {handleChange}
                name         = "Cargo"
                id           = "Cargo"  
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