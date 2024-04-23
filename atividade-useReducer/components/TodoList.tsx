import React, { useReducer, useState } from 'react';
import { Todo } from '../interfaces';

type Action =
  | { type: 'add'; payload: Todo }
  | { type: 'toggle'; id: number }
  | { type: 'remove'; id: number };

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'toggle':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, concluida: !todo.concluida } : todo
      );
    case 'remove':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}

export const TodoList: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, []);
  const [descricao, setDescricao] = useState('');
  const [dataConclusao, setDataConclusao] = useState('');

  const handleAdd = () => {
    const newTodo: Todo = {
      id: Date.now(),
      descricao,
      dataConclusao: new Date(dataConclusao),
      concluida: false,
    };
    dispatch({ type: 'add', payload: newTodo });
    setDescricao('');
    setDataConclusao('');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center mb-4">
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição da Tarefa"
          className="shadow appearance-none border rounded py-2 px-3 text-grey-darker mr-2 flex-grow mb-2 md:mb-0"
        />
        <input
          type="date"
          value={dataConclusao}
          onChange={(e) => setDataConclusao(e.target.value)}
          className="shadow appearance-none border rounded py-2 px-3 text-grey-darker mr-2 flex-grow mb-2 md:mb-0"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-shrink-0"
        >
          Adicionar Tarefa
        </button>
      </div>
      <ul>
        {state.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center bg-white shadow-lg rounded-lg mb-2 p-4"
          >
            <input
              type="checkbox"
              checked={todo.concluida}
              onChange={() => dispatch({ type: 'toggle', id: todo.id })}
              className="mr-4 h-5 w-5"
            />
            <span className={`flex-1 text-gray-800 ${todo.concluida ? 'line-through' : ''}`}>
              {todo.descricao} - {todo.dataConclusao.toDateString()}
            </span>
            <button
              onClick={() => dispatch({ type: 'remove', id: todo.id })}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};