import { useState } from "react"

const Radio = ({radios, onChangeFreshness, freshness}) => {
    // const [freshness, setFreshness] = useState('')
    console.log(freshness)
    return (

        <>             
            {radios.map((radio,id) => (
               
                <div className="form-check" key={id}
                >
                    <label htmlFor={radio.value}>
                        {radio.value}
                    </label>
                    <input
                        className={"form-check-input"}
                        value={radio.value}
                        checked={freshness === radio.checked}
                        type='radio'
                        name={radio.name}
                        // checked={selectedOption === value}
                        onChange={onChangeFreshness}
                    >
                    </input>
                </div>                
                ))
            }   
        </>
    )
}

export default Radio