import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import Home from './pages/Home'
import PhotoEdit from './pages/PhotoEdit'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<PhotoEdit />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
