import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Register from './Pages/Register';
import { Container, Row, Col } from 'react-bootstrap';
import Messages from './contexts/Messages';

function App() {

  const [messages, setMessages] = useState({
    title: '',
    message: '',
    type: ''
  });

  return (
    <Container className="App">
      <Row>
        <Col>
          <Messages.Provider
            value={[messages, setMessages]}
          >
            <Register />
          </Messages.Provider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
