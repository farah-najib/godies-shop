import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import ThemeContextProvider from './contexts/ThemeContext.tsx'


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            //cacheTime
        }
    }
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeContextProvider>
                    <App />
                </ThemeContextProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
)
