import React, { useEffect, useState } from 'react';


const Create = () => {

    const [validStatus, setValidStatus] = useState(false);
    const [fieldName, setFieldName] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
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
        allField.map(user=>setFieldInfo(user)) 
    }, [allField])
    console.log(fieldInfo)

    // useEffect(() => {
    //     for (let i = 0; i < userInfo.length; i++) {
    //         const element = userInfo.fieldName[i]
    //         console.log(element)
    //     }
    // }, [userInfo,fieldName])



    const handleSubmit = (e) => {
        const userInfo = {
            id: e.target.id.value,
            FullName: e.target.FullName.value
        };

        if (validStatus) {
            const url = `http://localhost/api/submit_form.php`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        alert('User added successfully')
                        e.target.reset();
                    }
                })
        }
        else {
            alert('Type only letters')
        }
        e.preventDefault();
    }


    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === "FullName") {
            isFieldValid = /^[A-Za-z]+$/.test(e.target.value);
        }
        if (isFieldValid) {
            setValidStatus(true)
        }
        else {
            setValidStatus(false)
            alert("Type only letters")
        }
    }



    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                {fieldName.map(fieldName =>
                    <div className="form-group">
                        <label>{fieldName}</label>
                        <input type="text" className="form-control w-50" id="formGroupExampleInput" placeholder={fieldInfo.title} />
                    </div>
                )}
                <br />
                {/* <div class="form-group">
                    <label for="formGroupExampleInput2">Another label</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input" />
                </div> */}

                <input className="btn btn-success mb-3" type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Create;
