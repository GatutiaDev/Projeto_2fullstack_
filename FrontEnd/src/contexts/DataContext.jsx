import { createContext, useContext, useReducer } from 'react';


const initialState = {
  loading: false,
  data: null,
  error: null,
};


function dataReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...initialState, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error(`Ação desconhecida: ${action.type}`);
  }
}


const DataContext = createContext();


export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData deve ser usado dentro de um DataProvider');
  }
  return context;
};