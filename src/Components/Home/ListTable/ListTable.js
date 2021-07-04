import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListTableValue from './ListTableValue';

const ListTable = () => {

    const [userHeader, setUserHeader] = useState([]);
    const [userRow, setUserRow] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/list.php')
            .then(res => res.json())
            .then(data => setUserHeader([data.data]))
    }, [])
    // console.log(userHeader);

    useEffect(() => {
        fetch('http://localhost/api/list.php')
            .then(res => res.json())
            .then(data => setUserRow(data.data.rows))
    }, []);
    // console.log(userRow);


    return (
        <div>
            {
                userHeader.map(userHeader => <ListTableValue userHeader={userHeader}></ListTableValue>)
            }
            {/* {
                userRow.map(userRow => <ListTableValue userRow={userRow}></ListTableValue>)
            } */}
        </div>
    );
};

export default ListTable;
