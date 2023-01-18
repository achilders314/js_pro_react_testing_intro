import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductList from './ProductList';

global.fetch = async () =>
    Promise.resolve({
        json: async () =>
            Promise.resolve([
                {
                    title: 'title',
                    id: 'id',
                    image: 'https://www.image1.com',
                    price: 123,
                },
            ]),
    });

describe('ProductList', () => {
    it('shows a loader and some products', async () => {
        render(<ProductList />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
        expect(await screen.findByText('$123.00')).toBeInTheDocument();
    });

    it('adds the correct amount', async () => {
        render(<ProductList />);

        expect((await screen.findByTestId("total")).innerHTML).toEqual("$0.00")
    
        userEvent.click(await screen.findByTestId("btn-id"));
        
        expect((await screen.findByTestId("total")).innerHTML).toEqual("$123.00")

 });
});
