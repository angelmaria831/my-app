import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom';
import LoginPage from '@/app/login/page';
import axios from 'axios'
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

jest.mock('axios')


const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
};

describe('LoginPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });


    test('renders the login form correctly', () => {
        render(<LoginPage />);
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    });

    test('shows error message on login failure - incorrect username', async () => {

        mockedAxios.post.mockRejectedValue({
            response: { status: 400, data: { error: 'User dont exists' } }
        });

        render(<LoginPage />);
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(screen.getByText('User dont exists')).toBeInTheDocument();
        });
    });

    test('shows error message on login failure - incorrect password', async () => {

        mockedAxios.post.mockRejectedValue({
            response: { data: { error: 'Invalid Password' } }
        });

        render(<LoginPage />);
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'username' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(screen.getByText('Invalid Password')).toBeInTheDocument();
        });
    });

    test('redirects to profile page with successfull login', async () => {

        mockedAxios.post.mockResolvedValue({
            status: 200, data: {
                message: 'Login Successfull',
                id: '66a927b280975869f7adced3',
                success: true
            }
        });
        
        mockedUseRouter.mockReturnValue(mockRouter);

        render(<LoginPage />);
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'username' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(mockRouter.push).toHaveBeenCalledWith('/profile/66a927b280975869f7adced3');
        });
    });

})