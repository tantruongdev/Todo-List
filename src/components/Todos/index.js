import React, { useState, useRef } from "react";
import "./Todos.css";

function Todos() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = () => {
    if (todo.trim()) {
      setTodos((prevTodos) => [
        ...prevTodos,
        { text: todo.trim(), completed: false },
      ]);
      setTodo("");
    }
    inputRef.current.focus();
  };

  const handleCompleted = (index) => {
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos];
      newTodos[index] = {
        ...newTodos[index],
        completed: !newTodos[index].completed,
      };
      return newTodos;
    });
  };

  const handleDelete = (index) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="todos__container">
      <div className="todos__input">
        <input
          ref={inputRef}
          value={todo}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="todos__input-field"
          placeholder="Add todo..."
        />
        <button onClick={handleSubmit} className="todos__input-btn">
          Add
        </button>
      </div>
      <h1>ToDo List</h1>
      <ul className="todos__list">
        {todos.map((item, index) => (
          <div key={index} className="todos__item">
            <div className="todos__content">
              <span>{`${index + 1}.`}&nbsp;</span>
              <li
                className={`todos__item-text ${
                  item.completed ? "todos__item-text--completed" : ""
                }`}
              >
                {item.text}
              </li>
            </div>
            <div className="todos__manipulate">
              <button
                onClick={() => handleCompleted(index)}
                className="todos__item-btn"
              >
                {item.completed ? "Mark Incomplete" : "Mark Complete"}
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="todos__item-btn todos__item-btn--delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
