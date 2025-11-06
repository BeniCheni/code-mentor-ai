import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';
import { getCodeExplanation } from './services/geminiService';
import type { Mock } from 'vitest';

vi.mock('./services/geminiService');

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (getCodeExplanation as Mock).mockResolvedValue({
      initialQuestion: 'Mock initial question',
      lineByLineExplanation: [
        {
          line: 'const hello = "world";',
          explanation: 'Mock explanation for: const hello = "world";',
        },
      ],
      bigOAnalysis: {
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
      },
      tradeoffsAndAlternatives: 'Mock tradeoffs and alternatives',
      systemDesignContext: 'Mock system design context',
      behavioralQuestions: ['Mock behavioral question'],
    });
  });

  it('renders the app and explains code', async () => {
    render(<App />);

    const codeInput = screen.getByRole('textbox');
    fireEvent.change(codeInput, { target: { value: 'const hello = "world";' } });

    const explainButton = screen.getByRole('button', { name: /explain code/i });
    fireEvent.click(explainButton);

    await waitFor(() => {
      expect(getCodeExplanation).toHaveBeenCalledWith('const hello = "world";');
      expect(screen.getByText(/Mock explanation for: const hello = "world";/i)).toBeInTheDocument();
    });
  });

  it('shows an error if the code is empty', async () => {
    render(<App />);
    const codeInput = screen.getByRole('textbox');
    fireEvent.change(codeInput, { target: { value: ' ' } });

    const explainButton = screen.getByRole('button', { name: /explain code/i });
    fireEvent.click(explainButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter some code to explain.')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    (getCodeExplanation as Mock).mockRejectedValueOnce(new Error('API Error'));

    render(<App />);

    const codeInput = screen.getByRole('textbox');
    fireEvent.change(codeInput, { target: { value: 'some code' } });

    const explainButton = screen.getByRole('button', { name: /explain code/i });
    fireEvent.click(explainButton);

    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeInTheDocument();
    });
  });

  it('shows loading state', async () => {
    (getCodeExplanation as Mock).mockImplementationOnce(() => new Promise(() => {}));

    render(<App />);

    const codeInput = screen.getByRole('textbox');
    fireEvent.change(codeInput, { target: { value: 'some code' } });

    const explainButton = screen.getByRole('button', { name: /explain code/i });
    fireEvent.click(explainButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /analyzing.../i })).toBeDisabled();
    });
  });
});
