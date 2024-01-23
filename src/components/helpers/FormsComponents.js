import React, {useEffect, useState} from "react";
import {Button, Form} from 'react-bootstrap';

/**
 * menu select desplegable 
 * @param label, title options
 */
export const Dropdown = (props) =>  {
    const [selectedOption, setSelectedOption] = useState(props.options[0].value);
    return (<>
        <Form.Label>{props.label}</Form.Label>
        <select 
          required    = {props.required ? true:false}
          name        = {props.name} 
          id          = {props.id} 
          title       = {props.title}
          placeholder = {props.placeholder} 
          className   = {props.className ? props.className : "form-control"}
          value       = {selectedOption}
          onChange    = {(e) => {setSelectedOption(e.target.value); props.handleChange(e)}}>
          {props.options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <Form.Control.Feedback id={'feedback_'+props.name} className={props.name} type="invalid"></Form.Control.Feedback>
        </>
    );
}

export const TextInput = (props) => {
  return (<>
    <Form.Label>{props.label}</Form.Label>
        <Form.Control
          type        = "text" 
          onChange    = {props.handleChange} 
          name        = {props.name} 
          id          = {props.id} 
          title       = {props.title ? props.title : "Por favor, Escribir el texto aquí."}
          placeholder = {props.placeholder ? props.placeholder : "Escribir aquí"}
          className   = {props.className ? props.className : "form-control"}
          value       = {props.vale} 
          required    = {props.required ? true:false}
          maxLength   = {props.maxlength ? props.maxlength:''}
        />
        <Form.Text className={props.textMini[0].class}>
          {props.textMini[1].text}
       </Form.Text>
       <Form.Control.Feedback id={'feedback_'+props.name} className={props.name} type="invalid"></Form.Control.Feedback>
  </>);
}