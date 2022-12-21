import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import LgRegistration from "./components/LgRegistration";
import Login from "./components/Login";
import Registration from "./components/Registration";
import TotalList from "./components/TotalLIst";
import Updatedt from "./components/Updatedt";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Layout />} >

            <Route index element={<Registration />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/totalList" element={<TotalList />} />
            <Route path="/LgRegistration" element={<LgRegistration />} />
            <Route path="/updatedt/:user_id" element={<Updatedt />} />

          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// var arr=[[1,2], [2,5]]
// var arr1=[[1,1], [5,6]]
//     let arr3=[], arr4=[], arr5=[];
//  for(let i=0; i<arr.length; i++){
//     for(let j=0; j<arr[i].length; j++){
//         if(i==0 && j==0){
//         arr3.push(arr[0][0]+arr[0][1])
//     }else if(i==1 && j==0){
//        arr3.push(arr[1][0]+arr[1][1])
//     }
//     }
//  }
//      console.log(arr3)
// for(let i=0; i<arr1.length; i++){
//     for(let j=0; j<arr1[i].length; j++){
//         if(i==0 && j==0){
//         arr4.push(arr1[0][0]+arr1[0][1])
//     }else if(i==1 && j==0){
//        arr4.push(arr1[1][0]+arr1[1][1])
//     }
//     }
//  }

// console.log([arr3,arr4])