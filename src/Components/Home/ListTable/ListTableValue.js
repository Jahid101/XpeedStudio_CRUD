import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ListTableValue = ({ userInfo }) => {

    const { headers, rows } = userInfo;
    const history = useHistory();

    const [tableHeader, setTableHeader] = useState([]);
    const [tableRows, setTableRows] = useState([]);
    const [searchable, setSearchable] = useState([]);
    const [searchValue, setSearchValue] = useState([]);
    const [searchById, setSearchById] = useState([]);
    const [searchByIdStatus, setSearchByIdStatus] = useState(false);
    const [searchByName, setSearchByName] = useState([]);
    const [searchByNameStatus, setSearchByNameStatus] = useState(false);
    const [searchByDate, setSearchByDate] = useState([]);
    const [searchByDateStatus, setSearchByDateStatus] = useState(false);
    const [allDataShowStatus, setAllDataShowStatus] = useState(true);

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

    var abc = [];
    useEffect(() => {
        for (let i = 0; i < rows.length; i++) {

            var columnName = Object.keys(rows[i])
            // abc.push(columnName)
            setTableRows(columnName)
            console.log(columnName)
        }
    }, [])
    console.log(abc)
    console.log(tableRows)
    console.log(rows)


    const handleOnClick = (id) => {
        history.push(`/update/${id}`);
        console.log(`/update/${id}`)
    }


    const handleOnBlur = (e) => {
        setSearchValue(e.target.value)
    }


    const handleSearchClick = (title) => {
        if (title === 'ID') {
            const search = rows.filter(row => row.id == searchValue)
            setSearchById(search)
            setSearchByIdStatus(true)
            setSearchByNameStatus(false)
            setSearchByDateStatus(false)
            setAllDataShowStatus(false)
            console.log('id')
        }
        if (title === 'Name') {
            const search = rows.filter(row => row.name == searchValue)
            setSearchByName(search)
            setSearchByNameStatus(true)
            setSearchByIdStatus(false)
            setSearchByDateStatus(false)
            setAllDataShowStatus(false)
        }
        if (title === 'Submision Date') {
            const search = rows.filter(row => row.created_at == searchValue)
            setSearchByDate(search)
            setSearchByDateStatus(true)
            setSearchByNameStatus(false)
            setSearchByIdStatus(false)
            setAllDataShowStatus(false)
        }
    }


    const handleClickShowAllButton = () => {
        setAllDataShowStatus(true)
        setSearchByDateStatus(false)
        setSearchByNameStatus(false)
        setSearchByIdStatus(false)
    }



    return (

        <div className="container mt-3">
            {!allDataShowStatus && <button onClick={handleClickShowAllButton} style={{ marginLeft: '91%' }} className="btn btn-info">Show all</button>}
            <br />

            {searchable.map(search =>
                <>
                    <input className="ms-5 mb-3" placeholder={search.title} onBlur={handleOnBlur} type="search" name="" id="" />
                    <button onClick={() => handleSearchClick(search.title)} className="btn btn-primary btn-mid">{search.title}</button>
                </>
            )}

            {allDataShowStatus ? <table className="table">
                <thead>
                    <tr>
                        {
                            tableHeader.map(tableHeader =>
                                <th scope="col">{tableHeader.title}</th>
                            )}
                    </tr>
                </thead>

                {rows.map(row =>
                    <tbody>
                        <tr>
                            <button onClick={() => handleOnClick(row.id)} className="btn btn-info btn-sm m-1">
                                <td>{row.id}</td>
                            </button>
                            <td>{row.name}</td>
                            <td>{row.message}</td>
                            <td>{row.created_at}</td>
                            <td>{row.extra_junk_field}</td>
                        </tr>
                    </tbody>
                )}



                {/* <tbody>
                    <tr>
                        {rows.map(row =>
                            <td>{row[1]}</td>
                        )}
                    </tr>
                </tbody> */}

            </table> : ''}


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
                                <td>{row.extra_junk_field}</td>
                            </tr>
                        </tbody>
                    )}
            </table>}



            {/* Search By Name */}
            {searchByNameStatus && <table className="table">
                <thead>
                    <tr>
                        {
                            tableHeader.map(tableHeader =>
                                <th scope="col">{tableHeader.title}</th>
                            )}
                    </tr>
                </thead>

                {
                    searchByName.map(row =>
                        <tbody>
                            <tr>
                                <button onClick={() => handleOnClick(row.id)} className="btn btn-info btn-sm m-1">
                                    <td>{row.id}</td>
                                </button>
                                <td>{row.name}</td>
                                <td>{row.message}</td>
                                <td>{row.created_at}</td>
                                <td>{row.extra_junk_field}</td>
                            </tr>
                        </tbody>
                    )}
            </table>}



            {/* Search By Submission Date */}
            {searchByDateStatus && <table className="table">
                <thead>
                    <tr>
                        {
                            tableHeader.map(tableHeader =>
                                <th scope="col">{tableHeader.title}</th>
                            )}
                    </tr>
                </thead>

                {
                    searchByDate.map(row =>
                        <tbody>
                            <tr>
                                <button onClick={() => handleOnClick(row.id)} className="btn btn-info btn-sm m-1">
                                    <td>{row.id}</td>
                                </button>
                                <td>{row.name}</td>
                                <td>{row.message}</td>
                                <td>{row.created_at}</td>
                                <td>{row.extra_junk_field}</td>
                            </tr>
                        </tbody>
                    )}
            </table>}


        </div>
    );
};

export default ListTableValue;
