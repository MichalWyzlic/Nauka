class DOMHelper{c
	static clearEventListener(element){
		const clonedElement = element.cloneNode(true);
		element.replaceWith(clonedElement);
		return clonedElement;
	}

	static moveElement(elementId, newDestinationSelector){
		const element = document.getElementById(elementId);
		const destinationElement = document.querySelector(newDestinationSelector);
		destinationElement.append(element);

	};
};


class Component {
	constructor(hostElementId, insertBefore = false){
		if(hostElementId){
			this.hostElement = document.getElementById(hostElementId);
		} else {
			this.hostElement = document.body;
		};

		this.insertBefore = insertBefore;
	}

	detach () {
		if(this.element){
			this.element.remove();
		};
	};

	attach(){
		this.hostElement.insertAdjacentElement(
			this.insertBefore ? 'afterbegin' : 'beforeend', 
			this.element
			);
	};
}


class Tooltip extends Component{
	constructor(closeNotifierFunction){
		super('active-projects', true);
		this.closeNotifierHandler = closeNotifierFunction;
		this.create();
	};

	closeTooltip = () => {
		this.detach();
		this.closeNotifierHandler();

	};

	create() {
		console.log('The tooltip...');
		const toolTipEl = document.createElement('div');
		toolTipEl.className = 'card';
		toolTipEl.textContent = 'DUMMY!';
		this.element = toolTipEl;
		toolTipEl.addEventListener('click', this.closeTooltip);
	};


};


class ProjectItem {
	hasActiveTooltip = false;

	constructor(id, updateProjectListsFunction, type){
		this.updateProjectListsHandler = updateProjectListsFunction;
		this.id = id;
		this.connectMoreInfoButton();
		this.connectSwitchButton(type);
	}

	showMoreInfoHandler(){
		if(this.hasActiveTooltip){
			return;
		}
		const toolTip = new Tooltip(() => {this.hasActiveTooltip = false});
		toolTip.attach();
		this.hasActiveTooltip = true;
	}

	connectMoreInfoButton(){
		let moreInfoBtn = document.getElementById(this.id).querySelector('button:first-of-type');
		moreInfoBtn = DOMHelper.clearEventListener(moreInfoBtn);
		moreInfoBtn.addEventListener('click', this.showMoreInfoHandler);
	};

	connectSwitchButton(type){
		let switchButtonEl = document.getElementById(this.id).querySelector('button:last-of-type');
		switchButtonEl = DOMHelper.clearEventListener(switchButtonEl);
		switchButtonEl.textContent = type === 'active' ? 'Finish' : 'Activate';
		switchButtonEl.addEventListener(
			'click', 
			this.updateProjectListsHandler.bind(null, this.id)
		);
	};

	update(updateProjectListsFn, type){
		this.updateProjectListsHandler = updateProjectListsFn;
		this.connectSwitchButton(type);
		this.type = type;
	}
};

class ProjectList {
	projects = [];
	constructor(type){
		this.type = type;
		const prjItems = document.querySelectorAll(`#${type}-projects li`);
		for(const prjItem of prjItems){
			this.projects.push(
				new ProjectItem(prjItem.id, this.switchProject.bind(this), type)
				);
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
		// const projectIndex = this.projects.findIndex(p => p.id === projectId);
		// this.switchHandler(this.projects.splice(projectIndex,1)[0]);
		this.switchHandler(this.projects.find(p => p.id === projectId));
		this.projects = this.projects.filter(p => p.id !== projectId);
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