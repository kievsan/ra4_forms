import InputColor from "./components/hex2rgb/Hex2Rgb";

//import Steps from "./components/steps/StepsMonolit";
import Steps from "./components/steps/Steps";

import classes from './App.module.css'


function App() {
  return (
    <>
      <InputColor />
      <div className={classes["Steps"]}>
        <Steps />
      </div>      
    </>
  );
}

export default App;
