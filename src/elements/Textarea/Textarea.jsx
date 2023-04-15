const Textarea = ({label, value, onChangeText, className, name}) => {
    return (
        <>
            <label htmlFor={label}>
                {label}
            </label>
            <textarea
                className={className}
                // id="description"
                value = {value}
                onChange = {onChangeText}
                name={name}
                rows={5}
                
            />
        </>

    )
}
export default Textarea