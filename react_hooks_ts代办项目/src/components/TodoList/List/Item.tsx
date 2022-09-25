import React, { FC, ReactElement } from 'react';
import { ITodo } from '../typings';

interface IProps {
  todo: ITodo;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TdItem: FC<IProps> = ({
  todo,
  toggleTodo,
  removeTodo
}): ReactElement => {
  
  const { id, content, completed } = todo;

  return (
    <div className="todo-item">
      <input 
        type="checkbox"
        checked={ completed }
        onChange={ () => toggleTodo(id) }
      />
      <span
        style={ { textDecoration: completed ? 'line-through' : 'none' } }
      >{ content }</span>
      <button
        onClick={ () => removeTodo(id) }
      >删除</button>
    </div>
  );
}

export default TdItem;