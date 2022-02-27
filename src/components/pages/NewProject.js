import ProjectForm from '../project/ProjectForm'
import style from './NewProject.module.css'


function NewProject() {
    return (
        <div className={style.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie aqui seu projeto para depois adicionar os serviços</p>
            <ProjectForm btnText="Criar Projeto" />
        </div>
    )
}

export default NewProject