import { useLocation } from "react-router-dom"
import Message from "../layout/Message"
import LinkButton from "../layout/LinkButton"
import Container from "../layout/Container"

import styles from './Projects.module.css'

function Projects() {
    const location = useLocation()
    let message = ''

    if(location.state) message = location.state.message
    console.log(message)
    
    return(
            <div className={styles.project_container}>
                <div className={styles.title_container}>
                    <h2>Meus Projetos</h2>
                    <LinkButton to={'/newProject'} text={"Criar Projeto"} />
                </div>
                {message && <Message msg={message} type="success" /> }
                <Container customClass="start">
                    <p>
                        Projetos...
                    </p>
                </Container>
            </div>
    )
}

export default Projects