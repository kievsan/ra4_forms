import InputColor from "./components/hex2rgb/Hex2Rgb";

import Steps from "./components/steps/StepsMonolit";
import handlerDel from "./components/steps/Steps";
import handlerEdit from "./components/steps/Steps";

import List from "./components/steps/WalkList";

import classes from './App.module.css'


function App() {
  return (
    <>
      <InputColor />
      <div className={classes["Steps"]}>
        <Steps />
        <List onDelete={handlerDel} onEdit={handlerEdit}/>
      </div>      
    </>
  );
}

export default App;
