import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom';
import ProfilePage from '@/app/profile/[id]/page';
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

describe('Profile Page', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('renders loading spinner initially', () => {
        render(<ProfilePage />)
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('fetches and displays user data', async() => {

        const userData = {
            address: "221 B,Baker Street",
            city: "London",
            country: "United Kingdom",
            email: "james@gmail.com",
            fname: "James",
            lname: "Jacob",
            username: "username",
            _id: "66a927b280975869f7adced3"
        }
        mockedAxios.get.mockResolvedValue({
            status :200 ,
            data :{
                message :  "User Found!",
                success : true,
                data : userData
            }
        })

        mockedUseRouter.mockReturnValue(mockRouter)

        render(<ProfilePage />)

        await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledWith('/api/users/me'))

        expect(screen.getByText(/Welcome, James !/i)).toBeInTheDocument();
        expect(screen.getByText(/James Jacob/i)).toBeInTheDocument();
        expect(screen.getByText(/james@gmail.com/i)).toBeInTheDocument();
        expect(screen.getByText(/London/i)).toBeInTheDocument();
        expect(screen.getByText(/221 B,Baker Street/i)).toBeInTheDocument();
        expect(screen.getByText(/United Kingdom/i)).toBeInTheDocument();
        
    })

})
