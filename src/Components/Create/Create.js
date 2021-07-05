import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


const Create = () => {

    const [validStatus, setValidStatus] = useState(false);
    const [fieldName, setFieldName] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [submitted, setSubmitted] = useState([]);
    const [allField, setAllField] = useState([]);
    const [fieldInfo, setFieldInfo] = useState([]);



    useEffect(() => {
        fetch('http://localhost/api/get_form.php')
            .then(res => res.json())
            .then(data => setUserInfo(data.data.fields[0]))
    }, [])
    console.log(userInfo)

    useEffect(() => {
        var fieldName = Object.keys(userInfo)
        setFieldName(fieldName)
    }, [userInfo])
    console.log(fieldName)

    useEffect(() => {
        var fieldData = Object.values(userInfo)
        setAllField(fieldData)
    }, [userInfo])
    console.log(allField)

    useEffect(() => {
        allField.map(user => setFieldInfo(user))
    }, [allField])
    console.log(fieldInfo)



    const handleSubmit = (e) => {
        
        e.preventDefault();

        if (validStatus) {
            fetch('http://localhost/api/submit_form.php')
            .then(res => res.json())
            .then(data => setSubmitted(data))
        }
        else {
            alert('Type only letters')
        }
        if(submitted.status === 'success') {
            for (let i = 0; i < submitted.messages.length; i++) {
                alert(submitted.messages[i])
            }
            e.target.reset();
        }
    }
    
    console.log(submitted.messages)


    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === "user_name") {
            isFieldValid = /^[A-Za-z]+$/.test(e.target.value);
        }
        if (isFieldValid) {
            setValidStatus(true)
        }
        else {
            setValidStatus(false)
            alert("Type only letters")
            e.target.value = '';
        }
    }


    // const { register, handleSubmit } = useForm();
    // const onSubmit = data => console.log(data);

    var i = 0;

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>

                {/* {fieldName.map(fieldName => */}
                {allField.map(allField =>
                    <div className="form-group">
                        <label>{allField.title}</label>

                        {/* {fieldName.map(fieldName => */}
                        <input
                            onBlur={handleBlur}
                            name={fieldName[i++]}
                            type={allField.type}
                            className={allField.html_attr.class}
                            id={allField.html_attr.id}
                            defaultValue={allField.html_attr.data_something}
                            placeholder={allField.title}
                            required={allField.required}
                            validate={allField.validate}
                        // {...register(fieldName[i++],{ pattern: /^[A-Za-z]+$/i })}
                        />
                        {/* )} */}

                        <br />
                        {/* )} */}
                    </div>)}

                {/* <div class="form-group">
                    <label for="formGroupExampleInput2">Another label</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input" />
                </div> */}

                <br />
                <input className="btn btn-success mb-3" type="submit" value="Submit" />
                
            </form>
        </div>
    );
};

export default Create;
