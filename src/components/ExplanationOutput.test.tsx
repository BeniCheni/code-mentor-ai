import { render, screen, fireEvent } from '@testing-library/react';
import { ExplanationOutput } from './ExplanationOutput';
import type { CodeExplanation } from '../types';

const mockExplanation: CodeExplanation = {
  initialQuestion: 'Can you explain this code?',
  lineByLineExplanation: [
    { line: '1', explanation: 'This is line 1.' },
  ],
  bigOAnalysis: {
    timeComplexity: 'O(n) - Linear time',
    spaceComplexity: 'O(1) - Constant space',
  },
  tradeoffsAndAlternatives: 'Here are some tradeoffs.',
  systemDesignContext: 'Here is some system design context.',
  behavioralQuestions: ['What would you do if...?'],
};

describe('ExplanationOutput', () => {
  it('renders welcome message when no explanation is provided', () => {
    render(<ExplanationOutput explanation={null} isLoading={false} error={null} />);
    expect(screen.getByText(/Welcome, Future Tech Lead!/i)).toBeInTheDocument();
  });

  it('renders loading state', () => {
    render(<ExplanationOutput explanation={null} isLoading={true} error={null} />);
    expect(screen.getByText(/Your mentor is thinking.../i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(<ExplanationOutput explanation={null} isLoading={false} error="Something went wrong" />);
    expect(screen.getByText(/An Error Occurred/i)).toBeInTheDocument();
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it('renders explanation and allows tab switching', () => {
    render(<ExplanationOutput explanation={mockExplanation} isLoading={false} error={null} />);

    // Initial state (Line-by-Line)
    expect(screen.getByText(/This is line 1./i)).toBeInTheDocument();

    // Switch to Big O
    fireEvent.click(screen.getByRole('button', { name: 'Big O' }));
    expect(screen.getByText(/Time Complexity/i)).toBeInTheDocument();
    expect(screen.getByText(/O\(n\)/)).toBeInTheDocument();
    expect(screen.getByText(/Linear time/)).toBeInTheDocument();
    expect(screen.getByText(/Space Complexity/i)).toBeInTheDocument();
    expect(screen.getByText(/O\(1\)/)).toBeInTheDocument();
    expect(screen.getByText(/Constant space/)).toBeInTheDocument();

    // Switch to Trade-offs
    fireEvent.click(screen.getByRole('button', { name: 'Trade-offs' }));
    expect(screen.getByText(/Here are some tradeoffs./i)).toBeInTheDocument();

    // Switch to System Design
    fireEvent.click(screen.getByRole('button', { name: 'System Design' }));
    expect(screen.getByText(/Here is some system design context./i)).toBeInTheDocument();

    // Switch to Behavioral
    fireEvent.click(screen.getByRole('button', { name: 'Behavioral' }));
    expect(screen.getByText(/What would you do if...\?/i)).toBeInTheDocument();
  });

  it('handles complexity strings without justification', () => {
    const simpleExplanation = {
      ...mockExplanation,
      bigOAnalysis: {
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(n)',
      },
    };
    render(<ExplanationOutput explanation={simpleExplanation} isLoading={false} error={null} />);
    fireEvent.click(screen.getByRole('button', { name: 'Big O' }));
    expect(screen.getByText('O(log n)')).toBeInTheDocument();
    expect(screen.getByText('O(n)')).toBeInTheDocument();
    // Check for the default justification text
    expect(screen.getAllByText(/No detailed justification provided./i).length).toBe(2);
  });

  it('resets to first tab when explanation changes', () => {
    const { rerender } = render(<ExplanationOutput explanation={mockExplanation} isLoading={false} error={null} />);

    // Switch to another tab
    fireEvent.click(screen.getByRole('button', { name: 'Big O' }));
    expect(screen.getByText(/Time Complexity/i)).toBeInTheDocument();

    // Create a new explanation object to trigger the effect
    const newExplanation = { ...mockExplanation, initialQuestion: 'A new question' };
    rerender(<ExplanationOutput explanation={newExplanation} isLoading={false} error={null} />);

    // Check that the active tab is back to Line-by-Line
    expect(screen.getByText(/This is line 1./i)).toBeInTheDocument();
    expect(screen.queryByText(/Time Complexity/i)).not.toBeInTheDocument();
  });
});
