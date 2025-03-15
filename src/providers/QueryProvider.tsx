import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { PropsWithChildren } from "react";

const client = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2
        }
    }
})

const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => (
    <QueryClientProvider client={client}>
        <ReactQueryDevtools/>
        {children}
    </QueryClientProvider>
)

export default QueryProvider;