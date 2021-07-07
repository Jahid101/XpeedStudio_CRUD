import React, { useState } from 'react';
import ListTable from '../ListTable/ListTable';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const HomeMain = () => {

    const data = [
        {
            name: "one",
            id: "1"
        },
        {
            name: "Two",
            id: "2"
        },
        {
            name: "Three",
            id: "3"
        }, {
            name: "four",
            id: "4"
        },
        {
            name: "five",
            id: "5"
        },
    ];

    /////////////////////////////////////////////////////////
    const [list, setList] = useState(data);

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    const onEnd = (result) => {
        setList(reorder(list, result.source.index, result.destination.index));
    }

    return (
        <div>
            <h1 className="text-center mt-5">Table</h1>
            <ListTable></ListTable>



            {/* <DragDropContext onDragEnd={onEnd}>
                <Droppable droppableId="12345678">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                        >
                            {
                                list.map((item, index) => (
                                    <Draggable
                                        draggableId={item.id}
                                        key={item.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div
                                                    style={{
                                                        padding: "20px 0",
                                                        margin: "20px 20px",
                                                        background: "green"
                                                    }}
                                                >
                                                    {item.name}
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext> */}
            

        </div>
    );
};

export default HomeMain;
