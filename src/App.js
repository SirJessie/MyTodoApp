import React, { useState, useEffect } from 'react';


// Styles
import './styles/index.css';
import './styles/App.css';
import './styles/Modal.css';

function App(){
    const [openModal, setOpenModal] = useState(false);
    const [showErr, setErrorShow] = useState(false);

    const [state, setState] = useState({
        todo: '',
        todolist: [],
    });

    const [edit, setEdit] = useState({
        editTodo: '',
        editIndex: '',
        editValue: ''
    });

    const {todo, todolist} = state;
    const {editTodo, editIndex, editValue} = edit;

    //
    useEffect(()=>{
        
        const temp = localStorage.getItem("todolist");
        const loadedTodos = JSON.parse(temp);

        if(loadedTodos){
            setState({todolist: loadedTodos});
        }
    }, []);

    useEffect(()=>{
        const temp = JSON.stringify(todolist);
        localStorage.setItem("todolist", temp);
    }, [{todolist}]);// eslint-disable-line react-hooks/exhaustive-deps
    
    const handleOnchange = (e) => {
        e.preventDefault();
        const {name, value } = e.target;

        setState({...state, [name]: value})
    }

    const handleOnchangeUpdate = (e) => {
        e.preventDefault();

        const {name, value } = e.target;

        setEdit({...edit, [name]: value})
    }

    //ADD PLAN
    const addTodo = () => {
        const list = todolist;

        if(todo !== ''){
            list.push(todo);

            setState({todo: '', todolist : list});
            setErrorShow(false);
        }else{
            setErrorShow(true);
        }   
    }

    //DELETE PLAN
    const deleteTodo = (index) => {
        const list = todolist;
        list.splice(index, 1);
        
        setState({todo: '', todolist: list});
    }

    const deleteAllTodo = () => {
        todolist.splice(0, todolist.length);

        setState({todo: '', todolist: todolist});
    }

    //UPDATE PLAN
    const updateTodo = (index) => {
        const list = todolist;
        list[index] = editTodo;
        
        setState({...state, todolist: list});
        setEdit({...edit, editTodo: ''})
        setOpenModal(false)
    }

    return(
        <>
            <div className='content-wrapper'>
                <div className='title-bar'>MY-TODO.</div>
                <div className='card'>
                    <div className='card-dialog'>
                        <div className='card-header'>
                            <div class='card-title'>
                                <span>What's your plan today?</span>
                            </div>
                            <div className='card-input'>
                                <input type='text'
                                name='todo'
                                placeholder='Add to do'
                                value={todo}
                                onChange={handleOnchange}
                                />
                                <button className='btn btn-add'
                                onClick={addTodo}
                                >Add</button>
                            </div>
                            {showErr ?
                                <div className='errorMsg'>
                                    Please input value
                                </div> :''
                            }
                        </div>
                        <div className='card-body'>
                            {
                                todolist.length ?
                                    todolist.map((value, index) => {
                                        return(
                                            <div className='card-item' key={index}>
                                                <span className='item-text'>{value}</span>
                                                <div className='item-icons'>
                                                    <i 
                                                        className="fa-solid fa-pen-to-square icon" 
                                                        onClick={() =>{
                                                            setOpenModal(true);
                                                            setEdit({...edit, editIndex: index, editValue: value});
                                                        }}
                                                    ></i>
                                                    <i className="fa-solid fa-trash icon"
                                                    onClick={() => deleteTodo(index)}></i>
                                                </div>
                                            </div>
                                        )
                                }): ''
                            }
                            
                        </div>
                        {
                            todolist.length > 1 ?
                                <div className='card-footer'>
                                    <button
                                    className='btn btn-deleteAll'
                                    onClick={deleteAllTodo}>Delete All</button>
                                </div>: ''
                        }
                        
                    </div>
                </div>
                {/* Modal */}
                {openModal ?
                <div className='modal-wrapper'>
                    <div className='modal'>
                        <div className="modal-close">
                            <i className="fa-solid fa-xmark icon" onClick={() => setOpenModal(false)}></i>
                        </div>
                        <div className='modal-value'>
                            <b>Current Value: </b><span>{editValue}</span>
                        </div>
                        <div className='modal-input'>
                            <input type='text'
                            name='editTodo'
                            placeholder='Edit to do'
                            value={editTodo}
                            onChange={handleOnchangeUpdate}/>
                            <button className='btn btn-save'
                            onClick={() => updateTodo(editIndex)}>Save</button>
                        </div>
                    </div>
                </div>
                :''}
            </div>
        </>
    )
}

export default App;