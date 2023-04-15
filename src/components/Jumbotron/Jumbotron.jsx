import React, {useState} from "react";
import Article from "../../elements/Article/Article";
import Button from "../../elements/Button/Button";

const Jumbotron = () => {
    const [title, setTitle] = useState(Article.title.en)
    const [description, setDescription]= useState(Article.description.en)
    const [language, setLanguage] = useState('English')

    
    const handleClick =(e)=>{
        e.preventDefault()
        // setTitle = (e) => ({title: !e.title})
        if (language === 'Indonesia') {
            setLanguage('English')
            setTitle(Article.title.en)
            setDescription(Article.description.en)
        } else{
            setLanguage('Indonesia')
            setTitle(Article.title.id)
            setDescription(Article.description.id)
        }
        
    }

    return (
    <>
        <div className="mx-auto col-12 col-lg-7 col-md-11 row mt-5 create">
            <img
                className="col-2 mx-auto"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/256px-Bootstrap_logo.svg.png"
                alt="logo bootstrap"
            />
            <div className="d-inline d-flex col-12 justify-content-center">
                <Button 
                    onClick={handleClick}
                    type={'button'}
                    text =  {language}
                    className="btn btn-secondary mt-3"
                />
            </div>

            <h2 className="col-12 text-center mt-4">{title}</h2>
            <p className="col-12 text-center mt-2">
                {description}
            </p>
        </div>
    </>
    )
}
  export default Jumbotron;