import { store } from "@app/store";
import { SidebarProvider } from "@shared/ui/sidebar.tsx";
import { ReactNode } from "react";
import { Provider } from "react-redux";

interface ProviderProps {
  children: ReactNode;
}

const PROVIDERS: ((props: ProviderProps) => ReactNode)[] = [
  ({ children }) => <Provider store={store}>{children}</Provider>,
  ({ children }) => <SidebarProvider>{children}</SidebarProvider>,
];

export function Providers({ children }: ProviderProps) {
  return PROVIDERS.reduce(
    (AccumulatedProviders, CurrentProvider) => (
      <CurrentProvider>{AccumulatedProviders}</CurrentProvider>
    ),
    children,
  );
}
