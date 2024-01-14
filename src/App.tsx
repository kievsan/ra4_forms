import InputColor from "./components/hex2rgb/Hex2Rgb";
import Steps from "./components/steps/Steps";

import { fitnessWalksBaseData  as walkings } from "./models/Trainings";

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
