import { SidebarProvider } from "@shared/ui/sidebar.tsx";
import { ActiveDateProvider } from "@shared/utils/date";
import { store } from "@store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

interface ProviderProps {
  children: ReactNode;
}

const PROVIDERS: ((props: ProviderProps) => ReactNode)[] = [
  ({ children }) => <ActiveDateProvider>{children}</ActiveDateProvider>,
  ({ children }) => <SidebarProvider>{children}</SidebarProvider>,
  ({ children }) => <Provider store={store}>{children}</Provider>,
  ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
];

export function Providers({ children }: ProviderProps) {
  return PROVIDERS.reduce(
    (AccumulatedProviders, CurrentProvider) => (
      <CurrentProvider>{AccumulatedProviders}</CurrentProvider>
    ),
    children,
  );
}
