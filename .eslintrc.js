module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "prettier",
        "plugin:react/recommended"
        ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "modules": true
        }
    },
    "rules": {
        "quotes": ["error", "double"],
        "eqeqeq": ["error", "smart"],
        "camelcase": ["error"],
        "react/jsx-uses-react": "error",   
        "react/jsx-uses-vars": "error"
    },
    "plugins": [
        "prettier",
        "react"
    ],
    "parser": "babel-eslint",
    "settings": {
        "react": {
            "version": "detect"
        }
    }
};