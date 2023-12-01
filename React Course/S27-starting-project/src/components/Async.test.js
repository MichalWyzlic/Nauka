import { render, screen } from '@testing-library/react';

import Async from './Async';

describe('Async component', () => {
	test('renders posts if request succeeds', async () => {
		//Arrange
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => {
				return [{id: 'p1', title: 'First post'}]
			}
		});
		render(<Async />);

		//Act
		// const buttonElement = screen.getByRole('button');
		// userEvent.click(buttonElement);
		

		//Assert
		const listItemElements = await screen.findAllByRole('listitem');
		expect(listItemElements).not.toHaveLength(0);
	});
});