import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface ICustomersContextData {
  customersList: ICustomer[];
  setCustomersList: Dispatch<SetStateAction<ICustomer[]>>;
}

interface ICustomersProviderProps {
  children: ReactNode;
}

export const CustomersContext = createContext<ICustomersContextData>({} as ICustomersContextData)

export const CustomersProvider = ({ children }: ICustomersProviderProps) => {
  const [customersList, setCustomersList] = useState<ICustomer[]>([]);

  return (
    <CustomersContext.Provider value={{
      customersList,
      setCustomersList,
    }}>
      { children }
    </CustomersContext.Provider>
  );
}
