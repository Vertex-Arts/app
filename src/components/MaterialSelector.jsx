import React from 'react';
export default function MaterialSelector({ materials, selected, onSelect }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Materiales</h2>
      <div className="grid grid-cols-5 gap-2 mt-2 justify-items-center">
        {materials.map(m => (
          <div
            key={m.id}
            className={`cursor-pointer w-20 h-24 p-1 rounded border-2 ${
              selected === m.id ? 'border-blue-500' : 'border-gray-300'
            } flex flex-col items-center`}
            onClick={() => onSelect(m.id)}
          >
            <img
              src={m.thumbnail}
              alt={m.name}
              className="w-full h-16 object-cover rounded"
            />
            <p className="text-center text-xs mt-1">{m.name}</p>
          </div>
        ))}
      </div>
    </div>
); }