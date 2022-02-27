import styles from './input.module.css'

function Input({text, type, name, value, placeholder, handleOnchange }){
    return(
        <div className={styles.form_controll}>
            <label htmlFor="name">{text}:</label>
            <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            onChange={handleOnchange}
            value={value}
             />
        </div>
    )
}

export default Input