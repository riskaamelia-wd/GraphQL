
const Select = ({label,  onSelect,  name,  options, className}) => {
    return (
        <>         

            <div className="col-12">
                <label htmlFor={label}>
                    {label}
                </label>
            </div>
            <div className="col-md-7 col-10">
                <select 
                    // id={label}  
                    // disabled={(value.length === 1) ? true : false}
                    className={className}
                    name={name} 
                    onChange={onSelect}
                >
                    {
                        options?.map(option => (
                            <option 
                                key={option.value}
                                value={option.value}
                                >
                                    {option.text}
                                </option>
                        ))
                    }
                </select>
            </div>

        </>
    )
}

export default Select