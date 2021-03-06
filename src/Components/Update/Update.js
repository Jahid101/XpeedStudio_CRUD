import React, { useEffect, useState } from 'react';
import spin from '../../images/spinner.gif';
import { useParams } from 'react-router-dom';


const Update = () => {

    //All hooks
    const [validStatus, setValidStatus] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [selectStatus, setSelectStatus] = useState(false);
    const [radioStatus, setRadioStatus] = useState(false);
    const [repeaterStatus, setRepeaterStatus] = useState(false);
    const [showRepeaterOption, setShowRepeaterOption] = useState(false);
    const [repeater, setRepeater] = useState([]);
    const [repeaterOption, setRepeaterOption] = useState([]);
    const [repeaterOptionValues, setRepeaterOptionValues] = useState([]);
    const [fieldName, setFieldName] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [radio, setRadio] = useState([]);
    const [submitted, setSubmitted] = useState([]);
    const [allField, setAllField] = useState([]);
    const [select, setSelect] = useState([]);
    const { id } = useParams();
    const [genderValue, setGenderValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [detailsValue, setDetailsValue] = useState('');
    const [desgValue, setDesgValue] = useState('');
    const [workPlaceValue, setWorkPlaceValue] = useState('');


    //For fetching the Api 
    useEffect(() => {
        fetch(`http://localhost/api/get_form.php?id=${id}`)
            .then(res => res.json())
            .then(data => setUserInfo(data.data.fields[0]))
    }, [id])


    //For the name of field
    useEffect(() => {
        var fieldName = Object.keys(userInfo)
        setFieldName(fieldName)
    }, [userInfo])


    //For the values of field data
    useEffect(() => {
        var fieldData = Object.values(userInfo)
        setAllField(fieldData)
    }, [userInfo])


    // For Repeater Fields
    useEffect(() => {
        repeater.map(repeater => setRepeaterOption(Object.values(repeater)[2]))

        var data = Object.values(repeaterOption)
        setRepeaterOptionValues(data)
    }, [repeater, repeaterOption])


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

        if (radio) {
            setRadio(radio)
            setRadioStatus(true)
        }
        else {
            setRadioStatus(false)
        }

    }, [allField])



    //For the work type Repeater
    useEffect(() => {
        const repeater = allField.filter(allField => allField.type === 'repeater');
        console.log(repeater)
        const repeater2 = allField.find(allField => allField.type === 'repeater');

        if (repeater2) {
            setRepeater(repeater)
            setRepeaterStatus(true)
        }
        else {
            setRepeaterStatus(false)
        }

    }, [allField])



    //Getting success messages
    useEffect(() => {
        fetch('http://localhost/api/submit_form.php')
            .then(res => res.json())
            .then(data => setSubmitted(data))
    }, [])


    //For updating the data
    const handleSubmit = (e) => {

        e.preventDefault();

        //updating data
        const UpdateInfo = {
            user_name: nameValue,
            user_email: emailValue,
            details: detailsValue,
            user_gender: genderValue,
            designation: desgValue,
            work_place: workPlaceValue
        };

        if (validStatus) {
            const url = `http://localhost/api/submit_form.php`;
            fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(UpdateInfo)
            })
            setSpinner(true)
        }


        //Showing success messages
        if (submitted.status) {
            for (let i = 0; i < submitted.messages.length; i++) {
                setTimeout(function () { alert(submitted.messages[i]); }, 1000);
            }
            e.target.reset();
            setTimeout(function () { setSpinner(false); }, 1000)
        }
    }



    //For form validation
    const handleBlur = (e) => {
        setGenderValue(e.target.value)
        let isFieldValid = true;
        if (e.target.name === "user_name") {
            isFieldValid = /^[A-Za-z ]+$/.test(e.target.value);
            setNameValue(e.target.value || '')
        }
        if (e.target.name === "user_email") {
            setEmailValue(e.target.value || '')
        }
        if (e.target.name === "details") {
            setDetailsValue(e.target.value || '')
        }
        if (e.target.name === "designation") {
            setDesgValue(e.target.value || '')
        }
        if (e.target.name === "work_place") {
            setWorkPlaceValue(e.target.value || '')
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



    //For work repeating option
    const handleWorkButton = () => {
        setShowRepeaterOption(true)
    }


    //For work repeating option
    const handleWorkPlusButton = (j) => {
        document.getElementById(`repeat${j}`).innerHTML = document.getElementById('repeat1').innerHTML;
    }



    var i = 0;
    var j = 2;

    return (

        <div className="container mt-5">
            <h3 className="text-center">Update</h3>

            <form onSubmit={handleSubmit}>

                {/* For the field name and field values */}
                {!radioStatus && <>
                    {!repeaterStatus && <>
                        {allField.map(allField =>
                            <div className="form-group">
                                <label>{allField.title}</label>

                                <input
                                    onBlur={handleBlur}
                                    autoFocus
                                    name={fieldName[i++]}
                                    className={allField.html_attr.class}
                                    data-something="anything, can be some json value too"
                                    id={allField.html_attr.id}
                                    defaultValue={allField.value}
                                    placeholder={allField.title}
                                    required={allField.required}
                                    type={allField.type === 'select' ? 'hidden' : allField.type}
                                />
                            </div>)}
                    </>}
                </>}



                {/* For the field name and field values for radio type*/}
                {!repeaterStatus && <>
                    {radioStatus && <>
                        {allField.map(allField =>
                            <div className="form-group">
                                <label>{allField.title}</label>

                                <input
                                    autoFocus
                                    onBlur={handleBlur}
                                    name="user_gender"
                                    className={allField.html_attr.class}
                                    data-something="anything, can be some json value too"
                                    id={allField.html_attr.id}
                                    defaultValue={allField.value}
                                    placeholder={allField.title}
                                    required={allField.required}
                                    type={allField.type === 'radio' ? 'hidden' : allField.type}
                                />
                            </div>)}
                    </>}
                </>}



                {/* For the field name and field values for repeater type*/}
                {repeaterStatus && <>

                    {allField.map(allField =>
                        <div className="form-group">
                            <label>{allField.title}</label>

                            <input
                                onBlur={handleBlur}
                                autoFocus
                                name="user_hobby"
                                className={allField.html_attr.class}
                                data-something="anything, can be some json value too"
                                id={allField.html_attr.id}
                                defaultValue={allField.value}
                                placeholder={allField.title}
                                required={allField.required}
                                type={allField.type === 'repeater' ? 'hidden' : allField.type}
                            />

                        </div>)}

                    <p onClick={handleWorkButton} className="btn bg-info">Work +</p>

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
                                    autoFocus
                                    onBlur={handleBlur}
                                    type={radio.type}
                                    id={radio.html_attr.id}
                                    className={radio.html_attr.class}
                                    defaultValue={allField.value}
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


                {/* For work values */}
                {repeaterStatus && <>

                    {repeater[0].value.map(allField =>
                        <div className="form-group">
                            <label>designation</label>
                            <input
                                onBlur={handleBlur}
                                autoFocus
                                defaultValue={allField.designation}
                            />

                            <label>work_place</label>
                            <input
                                onBlur={handleBlur}
                                autoFocus
                                defaultValue={allField.work_place}
                            />

                        </div>)}
                </>}



                {/* For work repeater options  */}
                {showRepeaterOption && <>
                    {repeaterStatus && <>
                        <br />

                        <p onClick={() => handleWorkPlusButton(j++)} className="btn bg-info"> + </p>

                        <div id="repeat1">

                            {repeaterOptionValues.map(allField =>
                                <div className="form-group">
                                    <br />
                                    <label>{allField.title}</label>
                                    <input
                                        onBlur={handleBlur}
                                        name={allField.title}
                                        autoFocus
                                        type={allField.type}
                                        placeholder={allField.title}
                                        required={allField.required}
                                    />
                                </div>

                            )}<hr />
                        </div>

                    </>}
                </>}

                <div id="repeat2"></div>
                <div id="repeat3"></div>
                <div id="repeat4"></div>
                <div id="repeat5"></div>
                <div id="repeat6"></div>
                <div id="repeat7"></div>
                <div id="repeat8"></div>
                <div id="repeat9"></div>
                <div id="repeat10"></div>
                <div id="repeat11"></div>
                <div id="repeat12"></div>
                <div id="repeat13"></div>
                <div id="repeat14"></div>
                <div id="repeat15"></div>

                <br />

                {!spinner ?
                    <input className="btn btn-success mb-5" type="submit" value="Submit" />
                    :
                    <img style={{ height: '100px' }} src={spin} alt="" />
                }

            </form>
        </div>
    );
};

export default Update;
