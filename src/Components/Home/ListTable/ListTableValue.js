import React, { useEffect, useState } from 'react';

const ListTableValue = ({ userHeader }) => {

    const { headers, rows } = userHeader;

    const [tableHeader, setTableHeader] = useState([]);
    const [tableRows, setTableRow] = useState([]);

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
                                <td>{row.id}</td>
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