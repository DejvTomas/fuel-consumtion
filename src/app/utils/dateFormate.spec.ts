import { dateFormate } from './dateFormate';

describe('DateFormat', () => {
  it('should have proper format', () => {
    const date = new Date(2023, 6, 15);
    expect(dateFormate(date)).toEqual('15/07/2023');
  });
});
