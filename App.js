import React, { useState } from 'react';
import tokenContext from './src/Component/Context';
import ProductContext from "./src/Component/ProductContext";
import SearchContext from "./src/Component/SearchContext"
import Navigation from "./src/Navigation/Navigation";

export default function App(){
    const [token, setToken] = useState({});
    const [searchPro, setSearchPro] = useState();
    const [quantityProduct,setQuantityProduct]=useState([]);
    return(
     <tokenContext.Provider value={[token, setToken]}>
         <SearchContext.Provider value={[searchPro, setSearchPro]}>
            <ProductContext.Provider value={ [quantityProduct,setQuantityProduct]}>
                    <Navigation /> 
            </ProductContext.Provider>  
        </SearchContext.Provider>
    </tokenContext.Provider>
    );
}
