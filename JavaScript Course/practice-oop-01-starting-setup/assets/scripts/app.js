class DOMHelper{c
	static clearEventListener(element){
		const clonedElement = element.cloneNode(true);
		element.replaceWith(clonedElement);
		return clonedElement;
	}

	static moveElement(elementId, newDestiantionSelector){
		const element = document.getElementById(elementId);
		const destinationElement = document.querySelector(newDestiantionSelector);
		destinationElement.append(element);

	};
};

class Tooltip {};

class ProjectItem {
	constructor(id, updateProjectListsFunction){
		this.updateProjectListsHandler = updateProjectListsFunction;
		this.id = id;
		this.connectMoreInfoButton();
		this.connectSwitchButton();
	}

	connectMoreInfoButton(){};

	connectSwitchButton(){
		let switchButtonEl = document.getElementById(this.id).querySelector('button:last-of-type');
		switchButtonEl = DOMHelper.clearEventListener(switchButtonEl);
		switchButtonEl.addEventListener('click', this.updateProjectListsHandler);
	};

	update(updateProjectListsFn, type){
		this.updateProjectListsHandler = updateProjectListsFn;
		this.type = type;
	}
};

class ProjectList {
	projects = [];
	constructor(type){
		this.type = type;
		const prjItems = document.querySelectorAll(`#${type}-projects li`);
		for(const prjItem of prjItems){
			this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this)));
		}
		console.log(this.projects);

	};

	setSwitchHandlerFunction(switchHandlerFunction){
		this.switchHandler =  switchHandlerFunction;
	};

	addProject(project){
		this.projects.push(project);
		DOMHelper.moveElement(project.id, `#${this.type}-projects ul`)
		project.update(this.switchProject.bind(this), this.type);
	};

	switchProject(projectId){
		const projectIndex = this.projects.findIndex(p => p.id === projectId);
		this.switchHandler(this.projects.splice(projectIndex,1)[0]);
	};
};

class App {
	static init(){
	const activeProjectsList = new ProjectList('active');
	const finishedProjectList = new ProjectList('finished');

	activeProjectsList.setSwitchHandlerFunction(finishedProjectList.addProject.bind(finishedProjectList));
	finishedProjectList.setSwitchHandlerFunction(activeProjectsList.addProject.bind(activeProjectsList));
	};

};

App.init();