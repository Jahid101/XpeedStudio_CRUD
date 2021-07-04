import React, { useEffect, useState } from 'react';

const ListTable = () => {

    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/get_form.php')
            .then(res => res.json())
            .then(data => setUser(data))
    }, [])
    console.log(user)

    return (
        <div>

        </div>
    );
};

export default ListTable;
