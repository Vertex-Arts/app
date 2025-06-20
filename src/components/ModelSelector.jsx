import React from 'react';
export default function ModelSelector({ shapes, selected, onSelect }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Modelos</h2>
      <div className="grid grid-cols-4 gap-4 justify-items-center justify-center">
        {shapes.map(s => (
          <div
            key={s.id}
            className={`cursor-pointer w-24 h-28 p-1 rounded border-2 ${
              selected === s.id ? 'border-blue-500' : 'border-gray-300'
            } flex flex-col items-center`}
            onClick={() => onSelect(s.id)}
          >
            <img
              src={s.thumbnail}
              alt={s.name}
              className="w-full h-20 object-cover rounded"
            />
            <p className="text-center text-sm mt-1">{s.name}</p>
          </div>
        ))}
      </div>
    </div>
); }