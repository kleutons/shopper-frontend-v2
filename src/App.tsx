import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/header';
import HomePage from './Pages/Home/homePage';
import ProductsPage from './Pages/Products/products';
import { Toaster } from './Components/Toaster';
import Footer from './Components/Footer/footer';


function App() {
  return (
    <>
    <Toaster />
    <Header/>
    <main className='container'>
      <BrowserRouter>
        <Routes>
          
          <Route path='/shopper-frontend-v2/' element={<HomePage/>} />
          <Route path='/shopper-frontend-v2/products/' element={<ProductsPage/>} />

        </Routes>
      </BrowserRouter>
    </main>
    <Footer />
    </>
  );
}

export default App;
