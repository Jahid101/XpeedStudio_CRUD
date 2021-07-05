import React, { useEffect, useState } from 'react';
import ListTableValue from './ListTableValue';

const ListTable = () => {

    const [userInfo, setUserInfo] = useState([]);

    // const [userRow, setUserRow] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/list.php')
            .then(res => res.json())
            .then(data => setUserInfo([data.data]))
    }, [])
    // console.log(userHeader);

    // useEffect(() => {
    //     fetch('http://localhost/api/list.php')
    //         .then(res => res.json())
    //         .then(data => setUserRow(data.data.rows))
    // }, []);
    // console.log(userRow);


    return (
        <div>
            {
                userInfo.map(userInfo => <ListTableValue userInfo={userInfo}></ListTableValue>)
            }
            {/* {
                userRow.map(userRow => <ListTableValue userRow={userRow}></ListTableValue>)
            } */}
        </div>
    );
};

export default ListTable;
