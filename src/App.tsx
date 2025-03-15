import MainPage from "./pages/MainPage"
import QueryProvider from "./providers/QueryProvider"

function App() {

  return (
    <QueryProvider>
      <MainPage/>
    </QueryProvider>
  )
}

export default App
