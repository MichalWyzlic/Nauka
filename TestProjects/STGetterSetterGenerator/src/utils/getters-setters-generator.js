function analyzeInputCode(inputCode) {
	const multiLine = inputCode.split(';');
	const result = [];
	for (let i = 0; i < multiLine.length; i++) {
		const commentReg = new RegExp();
		//extract comment at the beginning
		let comment = multiLine[i].match(
			/^((\(\*\*\s*|\(\*\s*))([^\*\)]*)(\*\))/gm
		);

		//if comment exists
		if (comment) {
			//extract variable
			let variable = multiLine[i].replace(
				/^((\(\*\*\s*|\(\*\s*))([^\*\)]*)(\*\))/gm,
				''
			);
			variable = variable.replace(/\s+/gm, '');
			//remove initial value assignment
			variable = variable.replace(/:=.*$/gm, '');
			//extract type
			let type = variable.replace(/^[^:]*:/gm, '');
			//extract variable name
			variable = variable.replace(/:[^:]*$/gm, '');
			comment = comment[0].replace(/^(\(\*\*\s*|\(\*\s*)/gm, '');
			comment = comment.replace(/(\s*\*\))/gm, '');
			result.push({
				comment,
				variable,
				type
			});
		} else {
			//if the line is a variable without comment and is not empty
			const commentOutRegEx = new RegExp(/^\s*\/\//gm);
			const notEmptyLine = multiLine[i].replace(/\s*/gm, '').length > 0;
			// check if the line is not commented out
			if (!commentOutRegEx.test(multiLine[i]) && notEmptyLine) {
				//remove white space
				let variable = multiLine[i].replace(/\s+/gm, '');
				//remove initial value assignment
				variable = variable.replace(/:=.*$/gm, '');
				//extract type
				let type = variable.replace(/^[^:]*:/gm, '');
				//extract variable name
				variable = variable.replace(/:[^:]*$/gm, '');
				comment = '';
				result.push({
					comment,
					variable,
					type
				});
			}
		}
	}

	return result;
}

function createGetSet(item) {
	const getterAndSetter = `(* ${item.comment} *)
	(**  Gets current value of ${item.comment} *)
	METHOD Get${item.variable} : ${item.type}
		Get${item.variable} := THIS.${item.variable};	
	END_METHOD
		
	(**  Sets current value of ${item.comment} *)
	METHOD Set${item.variable} 
		VAR_INPUT
			In${item.variable} : ${item.type};
		END_VAR
		THIS.${item.variable} := In${item.variable};
	END_METHOD`;

	return getterAndSetter;
}

function gettersSettersGenerator(inputCode){
	const variablesList = analyzeInputCode(inputCode);

	if(variablesList){
		let gettersAndSetters = '';

		
		return 
	}
}

export default gettersSettersGenerator;
