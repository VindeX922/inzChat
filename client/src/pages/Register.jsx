import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Register = () => {

const {registerInfo, updateRegisterInfo, registerUser, registerError,IsregisterLoading} = useContext(AuthContext)

    return <>
        <Form onSubmit={registerUser}>
            <Row style={{
                height: "100vh",
                justifyContent: "center",
                paddingTop: "11%"
            }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <h2>Zarejestruj</h2>
                        <Form.Control type="text" placeholder="Nazwa" onChange={(e) => updateRegisterInfo
                            ({...registerInfo, name: e.target.value})} />
                        <Form.Control type="email" placeholder="Email" onChange={(e) => updateRegisterInfo
                            ({...registerInfo, email: e.target.value})}/>
                        <Form.Control type="password" placeholder="Haslo" onChange={(e) => updateRegisterInfo
                            ({...registerInfo, password: e.target.value})} />
                        <Button variant="primary" type="submit">
                            {IsregisterLoading ? "Tworzenie konta..." : "Zarejestruj"}
                        </Button>
                        {
                            registerError?.error && (
                            <Alert variant="danger"><p>{registerError?.message}</p>
                            </Alert>
                        )}
                </Stack>
                </Col>
            </Row>
        </Form>
    </>
}
 
export default Register;