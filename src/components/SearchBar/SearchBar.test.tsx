import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  test('renders with placeholder text', () => {
    render(<SearchBar value="" onChange={() => {}} onSearch={() => {}} />);
    expect(screen.getByPlaceholderText('Enter GitHub username...')).toBeInTheDocument();
  });

  test('calls onChange when typing', () => {
    const mockOnChange = vi.fn();
    render(<SearchBar value="" onChange={mockOnChange} onSearch={() => {}} />);
    
    const input = screen.getByPlaceholderText('Enter GitHub username...');
    fireEvent.change(input, { target: { value: 'octocat' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('octocat');
  });

  test('calls onSearch when button is clicked', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar value="octocat" onChange={() => {}} onSearch={mockOnSearch} />);
    
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);
    
    expect(mockOnSearch).toHaveBeenCalled();
  });
});
