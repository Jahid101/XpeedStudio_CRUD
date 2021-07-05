import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ListTableValue = ({ userInfo }) => {

    const { headers, rows } = userInfo;
    const history = useHistory();

    const [tableHeader, setTableHeader] = useState([]);
    // const [tableRows, setTableRow] = useState([]);

    // const { id } = userRow;

    useEffect(() => {
        var columnNames = Object.keys(headers[0])
        setTableHeader(columnNames)
    }, [headers])

    // useEffect(() => {
    //     rows.map(row =>
    //         setTableRow(row)
    //     )
    // }, [rows])

    console.log(rows)


    const handleOnClick = (id) => {
        history.push(`/update/${id}`);
        console.log(`/update/${id}`)
    }


    return (

        <div className="container">
            <table className="table">

                <thead>
                    <tr>
                        {
                            tableHeader.map(tableHeader =>
                                <th scope="col">{tableHeader}</th>
                            )}
                    </tr>
                </thead>

                {
                    rows.map(row =>
                        <tbody>
                            <tr>
                                <button onClick={() => handleOnClick(row.id)} className="btn btn-info btn-sm">
                                    <td>{row.id}</td>
                                </button>
                                <td>{row.name}</td>
                                <td>{row.message}</td>
                                <td>{row.created_at}</td>
                            </tr>
                        </tbody>
                    )}
            </table>
        </div>
    );
};

export default ListTableValue;
