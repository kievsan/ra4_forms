import { FitnessWalk } from "./types";

import InputColor from "./components/hex2rgb/Hex2Rgb";

//import Steps from "./components/steps/StepsMonolit";
import Steps1 from "./components/steps/Steps1";
import Steps from "./components/steps/Steps";

import classes from './App.module.css'


function App() {
  return (
    <>
      <InputColor />
      <div className={classes["Steps"]}>
        <Steps baseWalkList={new Array<FitnessWalk>()}/>
        <Steps1 />
      </div>      
    </>
  );
}

export default App;
