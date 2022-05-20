import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Messages from './../../contexts/Messages';
import './style.css';

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        id="modal-message"
        className={ props.type }
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
                {
                    props.message
                }
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='dark' onClick={props.onHide}>Fechar</Button>
        </Modal.Footer>
        </Modal>
    );
}

export default function ModalMessage() {

    const [messages, setMessages] = useContext(Messages);

    const onHide = ()=>{
        setMessages({
            title: '',
            message: '',
            type: ''
        });
    }

    return (
        <>
            <MyVerticallyCenteredModal
                show={messages.type}
                onHide={onHide}
                title={messages.title}
                message={messages.message}
                type={messages.type}
            />
        </>
    );
}