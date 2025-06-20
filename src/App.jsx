import React, { useState } from 'react';
import { shapes, materials } from './data/index.js';
import ModelSelector from './components/ModelSelector.jsx';
import MaterialSelector from './components/MaterialSelector.jsx';
import Viewer from './components/Viewer.jsx';

export default function App() {
  const [shape, setShape] = useState(null);
  const [material, setMaterial] = useState(materials[0].id);
  const [lighting, setLighting] = useState('artificial');
  const features = materials.find(m => m.id === material)?.features || [];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pb-20">
      <header className="w-full bg-white py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-40 mr-6"/>
            <h1 className="text-5xl font-extrabold text-gray-800" style={{fontFamily: 'Chilled, cursive'}}>Vertex Arts</h1>
          </div>
          <div className="text-right text-sm text-gray-600">
            <p>projectartanddesign3d@gmail.com</p>
            <p>608632843</p>
          </div>
        </div>
      </header>
      <p className="text-center text-xl italic text-gray-700">“Versatilidad a tu medida y diseño exclusivo para tu espacio”</p>
      <main className="container mx-auto flex md:flex-row flex-col items-start py-8 gap-8 h-[80vh]">
        <div className="md:w-1/2 w-full rounded-lg overflow-hidden shadow-lg bg-white h-full">
          <Viewer shape={shape} material={material} lighting={lighting}/>
        </div>
        <aside className="md:w-1/2 w-full flex flex-col gap-6 h-full">
          <div className="bg-white p-4 rounded-lg shadow flex-1">
            <ModelSelector shapes={shapes} selected={shape} onSelect={setShape}/>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex-1">
            <MaterialSelector materials={materials} selected={material} onSelect={setMaterial}/>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex-1">
            <h2 className="text-lg font-semibold mb-2">Iluminación</h2>
            <div className="flex flex-wrap gap-2">
  <button onClick={() => setLighting('artificial')} className="px-4 py-2 bg-gray-300 rounded">
    Artificial
  </button>
  <button onClick={() => setLighting('solar')} className="px-4 py-2 bg-gray-300 rounded">
    Solar
  </button>
  <button onClick={() => setLighting('balcon')} className="px-4 py-2 bg-gray-300 rounded">
    balcón.hdr
  </button>
  <button onClick={() => setLighting('exterior')} className="px-4 py-2 bg-gray-300 rounded">
    exterior.hdr
  </button>
  <button onClick={() => setLighting('hdri1')} className="px-4 py-2 bg-gray-300 rounded">
    HDRI Estudio
  </button>
  <button onClick={() => setLighting('hdri2')} className="px-4 py-2 bg-gray-300 rounded">
    HDRI Garaje
  </button>
</div>
          </div>
        </aside>
      </main>
      <footer className="w-full bg-white py-2 text-center text-sm text-gray-600">
        Los resultados son aproximados y con materiales de muestra
      </footer>
    </div>
);
}