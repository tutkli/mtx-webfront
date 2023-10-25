import { defineConfig } from 'cva';
import { twMerge } from 'tailwind-merge';

/**
 * CVA Utility classes
 * @see https://beta.cva.style/
 */
export const { cva, cx, compose } = defineConfig({
  hooks: {
    onComplete: className => twMerge(className),
  },
});
