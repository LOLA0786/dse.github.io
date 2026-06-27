import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";

import Home from "./pages/Home";
import Framework from "./pages/Framework";
import Whitepaper from "./pages/Whitepaper";
import Research from "./pages/Research";
import Docs from "./pages/Docs";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

export default function App(){

return(

<Routes>

<Route element={<Layout/>}>

<Route path="/" element={<Home/>}/>

<Route path="/framework" element={<Framework/>}/>

<Route path="/whitepaper" element={<Whitepaper/>}/>

<Route path="/research" element={<Research/>}/>

<Route path="/docs" element={<Docs/>}/>

<Route path="/about" element={<About/>}/>

</Route>

<Route path="*" element={<NotFound/>}/>

</Routes>

);

}
