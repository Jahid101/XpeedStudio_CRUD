import React, { useEffect, useState } from 'react';

const ListTableValue = ({ user }) => {

    const [tableHeader, setTableHeader] = useState([]);

    const { id, name, message, created_at } = user;

    useEffect(() => {
        for (const property in user) {
            setTableHeader(property);
            console.log(property);
        }
    }, [])

    // useEffect(() => {
    //     for (const property in user) {
    //         setTableHeader(property);
    //         console.log(property);
    //     }
    // })


    console.log(user);

    return (

        <div class="container">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">{id.title}</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ListTableValue;
