import React, { useContext, useState } from 'react';
import Messages from '../../contexts/Messages';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import "./style.css";
import { valid } from './../../utils';

export default function Forms(){

    const [messages, setMessages] = useContext(Messages);

    const [fullname, setFullname] = useState({
        data: '',
        isError: false
    });

    const [email, setEmail] = useState({
        data: '',
        errorMessage: 'Digite um e-mail válido!',
        isError: false
    });

    const [username, setUsername] = useState({
        data: '',
        errorMessage: 'Nome de usuário deve ser diferente de "cloud", "lx2018" e "kiwi".',
        isError: false
    });

    const [dateOfBirth, setDateOfBirth] = useState({
        data: new Date().toISOString().substring(0, 10),
        isError: false
    });

    const [password, setPassword] = useState({
        data: '',
        isError: false,
        errorMessage: 'A senha deve ter pelo menos 6 caracteres, um caracter especial como ?! e um número'
    });

    const [passwordRepeat, setPasswordRepeat] = useState({
        data: '',
        isError: false,
        errorMessage: 'Senhas não correspondem'
    });

    const changePassword = (value)=>{
        setPassword({
            data: value,
            errorMessage: password.errorMessage,
            isError: false
        });
    }

    const changeUsername = (value)=>{

        let isError = !valid.username(value);

        setUsername({
            data: value,
            errorMessage: username.errorMessage,
            isError
        });

    }

    const blurFullname = ()=>{
        if(!fullname.data) {
            setFullname({
                data: fullname.data,
                errorMessage: "Nome não informado!",
                isError: true
            });
        }

    }

    const blurPassword = ()=>{
        if(!valid.password(password.data)) {
            setPassword({
                data: password.data,
                errorMessage: password.errorMessage,
                isError: true
            });
        }
    }

    const blurPasswordRepeat = ()=>{
        if(password.data !== passwordRepeat.data) {
            setPasswordRepeat({
                data: passwordRepeat.data,
                errorMessage: passwordRepeat.errorMessage,
                isError: true
            });
        }
    }

    const blurEmail = ()=>{
        if(!valid.email(email.data)) {
            setEmail({
                data: email.data,
                errorMessage: email.errorMessage,
                isError: true
            });
        }
    }

    const resetForm = ()=>{

        setEmail({
            data: '',
            errorMessage: email.errorMessage,
            isError: false
        });

        setPassword({
            data: '',
            errorMessage: password.errorMessage,
            isError: false
        });

        setPasswordRepeat({
            data: '',
            errorMessage: passwordRepeat.errorMessage,
            isError: false
        });

        setUsername({
            data: '',
            errorMessage: username.errorMessage,
            isError: false
        });

        setFullname({
            data: '',
            errorMessage: fullname.errorMessage,
            isError: false
        });

        setDateOfBirth({
            data: new Date().toISOString().substring(0, 10),
            errorMessage: dateOfBirth.errorMessage,
            isError: false
        });

    }

    const validAllInput = ()=>{

        let hasError = false;

        if(!valid.email(email.data)){
            let newObj = email;
            newObj.isError = true;
            hasError = true;
        }

        if(!valid.password(password.data)){
            let newObj = password;
            newObj.isError = true;
            hasError = true;
        }

        if(password.data !== passwordRepeat.data){
            let newObj = passwordRepeat;
            newObj.isError = true;
            hasError = true;
        }

        if(!valid.username(username.data)){
            let newObj = username;
            newObj.isError = true;
            hasError = true;
        }

        return !hasError;

    }

    const register = ()=>{

        if(!fullname.data || !email.data || !password.data || !username.data || !dateOfBirth.data){
            return setMessages({
                title: 'Erro ao fazer cadastro',
                message: 'Todos os campos do formulário devem ser preenchidos!',
                type: 'error'
            });
        }

        if(!validAllInput()){
            return setMessages({
                title: 'Erro ao fazer cadastro',
                message: 'Há campos com valores inválidos!',
                type: 'error'
            });
        }

        resetForm();

        setMessages({
            title: 'Cadastro finalizado',
            message: 'Você foi cadastrado com sucesso',
            type: 'success'
        });

    }

    return (
        <Form id="forms">
            <h1>Formulário de Cadastro</h1>
            <Form.Group className={`mb-3${fullname.isError ? ' error' : ''}`} controlId="fullname">
                <Form.Label>Nome completo</Form.Label>
                <Form.Control
                    value={fullname.data}
                    onBlur={blurFullname}
                    onChange={
                        e=>setFullname({
                            data: e.target.value,
                            isError: false
                        })
                    }
                    type="text"
                    placeholder="Digite o seu nome completo"
                />
                <Form.Text className="text-muted">
                {
                    fullname.errorMessage
                }
                </Form.Text>
            </Form.Group>

            <Form.Group className={`mb-3${email.isError ? ' error' : ''}`} controlId="e-mail">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                    value={email.data}
                    onBlur={blurEmail}
                    onChange={
                        e=>setEmail({
                            data: e.target.value,
                            errorMessage: email.errorMessage,
                            isError: false
                        })
                    }
                    type="email"
                    placeholder="Digite o seu melhor e-mail"
                />
                <Form.Text className="text-muted">
                {
                    email.errorMessage
                }
                </Form.Text>
            </Form.Group>

            <Container className="form-grid" fluid>
                <Row>
                    <Col xs={12} md={6} style={{paddingLeft: 0}}>
                        <Form.Group
                            className={`mb-3${password.isError ? ' error' : ''}`}
                            controlId="password"
                        >
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                value={password.data}
                                onBlur={()=>blurPassword()}
                                onChange={e=>changePassword(e.target.value)}
                                type="password"
                                placeholder="Digite uma senha"
                            />
                            <Form.Text className="text-muted">
                            {
                                password.errorMessage
                            }
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} style={{paddingRight: 0}}>
                        <Form.Group
                            className={`mb-3${passwordRepeat.isError ? ' error' : ''}`}
                            controlId="password"
                        >
                            <Form.Label>Confirmação de senha</Form.Label>
                            <Form.Control
                                value={passwordRepeat.data}
                                onBlur={()=>blurPasswordRepeat()}
                                onChange={e=>setPasswordRepeat({
                                    data: e.target.value,
                                    errorMessage: passwordRepeat.errorMessage,
                                    isError: false
                                })}
                                type="password"
                                placeholder="Digite a senha novamente"
                            />
                            <Form.Text className="text-muted">
                            {
                                passwordRepeat.errorMessage
                            }
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>







            <Container className="form-grid" fluid>
                <Row>
                    <Col xs={12} md={6} style={{paddingLeft: 0}}>
                        <Form.Group className={`mb-3${username.isError ? ' error' : ''}`} controlId="username">
                            <Form.Label>Usuário</Form.Label>
                            <Form.Control value={username.data} onChange={e=>changeUsername(e.target.value)} type="text" placeholder="Digite um nome de usuário" />
                            <Form.Text className="text-muted">
                            {
                                username.errorMessage
                            }
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} style={{paddingRight: 0}}>
                        <Form.Group className={`mb-3${dateOfBirth.isError ? ' error' : ''}`} controlId="date-of-birth">
                            <Form.Label>Data de nascimento</Form.Label>
                            <Form.Control
                                value={dateOfBirth.data}
                                onChange={
                                    e=>setDateOfBirth({
                                        data: e.target.value,
                                        isError: false
                                    })
                                }
                                type="date"
                                placeholder="Digite a sua data de nascimento"
                            />
                            <Form.Text className="text-muted">
                            Data de nascimento não informada.
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>

            <Button variant="primary" onClick={register}>
                Me inscrever
            </Button>
        </Form>
    );
}