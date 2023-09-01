import { toFixed } from "./toFixed";

describe('ToFixed', () => {
    it('should have proper return value', () => {
      expect(toFixed(123.369)).toBe('123.37');
      expect(toFixed(123.369, 1)).toBe('123.4');
      expect(toFixed(123.369,1,'Unit')).toBe('123.4 Unit');
    });
  });
  