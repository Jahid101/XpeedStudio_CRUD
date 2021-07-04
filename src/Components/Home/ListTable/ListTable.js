import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListTableValue from './ListTableValue';

const ListTable = () => {

    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/list.php')
            .then(res => res.json())
            .then(data => setUser(data.data.headers))
    }, [])
    // user.map(us => console.log(us))
    console.log(user);

    // useEffect(() => {
    //     const load = async () => {
    //         const data = await axios.get('http://localhost/api/list.php')
    //         setUser(data);
    //         // console.log(data.data.data.rows);
    //     }
    //     load();
    // }, []);
    // console.log(user.data.data);


    return (
        <div>
            {
                user.map(user => <ListTableValue user={user}></ListTableValue>)
            }
        </div>
    );
};

export default ListTable;
