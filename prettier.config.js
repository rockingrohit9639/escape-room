/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  printWidth: 100,
  semi: false,
  trailingComma: 'all',
  plugins: ["prettier-plugin-tailwindcss"]
}
export default config 