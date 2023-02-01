import React, {useEffect, useState} from "react";
import {Button, Form} from 'react-bootstrap'

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

    const Dropdown = ({
        options = [
            { label: "last hour", value: "hour" },
            { label: "last day", value: "day" },
            { label: "last week", value: "week" },
            { label: "last month", value: "month" },
            { label: "last year", value: "year" }
          ]
      }) => {
        const [selectedOption, setSelectedOption] = useState(options[0].value);
        return (
            <select className="form-control"
              value={selectedOption}
              onChange={e => setSelectedOption(e.target.value)}>
              {options.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
        );
    };

    return (<>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="type">
                <Form.Label>Seleccionar tipo de consulta</Form.Label>
                <Dropdown />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Asunto</Form.Label>
                <Form.Control type="text" onChange={handleChange} name="asunto" placeholder="Ingresar asunto" />
                <Form.Text className="text-muted">
                Well never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control type="text" name="nombre" onChange={handleChange} placeholder="Ingresar nombre" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicContacto">
                <Form.Label>Número de contacto</Form.Label>
                <Form.Control type="text" name="numero" onChange={handleChange} placeholder="Ingresar número" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCargo">
                <Form.Label>Cargo</Form.Label>
                <Form.Control type="text" name="cargo" onChange={handleChange} placeholder="Ingresar cargo" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Guardar
            </Button>
        </Form>
    </>);
}