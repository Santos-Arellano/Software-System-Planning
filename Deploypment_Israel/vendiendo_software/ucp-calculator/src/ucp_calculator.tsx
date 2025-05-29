import React, { useState, useEffect } from 'react';
import { Calculator, Plus, Trash2, DollarSign, Clock, Users } from 'lucide-react';

const UCPCalculator = () => {
  const [useCases, setUseCases] = useState([
    { id: 1, name: 'Registrar usuario', complexity: 'simple', points: 5 },
    { id: 2, name: 'Prestar libro', complexity: 'average', points: 10 },
    { id: 3, name: 'Devolver libro', complexity: 'simple', points: 5 },
    { id: 4, name: 'Generar informe', complexity: 'complex', points: 15 }
  ]);

  const [actors, setActors] = useState([
    { id: 1, name: 'Estudiante', complexity: 'complex', points: 3 },
    { id: 2, name: 'Bibliotecario', complexity: 'average', points: 2 },
    { id: 3, name: 'Sistema', complexity: 'simple', points: 1 }
  ]);

  const [technicalFactors, setTechnicalFactors] = useState([
    { name: 'Sistema distribuido', weight: 2, value: 2 },
    { name: 'Tiempo de respuesta', weight: 1, value: 3 },
    { name: 'Eficiencia del usuario', weight: 1, value: 2 },
    { name: 'Procesamiento complejo', weight: 1, value: 1 },
    { name: 'Código reutilizable', weight: 1, value: 3 },
    { name: 'Facilidad de instalación', weight: 0.5, value: 2 },
    { name: 'Facilidad de uso', weight: 0.5, value: 3 },
    { name: 'Portabilidad', weight: 2, value: 2 }
  ]);

  const [environmentalFactors, setEnvironmentalFactors] = useState([
    { name: 'Experiencia con lenguaje', weight: 1.5, value: 4 },
    { name: 'Experiencia con UML', weight: 1, value: 2 },
    { name: 'Capacidad del equipo', weight: 0.5, value: 3 },
    { name: 'Familiaridad con dominio', weight: 0.5, value: 2 },
    { name: 'Motivación del equipo', weight: 1, value: 3 },
    { name: 'Estabilidad de requisitos', weight: 1, value: 2 },
    { name: 'Herramientas CASE', weight: 0.5, value: 1 }
  ]);

  const [productivityFactor, setProductivityFactor] = useState(20);
  const [teamSize, setTeamSize] = useState(2);
  const [hourlyRates, setHourlyRates] = useState([10000, 20000]);

  const complexityPoints = {
    simple: 5,
    average: 10,
    complex: 15
  };

  const actorPoints = {
    simple: 1,
    average: 2,
    complex: 3
  };

  // Cálculos
  const uucw = useCases.reduce((sum, uc) => sum + uc.points, 0);
  const uaw = actors.reduce((sum, actor) => sum + actor.points, 0);
  const uucp = uucw + uaw;

  const technicalSum = technicalFactors.reduce((sum, tf) => sum + (tf.weight * tf.value), 0);
  const tcf = 0.6 + (0.01 * technicalSum);

  const environmentalSum = environmentalFactors.reduce((sum, ef) => sum + (ef.weight * ef.value), 0);
  const ecf = 1.4 + (-0.03 * environmentalSum);

  const ucp = uucp * tcf * ecf;
  const totalHours = ucp * productivityFactor;
  const totalDays = totalHours / 8;
  const weeksPerPerson = totalDays / 5;
  const weeksWithTeam = weeksPerPerson / teamSize;

  // Cálculo de costos
  const monthlyCostPerPerson = hourlyRates.reduce((sum, rate) => sum + rate, 0) / teamSize;
  const totalCost = (weeksWithTeam / 4) * hourlyRates.reduce((sum, rate) => sum + rate, 0);

  const addUseCase = () => {
    const newId = Math.max(...useCases.map(uc => uc.id)) + 1;
    setUseCases([...useCases, { 
      id: newId, 
      name: `Nuevo caso de uso ${newId}`, 
      complexity: 'simple', 
      points: 5 
    }]);
  };

  const updateUseCase = (id: number, field: string, value: string | number) => {
    setUseCases(useCases.map(uc => 
      uc.id === id 
        ? { ...uc, [field]: value, points: field === 'complexity' ? complexityPoints[value] : uc.points }
        : uc
    ));
  };

  const removeUseCase = (id: number) => {
    setUseCases(useCases.filter(uc => uc.id !== id));
  };

  const addActor = () => {
    const newId = Math.max(...actors.map(a => a.id)) + 1;
    setActors([...actors, { 
      id: newId, 
      name: `Nuevo actor ${newId}`, 
      complexity: 'simple', 
      points: 1 
    }]);
  };

  const updateActor = (id: number, field: string, value: string | number) => {
    setActors(actors.map(actor => 
      actor.id === id 
        ? { ...actor, [field]: value, points: field === 'complexity' ? actorPoints[value] : actor.points }
        : actor
    ));
  };

  const removeActor = (id: number) => {
    setActors(actors.filter(a => a.id !== id));
  };

  const updateTechnicalFactor = (index: number, value: number) => {
    const newFactors = [...technicalFactors];
    newFactors[index].value = value;
    setTechnicalFactors(newFactors);
  };

  const updateEnvironmentalFactor = (index: number, value: number) => {
    const newFactors = [...environmentalFactors];
    newFactors[index].value = value;
    setEnvironmentalFactors(newFactors);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Calculadora de Use Case Points (UCP)</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Resultados principales */}
          <div className="lg:col-span-1 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Resultados
            </h2>
            <div className="space-y-3">
              <div className="bg-white/20 rounded p-3">
                <div className="text-sm opacity-90">UCP Total</div>
                <div className="text-2xl font-bold">{ucp.toFixed(2)}</div>
              </div>
              <div className="bg-white/20 rounded p-3">
                <div className="text-sm opacity-90 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Esfuerzo Total
                </div>
                <div className="text-lg font-bold">{totalHours.toFixed(0)} horas</div>
                <div className="text-sm opacity-90">{totalDays.toFixed(0)} días</div>
              </div>
              <div className="bg-white/20 rounded p-3">
                <div className="text-sm opacity-90 flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Con {teamSize} personas
                </div>
                <div className="text-lg font-bold">{weeksWithTeam.toFixed(1)} semanas</div>
              </div>
              <div className="bg-white/20 rounded p-3">
                <div className="text-sm opacity-90 flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Costo Total
                </div>
                <div className="text-xl font-bold">${totalCost.toLocaleString('es-MX')}</div>
              </div>
            </div>
          </div>

          {/* Configuración del equipo */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">Configuración del Proyecto</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tamaño del Equipo</label>
                  <input
                    type="number"
                    value={teamSize}
                    onChange={(e) => setTeamSize(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Factor de Productividad</label>
                  <input
                    type="number"
                    value={productivityFactor}
                    onChange={(e) => setProductivityFactor(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="text-xs text-gray-500 mt-1">horas por UCP</div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Salarios Mensuales</label>
                  <div className="space-y-1">
                    {hourlyRates.map((rate, index) => (
                      <input
                        key={index}
                        type="number"
                        value={rate}
                        onChange={(e) => {
                          const newRates = [...hourlyRates];
                          newRates[index] = parseInt(e.target.value);
                          setHourlyRates(newRates);
                        }}
                        className="w-full px-2 py-1 border rounded text-sm"
                        placeholder={`Persona ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Casos de Uso */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Casos de Uso</h2>
            <button
              onClick={addUseCase}
              className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Agregar
            </button>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {useCases.map((useCase) => (
              <div key={useCase.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <input
                  type="text"
                  value={useCase.name}
                  onChange={(e) => updateUseCase(useCase.id, 'name', e.target.value)}
                  className="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={useCase.complexity}
                  onChange={(e) => updateUseCase(useCase.id, 'complexity', e.target.value)}
                  className="px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="simple">Simple (5 pts)</option>
                  <option value="average">Promedio (10 pts)</option>
                  <option value="complex">Complejo (15 pts)</option>
                </select>
                <div className="w-12 text-center font-semibold text-blue-600">
                  {useCase.points}
                </div>
                <button
                  onClick={() => removeUseCase(useCase.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total UUCW:</span>
              <span className="text-blue-600">{uucw} puntos</span>
            </div>
          </div>
        </div>

        {/* Actores */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Actores</h2>
            <button
              onClick={addActor}
              className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Agregar
            </button>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {actors.map((actor) => (
              <div key={actor.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <input
                  type="text"
                  value={actor.name}
                  onChange={(e) => updateActor(actor.id, 'name', e.target.value)}
                  className="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
                />
                <select
                  value={actor.complexity}
                  onChange={(e) => updateActor(actor.id, 'complexity', e.target.value)}
                  className="px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
                >
                  <option value="simple">Simple (1 pt)</option>
                  <option value="average">Promedio (2 pts)</option>
                  <option value="complex">Complejo (3 pts)</option>
                </select>
                <div className="w-12 text-center font-semibold text-green-600">
                  {actor.points}
                </div>
                <button
                  onClick={() => removeActor(actor.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total UAW:</span>
              <span className="text-green-600">{uaw} puntos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Factores Técnicos y Ambientales */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        {/* Factores Técnicos */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Factores Técnicos</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {technicalFactors.map((factor, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{factor.name}</div>
                  <div className="text-sm text-gray-500">Peso: {factor.weight}</div>
                </div>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={factor.value}
                  onChange={(e) => updateTechnicalFactor(index, parseInt(e.target.value) || 0)}
                  className="w-16 px-2 py-1 border rounded text-center focus:ring-2 focus:ring-purple-500"
                />
                <div className="w-16 text-center font-semibold text-purple-600">
                  {(factor.weight * factor.value).toFixed(1)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between text-lg font-semibold">
              <span>TCF = 0.6 + (0.01 × {technicalSum.toFixed(1)}):</span>
              <span className="text-purple-600">{tcf.toFixed(3)}</span>
            </div>
          </div>
        </div>

        {/* Factores Ambientales */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Factores Ambientales</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {environmentalFactors.map((factor, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{factor.name}</div>
                  <div className="text-sm text-gray-500">Peso: {factor.weight}</div>
                </div>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={factor.value}
                  onChange={(e) => updateEnvironmentalFactor(index, parseInt(e.target.value) || 0)}
                  className="w-16 px-2 py-1 border rounded text-center focus:ring-2 focus:ring-orange-500"
                />
                <div className="w-16 text-center font-semibold text-orange-600">
                  {(factor.weight * factor.value).toFixed(1)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between text-lg font-semibold">
              <span>ECF = 1.4 + (-0.03 × {environmentalSum.toFixed(1)}):</span>
              <span className="text-orange-600">{ecf.toFixed(3)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desglose de Cálculos */}
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Desglose de Cálculos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">UUCP</div>
            <div className="text-lg font-semibold">{uaw} + {uucw} = {uucp}</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">UCP</div>
            <div className="text-lg font-semibold">{uucp} × {tcf.toFixed(3)} × {ecf.toFixed(3)} = {ucp.toFixed(2)}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Esfuerzo</div>
            <div className="text-lg font-semibold">{ucp.toFixed(2)} × {productivityFactor} = {totalHours.toFixed(0)}h</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Duración</div>
            <div className="text-lg font-semibold">{weeksWithTeam.toFixed(1)} semanas con {teamSize} personas</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UCPCalculator;