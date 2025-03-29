import { expect, it, describe } from 'vitest';
import { cleanup, getByText, render } from '@testing-library/react'
import ErrorToast from '/src/components/partials/ErrorToast.jsx';

describe('Unit tests for ErrorToast component', () => {
  it('ErrorToast should return message from props if its a string', async () => {
    const error = "Something went wrong.";
    render(<ErrorToast error={error} />)

    const el = getByText(document, error);
    expect(el).toBeDefined;

    cleanup();
  });
  it('ErrorToast should not return if props is array', async () => {
    const error = ["error", "message"];

    const el = render(<ErrorToast error={error} />)

    expect(el.queryByText(error.at(0))).toBeNull();
  });
})
