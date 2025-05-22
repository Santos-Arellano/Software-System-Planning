import React, { useState, useEffect } from 'react';
import { AlertCircle, Clock, TrendingUp, CheckCircle } from 'lucide-react';

const CPMPERTCalculator = () => {
  const [activities, setActivities] = useState([
    { id: 'A', name: 'Análisis de requisitos de seguridad', predecessors: [], o: 2, m: 3, p: 5 },
    { id: 'B', name: 'Diseño del flujo de autenticación', predecessors: ['A'], o: 2, m: 3, p: 4 },
    { id: 'C', name: 'Implementación del backend de autenticación', predecessors: ['B'], o: 3, m: 5, p: 8 },
    { id: 'D', name: 'Configuración de la base de datos segura', predecessors: ['A'], o: 2, m: 3, p: 5 },
    { id: 'E', name: 'Integración con proveedor de autenticación', predecessors: ['B'], o: 1, m: 2, p: 4 },
    { id: 'F', name: 'Desarrollo de interfaz de login/registro', predecessors: ['B'], o: 2, m: 3, p: 5 },
    { id: 'G', name: 'Pruebas de seguridad y revisión final', predecessors: ['C', 'D', 'E', 'F'], o: 3, m: 4, p: 6 }
  ]);

  const [results, setResults] = useState({});
  const [criticalPath, setCriticalPath] = useState([]);
  const [projectDuration, setProjectDuration] = useState(0);

  // Calcular duración esperada PERT
  const calculatePERTDuration = (o, m, p) => {
    return (o + 4 * m + p) / 6;
  };

  // Calcular varianza PERT
  const calculatePERTVariance = (o, p) => {
    return Math.pow((p - o) / 6, 2);
  };

  // Calcular CPM y PERT
  useEffect(() => {
    const calculateSchedule = () => {
      const activityResults = {};
      
      // Calcular duración PERT para cada actividad
      activities.forEach(activity => {
        const pertDuration = calculatePERTDuration(activity.o, activity.m, activity.p);
        const pertVariance = calculatePERTVariance(activity.o, activity.p);
        
        activityResults[activity.id] = {
          ...activity,
          pertDuration: Math.round(pertDuration * 100) / 100,
          pertVariance: Math.round(pertVariance * 100) / 100,
          cpmDuration: activity.m, // Para CPM usamos el tiempo más probable
          es: 0,
          ef: 0,
          ls: 0,
          lf: 0,
          slack: 0
        };
      });

      // Calcular ES y EF (Forward Pass)
      const calculateForwardPass = () => {
        activities.forEach(activity => {
          if (activity.predecessors.length === 0) {
            activityResults[activity.id].es = 0;
          } else {
            let maxEF = 0;
            activity.predecessors.forEach(pred => {
              maxEF = Math.max(maxEF, activityResults[pred].ef);
            });
            activityResults[activity.id].es = maxEF;
          }
          activityResults[activity.id].ef = activityResults[activity.id].es + activityResults[activity.id].cmpDuration;
        });
      };

      // Usar duración PERT para los cálculos
      activities.forEach(activity => {
        activityResults[activity.id].cmpDuration = activityResults[activity.id].pertDuration;
      });

      calculateForwardPass();

      // Encontrar la duración total del proyecto
      let maxEF = 0;
      activities.forEach(activity => {
        maxEF = Math.max(maxEF, activityResults[activity.id].ef);
      });

      // Calcular LS y LF (Backward Pass)
      const calculateBackwardPass = () => {
        // Ordenar actividades en orden reverso de dependencias
        const reverseOrder = [...activities].reverse();
        
        reverseOrder.forEach(activity => {
          // Encontrar actividades que tienen esta como predecesora
          const successors = activities.filter(act => 
            act.predecessors.includes(activity.id)
          );

          if (successors.length === 0) {
            // Si no tiene sucesores, LF = EF del proyecto
            activityResults[activity.id].lf = maxEF;
          } else {
            let minLS = Infinity;
            successors.forEach(succ => {
              minLS = Math.min(minLS, activityResults[succ.id].ls);
            });
            activityResults[activity.id].lf = minLS;
          }
          
          activityResults[activity.id].ls = activityResults[activity.id].lf - activityResults[activity.id].cmpDuration;
          activityResults[activity.id].slack = activityResults[activity.id].lf - activityResults[activity.id].ef;
        });
      };

      calculateBackwardPass();

      // Encontrar ruta crítica
      const critical = [];
      activities.forEach(activity => {
        if (Math.abs(activityResults[activity.id].slack) < 0.01) {
          critical.push(activity.id);
        }
      });

      setResults(activityResults);
      setCriticalPath(critical);
      setProjectDuration(Math.round(maxEF * 100) / 100);
    };

    calculateSchedule();
  }, [activities]);

  const formatNumber = (num) => {
    return Math.round(num * 100) / 100;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Método CPM y PERT</h1>
        <p className="text-lg text-gray-600">Proyecto: Sistema de Autenticación Segura</p>
      </div>

      {/* Resumen del Proyecto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-blue-900">Duración Total</h3>
          </div>
          <p className="text-2xl font-bold text-blue-800">{projectDuration} días</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <h3 className="font-semibold text-red-900">Actividades Críticas</h3>
          </div>
          <p className="text-2xl font-bold text-red-800">{criticalPath.length}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-green-900">Total Actividades</h3>
          </div>
          <p className="text-2xl font-bold text-green-800">{activities.length}</p>
        </div>
      </div>

      {/* Tabla de Resultados */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Análisis CPM y PERT</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2 text-left">Act.</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Descripción</th>
                <th className="border border-gray-300 px-3 py-2 text-center">Pred.</th>
                <th className="border border-gray-300 px-3 py-2 text-center">O</th>
                <th className="border border-gray-300 px-3 py-2 text-center">M</th>
                <th className="border border-gray-300 px-3 py-2 text-center">P</th>
                <th className="border border-gray-300 px-3 py-2 text-center">PERT (días)</th>
                <th className="border border-gray-300 px-3 py-2 text-center">ES</th>
                <th className="border border-gray-300 px-3 py-2 text-center">EF</th>
                <th className="border border-gray-300 px-3 py-2 text-center">LS</th>
                <th className="border border-gray-300 px-3 py-2 text-center">LF</th>
                <th className="border border-gray-300 px-3 py-2 text-center">Holgura</th>
                <th className="border border-gray-300 px-3 py-2 text-center">Crítica</th>
              </tr>
            </thead>
            <tbody>
              {activities.map(activity => {
                const result = results[activity.id];
                const isCritical = criticalPath.includes(activity.id);
                
                return (
                  <tr key={activity.id} className={isCritical ? 'bg-red-50' : 'bg-white'}>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">{activity.id}</td>
                    <td className="border border-gray-300 px-3 py-2">{activity.name}</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      {activity.predecessors.length > 0 ? activity.predecessors.join(', ') : '-'}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">{activity.o}</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">{activity.m}</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">{activity.p}</td>
                    <td className="border border-gray-300 px-3 py-2 text-center font-semibold">
                      {result ? formatNumber(result.pertDuration) : '-'}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      {result ? formatNumber(result.es) : '-'}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      {result ? formatNumber(result.ef) : '-'}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      {result ? formatNumber(result.ls) : '-'}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      {result ? formatNumber(result.lf) : '-'}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      {result ? formatNumber(result.slack) : '-'}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      {isCritical ? (
                        <CheckCircle className="w-5 h-5 text-red-600 mx-auto" />
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ruta Crítica */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Ruta Crítica</h2>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <h3 className="font-semibold text-red-900">Actividades en la Ruta Crítica:</h3>
          </div>
          <p className="text-lg text-red-800 font-semibold">
            {criticalPath.join(' → ')}
          </p>
          <p className="text-sm text-red-700 mt-2">
            Estas actividades no pueden retrasarse sin afectar la duración total del proyecto.
          </p>
        </div>
      </div>

      {/* Análisis PERT */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Análisis de Variabilidad PERT</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2 text-left">Actividad</th>
                <th className="border border-gray-300 px-3 py-2 text-center">Duración Esperada</th>
                <th className="border border-gray-300 px-3 py-2 text-center">Varianza</th>
                <th className="border border-gray-300 px-3 py-2 text-center">Desviación Estándar</th>
                <th className="border border-gray-300 px-3 py-2 text-center">Nivel de Incertidumbre</th>
              </tr>
            </thead>
            <tbody>
              {activities.map(activity => {
                const result = results[activity.id];
                const stdDev = result ? Math.sqrt(result.pertVariance) : 0;
                const uncertainty = stdDev > 0.5 ? 'Alta' : stdDev > 0.3 ? 'Media' : 'Baja';
                const uncertaintyColor = stdDev > 0.5 ? 'text-red-600' : stdDev > 0.3 ? 'text-yellow-600' : 'text-green-600';
                
                return (
                  <tr key={activity.id}>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">{activity.id}</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      {result ? formatNumber(result.pertDuration) : '-'} días
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      {result ? formatNumber(result.pertVariance) : '-'}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      {result ? formatNumber(stdDev) : '-'}
                    </td>
                    <td className={`border border-gray-300 px-3 py-2 text-center font-semibold ${uncertaintyColor}`}>
                      {uncertainty}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Conclusiones */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Conclusiones del Análisis</h2>
        <div className="space-y-3 text-blue-800">
          <p><strong>Duración total del proyecto:</strong> {projectDuration} días</p>
          <p><strong>Ruta crítica:</strong> {criticalPath.join(' → ')}</p>
          <p><strong>Actividades críticas:</strong> {criticalPath.length} de {activities.length} actividades</p>
          <p><strong>Recomendaciones:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Enfocar recursos y atención en las actividades de la ruta crítica</li>
            <li>Considerar paralelizar actividades no críticas cuando sea posible</li>
            <li>Mantener buffer de tiempo para actividades con alta variabilidad</li>
            <li>Monitorear de cerca el progreso de las actividades críticas</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CPMPERTCalculator;