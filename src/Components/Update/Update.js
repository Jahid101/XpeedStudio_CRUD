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



    useEffect(() => {
        fetch(`http://localhost/api/get_form.php?id=${id}`)
            .then(res => res.json())
            .then(data => setUserInfo(data.data.fields[0]))
    }, [id])
    console.log(userInfo)

    return (
        <div>
            <h3 className="text-center">Update</h3>
        </div>
    );
};

export default Update;
