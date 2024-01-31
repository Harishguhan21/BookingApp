import * as React from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adults: undefined,
    children: undefined,
    room: undefined,
  },
};
export const SearchContext: any = React.createContext(undefined);

const SearchContextProvider: any = ({ children }: any) => {
  const [value, setValue] = React.useState<any>(INITIAL_STATE);

  const updateValue = (newValue: any) => {
    setValue(newValue);
  };

  // Step 3: Provide the value through the context provider
  return (
    <SearchContext.Provider value={{ value, updateValue }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
