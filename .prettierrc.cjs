const prettierConfig = {
    semi: false,
    singleQuote: true,
    plugins: [
        require.resolve('prettier-plugin-organize-imports'),
        require.resolve('prettier-plugin-tailwindcss'),
    ],
}

module.exports = prettierConfig
