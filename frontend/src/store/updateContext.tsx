import { createContext, useContext, useState, type ReactNode } from "react";

interface UpdateContextType {
  update: boolean;
  toggleUpdate: () => void;
}

// Создаем контекст с дефолтным значением
const UpdateContext = createContext<UpdateContextType>({
  update: true,
  toggleUpdate: () => {},
});

export function UpdateProvider({ children }: { children: ReactNode }) {
  const [update, setUpdate] = useState(true);

  const toggleUpdate = () => {
    setUpdate((prev) => !prev);
  };

  return (
    <UpdateContext.Provider value={{ update, toggleUpdate }}>
      {children}
    </UpdateContext.Provider>
  );
}

export function useUpdate() {
  return useContext(UpdateContext);
}