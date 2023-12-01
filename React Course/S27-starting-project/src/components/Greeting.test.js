import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Greeting from './Greeting';


describe('Greetings component', () => {
	test('renders Hello World', () => {
		//Arrange
		render(<Greeting />);

		//Act
		//... nothing

		//Assert
		const helloWorldElement = screen.getByText('Hello World');
		expect(helloWorldElement).toBeInTheDocument();
	});

	test('renders good to see you if the button was not clicked', () => {
		render(<Greeting/>);

		const outputElement = screen.getByText('good to see you', {exact: false});
		expect(outputElement).toBeInTheDocument();
	});

	test('renders Changed when the button was clicked', () => {
		//Arrange
		render(<Greeting />);

		//Act
		const buttonElement = screen.getByRole('button');
		userEvent.click(buttonElement);
		

		//Assert
		const changedText = screen.getByText('Changed!', {exact: false});
		expect(changedText).toBeInTheDocument();
	});

	test('removes good to see you if the button was  clicked', () => {
		//Arrange
		render(<Greeting />);

		//Act
		const buttonElement = screen.getByRole('button');
		userEvent.click(buttonElement);
		

		//Assert
		const changedText = screen.queryByText('good to see you', {exact: false});
		expect(changedText).toBeNull();
	});
});
