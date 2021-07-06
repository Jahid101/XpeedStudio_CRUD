import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Update = () => {

    const [validStatus, setValidStatus] = useState(false);
    const [selectStatus, setSelectStatus] = useState(false);
    const [radioStatus, setRadioStatus] = useState(false);
    const [fieldName, setFieldName] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [radio, setRadio] = useState([]);
    const [submitted, setSubmitted] = useState([]);
    const [allField, setAllField] = useState([]);
    const [select, setSelect] = useState([]);
    const { id } = useParams();


    //For fetching the Api 
    useEffect(() => {
        fetch(`http://localhost/api/get_form.php?id=${id}`)
            .then(res => res.json())
            .then(data => setUserInfo(data.data.fields[0]))
    }, [id])
    console.log(userInfo)


    //For the name of field
    useEffect(() => {
        var fieldName = Object.keys(userInfo)
        setFieldName(fieldName)
    }, [userInfo])
    console.log(fieldName)


    //For the values of field data
    useEffect(() => {
        var fieldData = Object.values(userInfo)
        setAllField(fieldData)
    }, [userInfo])
    console.log(allField)


    //For the gender Select option
    useEffect(() => {
        const res = allField.find(allField => allField.type === 'select');
        console.log(res)

        if (res) {
            setSelect(res)
            setSelectStatus(true)
        }
        else {
            setSelectStatus(false)
        }

    }, [allField])


    //For the gender Radio option
    useEffect(() => {
        const radio = allField.find(allField => allField.type === 'radio');
        console.log(radio)

        if (radio) {
            setRadio(radio)
            setRadioStatus(true)
        }
        else {
            setRadioStatus(false)
        }

    }, [allField])




    //For updating the data
    const handleSubmit = (e) => {

        e.preventDefault();

        //updating data
        const UpdateInfo = {

            user_name: e.target.user_name.value || ''
            // user_email: e.target.user_email.value || '',
            // user_gender: e.target.user_gender.value || '',
            // details: e.target.details.value || ''
        };
        console.log(UpdateInfo)

        if (validStatus) {
            const url = `http://localhost/api/submit_form.php`;
            fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(UpdateInfo)
            })
        }


        //showing success messages
        if (validStatus) {
            fetch('http://localhost/api/submit_form.php')
                .then(res => res.json())
                .then(data => setSubmitted(data))
        }
        if (submitted.status) {
            for (let i = 0; i < submitted.messages.length; i++) {
                alert(submitted.messages[i])
            }
            e.target.reset();
        }
    }



    //For form validation
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



    var i = 0;

    return (
        <div className="container mt-5">
            <h3 className="text-center">Update</h3>

            <form onSubmit={handleSubmit}>

                {/* For the field name and field values */}
                {!radioStatus && <>
                    {allField.map(allField =>
                        <div className="form-group">
                            <label>{allField.title}</label>

                            <input
                                onBlur={handleBlur}
                                name={fieldName[i++]}
                                className={allField.html_attr.class}
                                data-something="anything, can be some json value too"
                                id={allField.html_attr.id}
                                defaultValue={allField.default}
                                placeholder={allField.title}
                                required={allField.required}
                                type={allField.type === 'select' ? 'hidden' : allField.type}
                            />
                        </div>)}
                </>}



                {/* For the field name and field values for radio type*/}
                {radioStatus && <>
                    {allField.map(allField =>
                        <div className="form-group">
                            <label>{allField.title}</label>

                            <input
                                onBlur={handleBlur}
                                name="user_gender"
                                className={allField.html_attr.class}
                                data-something="anything, can be some json value too"
                                id={allField.html_attr.id}
                                defaultValue={allField.default}
                                placeholder={allField.title}
                                required={allField.required}
                                type={allField.type === 'radio' ? 'hidden' : allField.type}
                            />
                        </div>)}
                </>}


                {/* For the Select option for gender */}
                {selectStatus &&
                    <div>
                        <select name={select.title} id={select.html_attr.id} className={select.html_attr.class} >
                            {select.options.map(option =>
                                <option value={option.key}>{option.label}</option>
                            )}
                        </select>
                    </div>
                }


                {/* For the Radio option for gender */}
                {radioStatus &&
                    <div>
                        {radio.options.map(option =>
                            <>
                                <input
                                    onBlur={handleBlur}
                                    type={radio.type}
                                    id={radio.html_attr.id}
                                    className={radio.html_attr.class}
                                    name="user_gender"
                                    value={option.key}
                                    required
                                />

                                <label>{option.label}</label>
                                <br />
                            </>
                        )}
                    </div>
                }

                <br />
                <input className="btn btn-success mb-3" type="submit" value="Submit" />

            </form>
        </div>
    );
};

export default Update;
