import React, { useEffect, useState } from 'react';
import ListTableValue from './ListTableValue';

const ListTable = () => {

    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/list.php')
            .then(res => res.json())
            .then(data => setUserInfo([data.data]))
    }, [])


    return (
        <div>
            {
                userInfo.map(userInfo => <ListTableValue userInfo={userInfo}></ListTableValue>)
            }
        </div>
    );
};

export default ListTable;
