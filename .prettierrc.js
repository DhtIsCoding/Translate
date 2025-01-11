const prettierrcConfig = {
    semi: false,
    singleQuote: true,
    plugins: [import.meta.resolve('prettier-plugin-tailwindcss'),
    import.meta.resolve('prettier-plugin-organize-imports')
    ],
}

export default prettierrcConfig
