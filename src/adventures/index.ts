import blackFriday from './black_friday_blowup.json';
import type { Adventure } from '../types';

const adventures: Record<string, Adventure> = {
  black_friday_blowup: blackFriday as Adventure,
};

export default adventures
