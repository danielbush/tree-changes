import * as React from 'react';
import { render } from '@testing-library/react';

import useTreeChanges from '../src/hook';

jest.useFakeTimers();

const mockRatio = jest.fn();
const mockSize = jest.fn();

function Component(props: any) {
  const { changed } = useTreeChanges(props);

  if (changed('ratio')) {
    mockRatio();
  }

  if (changed('size')) {
    mockSize();
  }

  return <div>Update</div>;
}

describe('useTreeChanges', () => {
  afterEach(() => {
    mockSize.mockReset();
  });

  it('should trigger the callback when props change', () => {
    const props = { padding: 10, ratio: 1, size: 12 };
    const { rerender } = render(<Component {...props} />);

    expect(mockSize).toHaveBeenCalledTimes(0);

    rerender(<Component {...props} size={16} />);
    expect(mockSize).toHaveBeenCalledTimes(1);

    rerender(<Component {...props} size={16} />);
    expect(mockSize).toHaveBeenCalledTimes(1);

    rerender(<Component {...props} />);
    expect(mockSize).toHaveBeenCalledTimes(2);

    rerender(<Component {...props} ratio={2} size={15} />);
    expect(mockSize).toHaveBeenCalledTimes(3);

    rerender(<Component {...props} size={15} />);
    expect(mockSize).toHaveBeenCalledTimes(3);

    expect(mockRatio).toHaveBeenCalledTimes(2);
  });
});
