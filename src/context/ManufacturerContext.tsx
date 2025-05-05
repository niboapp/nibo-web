import { createContext, ReactNode, useContext, useState } from "react";

interface ManufacturerProps {
  saveManufacturer: (id: string) => void;
  removeManufacturer: () => void;
  manufacturer: string;
}

const ManufacturerContext = createContext<ManufacturerProps | undefined>(
  undefined
);

const ManufacturerProvider = ({ children }: { children: ReactNode }) => {
  const [manufacturer, setManufacturer] = useState<string>("");

  const saveManufacturer = (id: string) => {
    setManufacturer(id);
  };

  const removeManufacturer = () => {
    setManufacturer("");
  };

  const values = { saveManufacturer, removeManufacturer, manufacturer };

  return (
    <ManufacturerContext.Provider value={values}>
      {children}
    </ManufacturerContext.Provider>
  );
};

export default ManufacturerProvider;

export const useManufacturer = () => {
  const context = useContext(ManufacturerContext);

  if (!context) {
    throw new Error(
      "useManufactuer should be in the ManufacturerProvider context."
    );
  }
  return context;
};
