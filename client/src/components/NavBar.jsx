import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Notification from "./chat/Notifications";

const NavBar = () => {

const {user, logoutUser} = useContext(AuthContext)

    return <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
    <Container>
        <h2>
            <Link to="/" className="link-light text-decoration-none">Halo</Link>   
            </h2>
            {!user && <span className="text-warning">
               Nie jesteś zalogowany {user?.name} 
            </span> }
            {user &&<span className="text-warning">
               Zalogowano jako {user?.name} 
            </span>}
            <Nav>
                <Stack direction="horizontal" gap={3}>
                    {
                        user && (<>
                        <Notification/>
                         <Link onClick={()=> logoutUser()} to="/login" className="link-light text-decoration-none">Wyloguj</Link>
                        </>)
                    }
                    {!user && (<>
                    <Link to="/login" className="link-light text-decoration-none">Zaloguj</Link>
                    <Link to="/register" className="link-light text-decoration-none">Zarejestruj</Link>
                    </>)}                   
                </Stack>
            </Nav>
    </Container>
    </Navbar>;
}
 
export default NavBar;