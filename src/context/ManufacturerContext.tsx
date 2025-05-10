import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ManufacturerProps {
  saveManufacturer: (id: string) => void;
  removeManufacturer: () => void;
  manufacturer: string;
}

const ManufacturerContext = createContext<ManufacturerProps | undefined>(
  undefined
);

const LOCAL_STORAGE_KEY = "manufacturer_id";

const ManufacturerProvider = ({ children }: { children: ReactNode }) => {
  const [manufacturer, setManufacturer] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setManufacturer(saved);
    }
  }, []);

  const saveManufacturer = (id: string) => {
    setManufacturer(id);
    localStorage.setItem(LOCAL_STORAGE_KEY, id);
  };

  const removeManufacturer = () => {
    setManufacturer("");
    localStorage.removeItem(LOCAL_STORAGE_KEY);
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
      "useManufacturer should be used within a ManufacturerProvider."
    );
  }
  return context;
};
