import { useLocation } from "react-router-dom"
import Message from "../layout/Message"

function Projects() {
    const location = useLocation()
    let message = ''

    if(location.state) message = location.state.message
    console.log(message)
    
    return(
            <div>
                <h2>Meus Projetos</h2>
                {message && <Message msg={message} type="success" /> }
            </div>
    )
}

export default Projects