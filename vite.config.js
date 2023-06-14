// @ts-check
import reactPlugin from 'vite-plugin-react'

/**
 * @type { import('vite').UserConfig }
 */
const config = {
  jsx: 'react',
  optimizeDeps: {
    include: [
      'react-is'
    ]
  },
  plugins: [reactPlugin]
}

export default config
