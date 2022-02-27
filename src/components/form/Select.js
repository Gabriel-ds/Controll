import styles from './Select.module.css'

function Select({text, name, handleOnchange, value, options }){
    return(
        <div className={styles.form_controll}>
            <label htmlFor="name">{text}:</label>
            <select name={name} id={name} >
                <option>Selecione uma opção</option>
            </select>
        </div>
    )
}

export default Select