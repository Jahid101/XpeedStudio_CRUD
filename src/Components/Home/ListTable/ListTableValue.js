import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ListTableValue = ({ userInfo }) => {

    const { headers, rows } = userInfo;
    const history = useHistory();

    const [tableHeader, setTableHeader] = useState([]);
    const [hidden, setHidden] = useState([]);
    const [row, setRow] = useState([]);
    const [searchable, setSearchable] = useState([]);
    const [searchValue, setSearchValue] = useState([]);
    const [searchById, setSearchById] = useState([]);
    const [searchByIdStatus, setSearchByIdStatus] = useState(false);
    const [searchByName, setSearchByName] = useState([]);
    const [searchByNameStatus, setSearchByNameStatus] = useState(false);
    const [searchByDate, setSearchByDate] = useState([]);
    const [searchByDateStatus, setSearchByDateStatus] = useState(false);
    const [allDataShowStatus, setAllDataShowStatus] = useState(true);


    useEffect(() => {
        var columnName = Object.values(headers[0])
        setTableHeader(columnName)
    }, [headers])
    console.log(tableHeader)


    useEffect(() => {
        let hidden = tableHeader.filter(tableHeader => tableHeader.hidden === false)

        setHidden(hidden);
    }, [tableHeader])
    console.log(hidden)


    useEffect(() => {
        let search = hidden.filter(hidden => hidden.searchable === true)

        setSearchable(search);
    }, [hidden])
    console.log(searchable)


    // useEffect(() => {
    //     var columnName = Object.values(rows)
    //     columnName.map(column =>setRow(column))
    //     // setRow(columnName)
    // }, [rows])

    console.log(rows)


    const handleOnClick = (id) => {
        history.push(`/update/${id}`)
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


    const onEnd = (result) => {
        console.log(result)
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


            {allDataShowStatus ?

                <table className="table">
                    <thead>
                        <tr>
                            {
                                hidden.map(hidden =>
                                    <th scope="col">{hidden.title}</th>
                                )}
                        </tr>
                    </thead>


                    <tbody>
                        {/* <DragDropContext onDragEnd={onEnd}>
                            <Droppable droppableId="123456789"
                            >
                                {(provided, snapshot) = (
                                    <div ref={provided.innerRef}> */}



                        {rows.map((row, index) =>
                            // <Draggable
                            //     draggableId={row.id}
                            //     key={row.id}
                            //     index={index}
                            // >
                            //     {(provided, snapshot) => (
                            //         <div
                            //             ref={provided.innerRef}
                            //             {...provided.draggableProps}
                            //             {...provided.dragHandleProps}
                            //         >
                            <tr>
                                <button onClick={() => handleOnClick(row.id)} className="btn btn-info btn-sm m-1">
                                    <td>{row.id}</td>
                                </button>
                                <td>{row.name}</td>
                                <td>{row.message}</td>
                                <td>{row.created_at}</td>
                                <td>{row.extra_junk_field}</td>
                                {/* <td>{row}</td> */}
                            </tr>
                            // </div>
                        )}
                        {/* </Draggable> */}
                        {/* )}

                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext> */}
                    </tbody>


                </table>

                : ''}


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
