import { createContext, useContext, useState, type ReactNode } from 'react';

export interface BookingSelection {
  brand?: string;
  model?: string;
  service?: string;
  packageName?: string;
}

interface BookingContextValue {
  selection: BookingSelection;
  setSelection: (s: BookingSelection) => void;
  clearSelection: () => void;
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selection, setSelectionState] = useState<BookingSelection>({});

  const setSelection = (s: BookingSelection) => setSelectionState(s);
  const clearSelection = () => setSelectionState({});

  return (
    <BookingContext.Provider value={{ selection, setSelection, clearSelection }}>
      {children}
    </BookingContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
