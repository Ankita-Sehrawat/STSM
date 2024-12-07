import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard'
import User from './Pages/User'
import Catalog from './Pages/Catalog';
import Sip from './Pages/Sip';
import Mkt from './Pages/Mkt';
import Communication from './Pages/Communication';
import Transaction from './Pages/Transaction';
import Privacy from './Pages/Privacy';
import Terms from './Pages/Terms';
import Setting from './Pages/Setting';
import Layout from './Pages/Layout';
import Faq from './Pages/Faq';
import CataAddNew from './Pages/CataAddNew';
import { FilterDropDown } from './Component/FilterDropDown';
import CataProdList from './Pages/CataProdList';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='catalog' element={<Catalog />} >
              <Route path='prodList' element={<CataProdList />} >
                <Route path='newProduct' element={<CataAddNew />} />
                <Route path='update-product/:id' element={<CataAddNew />} />
              </Route>
              <Route path='addProduct' element={<CataAddNew />} />
            </Route>
            <Route path='/user' element={<User />} />
            <Route path='/sip' element={<Sip />} />
            <Route path='/mkt1' element={<Mkt />} />
            <Route path='/com' element={<Communication />} />
            <Route path='/transaction' element={<Transaction />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/term' element={<Terms />} />
            <Route path='/set1' element={<Setting />} />
            <Route path='/Faq' element={<Faq />} />


          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
