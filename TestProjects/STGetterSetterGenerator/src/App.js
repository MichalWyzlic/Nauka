import React, { useState } from 'react';
import Header from './components/Header';

import gettersSettersGenerator from './utils/getters-setters-generator';

const textToAnalyze = `(**  Internal frequency inverter   *)
Inverter	: LnxC_Actuator;
(**  Control signal  *)
CtrlSignal	  : REAL; 
(**  Output control signal  *)
OutputSignal	: REAL;

//		(** Motor/fan type *)
//		MotorType	 : USINT;
(**  Maximum electrical power  *)
MaxPower	: REAL;
//		(**Variable speed fan*)		
//		VarSpeed	: BOOL := FALSE;  

(**  Minimum Control Signal [%]  *)
MinCtrlSig	: REAL := 0;
(**  Maximum Control Signal [%]  *)
MaxCtrlSig	: REAL := 100;

(**  Minimum speed [%]  *)
MinSpeed	: REAL := 0;
(**  Maximum speed [%]  *)
MaxSpeed	: REAL := 100;

(**  Ramp up %/s  *)
RampUp		  : REAL := 1;
(**  Ramp Down %/s  *)
RampDown		: REAL := 1;		

(*  Variables not exposed via getters and setters  *)
Init		: BOOL := TRUE;
TempCtrl	: REAL := 0;		`;

function App() {
	const [varArray, setVarArray] = useState(gettersSettersGenerator(textToAnalyze));
	console.log(varArray);

	const [gettersAndSetters, setGettersAndSetters] = useState('');

	// const resultText = textArray.map((val) => {

	// 	return (<p>{val}</p>);
	// });

	return (
		<React.Fragment>
			<Header />
			{/* {resultText} */}
		</React.Fragment>
	);
}

export default App;
