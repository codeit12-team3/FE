import { relative } from 'path'

const buildEslintCommand = (filenames) => {
  const files = filenames.map((f) => relative(process.cwd(), f)).join(' ')
  return `eslint --fix ${files}`
}

const config = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, 'prettier --write'],
  '*.{css,scss,md,html,json}': ['prettier --write'],
}

export default config
