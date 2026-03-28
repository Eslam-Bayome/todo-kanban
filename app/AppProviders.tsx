"use client";

import "@ant-design/v5-patch-for-react-19";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { App, ConfigProvider } from "antd";
import { Provider } from "react-redux";

import { getQueryClient } from "../integrations/tanstack/query-client";
import { store } from "../redux";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#1677ff",
              borderRadius: 8,
              fontFamily:
                "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            },
          }}
        >
          <App>{children}</App>
        </ConfigProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
};

export default AppProviders;
