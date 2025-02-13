import { store } from "@app/store";
import { SidebarProvider } from "@shared/ui/sidebar.tsx";
import { UserLocationProvider } from "@shared/utils/geo-location";
import { CurrentLocationProvider } from "@shared/utils/geo-location";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

interface ProviderProps {
  children: ReactNode;
}

const PROVIDERS: ((props: ProviderProps) => ReactNode)[] = [
  ({ children }) => <CurrentLocationProvider>{children}</CurrentLocationProvider>,
  ({ children }) => <UserLocationProvider>{children}</UserLocationProvider>,
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
