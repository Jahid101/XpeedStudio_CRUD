import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ListTableValue = ({ userInfo }) => {

    const { headers, rows } = userInfo;
    const history = useHistory();

    const [tableHeader, setTableHeader] = useState([]);
    const [searchable, setSearchable] = useState([]);
    const [searchId, setSearchId] = useState([]);
    const [searchById, setSearchById] = useState([]);
    const [searchByIdStatus, setSearchByIdStatus] = useState(false);

    // const [tableRows, setTableRow] = useState([]);

    // const { id } = userRow;

    // useEffect(() => {
    //     var columnNames = Object.keys(headers[0])
    //     setTableHeader2(columnNames)
    // }, [headers])

    useEffect(() => {
        var columnName = Object.values(headers[0])
        setTableHeader(columnName)
    }, [headers])
    console.log(tableHeader)


    useEffect(() => {
        let search = tableHeader.filter(tableHeader => tableHeader.searchable === true)

        setSearchable(search);
    }, [tableHeader])
    console.log(searchable)


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


    const handleOnChange = (e) => {
        setSearchId(e.target.value)
    }

    const handleSearchClick = () => {
        const searchById = rows.filter(row => row.id == searchId)
        setSearchById(searchById)
        setSearchByIdStatus(true)
    }



    return (

        <div className="container mt-3">

            {searchable.map(search =>
                <>
                    <input className="ms-5 mb-3" placeholder={search.title} onChange={handleOnChange} type="search" name="" id="" />
                    <button onClick={handleSearchClick} className="btn btn-primary btn-mid">{search.title}</button>
                </>
            )}

            <table className="table">
                <thead>
                    <tr>
                        {
                            tableHeader.map(tableHeader =>
                                <th scope="col">{tableHeader.title}</th>
                            )}
                    </tr>
                </thead>

                {
                    rows.map(row =>
                        <tbody>
                            <tr>
                                <button onClick={() => handleOnClick(row.id)} className="btn btn-info btn-sm m-1">
                                    <td>{row.id}</td>
                                </button>
                                <td>{row.name}</td>
                                <td>{row.message}</td>
                                <td>{row.created_at}</td>
                            </tr>
                        </tbody>
                    )}
            </table>


            {/* Search By ID */}
            {searchByIdStatus && <table className="table">
                <thead>
                    <tr>
                        {
                            tableHeader.map(tableHeader =>
                                <th scope="col">{tableHeader.title}</th>
                            )}
                    </tr>
                </thead>

                {
                    searchById.map(row =>
                        <tbody>
                            <tr>
                                <button onClick={() => handleOnClick(row.id)} className="btn btn-info btn-sm m-1">
                                    <td>{row.id}</td>
                                </button>
                                <td>{row.name}</td>
                                <td>{row.message}</td>
                                <td>{row.created_at}</td>
                            </tr>
                        </tbody>
                    )}
            </table>}



        </div>
    );
};

export default ListTableValue;
