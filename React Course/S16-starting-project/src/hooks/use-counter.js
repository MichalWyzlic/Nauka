import React, {useState, useEffect} from "react";

function useCounter(forwards = true){
	const [counter, setCounter] = useState(0);

	useEffect(() => {
	  const interval = setInterval(() => {
		setCounter((prevCounter) =>  prevCounter + (forwards ? 1 : -1));
	  }, 1000);
  
	  return () => clearInterval(interval);
	}, [forwards]);

	return counter;
};

export default useCounter;