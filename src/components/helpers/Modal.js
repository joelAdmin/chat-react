import React, {useState, useEffect} from "react";
import {Modal, Button} from 'react-bootstrap';

export const ModalLink = function ModalBasic(props) {
    const [show, setShow] = useState(props.show);
    const [backdrop, setBackdrop] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true); setBackdrop(props.backdrop);}
  
    return (
      <>
        {props.showLink === true &&
          <a className="nav-link" onClick={handleShow}>
              <i className={props.icono}></i>
          </a> 
        } 
        <Modal
            id={props.id}
            backdrop={backdrop} 
            show={show}
            size={props.size}
            onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.body}</Modal.Body>
          <Modal.Footer>
            <Button 
            id={'btnCloseModal'+props.id}
            variant="secondary" 
            onClick={handleClose}
            >
              Cerrar
            </Button>
            {/*<Button variant="primary" onClick={handleClose}>
                      Save Changes
            </Button>*/}
          </Modal.Footer>
        </Modal>
      </>
    );
}

export const ModalAccept = function ModalBasic(props) {
  const [show, setShow] = useState(props.show);
  const [backdrop, setBackdrop] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true); setBackdrop(props.backdrop);}

  return (
    <>
      {props.showLink === true &&
        <a className="nav-link" onClick={handleShow}>
            <i className={props.icono}></i>
        </a> 
      } 
      <Modal
          id={props.id}
          backdrop={backdrop} 
          show={show}
          size={props.size}
          onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <Button 
          id={'btnCloseModal'+props.id}
          variant="secondary" 
          onClick={props.handleAction}
          >
            {props.titleBtn}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export const ModalBasic = function ModalBasic(props) {
    const [show, setShow] = useState(props.show);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, youre reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export const ModalBasic2 = function ModalBasic2() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, youre reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}
