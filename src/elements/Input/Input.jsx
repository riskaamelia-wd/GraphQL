import './Input.css'

const Input = ({label , value, placeholder, onChangeText, type, className, name, checked}) => {
    return (
        <>
            <label htmlFor={label}>
                {label}
            </label>
            <input
                type = {type}
                name = {name}
                placeholder = {placeholder ? placeholder : ''}
                value = {value}
                checked={checked}
                onChange = {onChangeText}
                className = {className}  
            />    
            
        </>
    )
}

export default Input