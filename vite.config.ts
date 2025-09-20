import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator';

import type { MinifyOptions } from 'terser';

const terserOptions: MinifyOptions = {
    compress: {
        drop_console: true,
        drop_debugger: true,
    },
    mangle: true,
};

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        obfuscatorPlugin({
            options: {
                compact: true, // Убирает пробелы и переносы строк
                controlFlowFlattening: true, // Запутывает условия и циклы
                controlFlowFlatteningThreshold: 0.75, // Насколько сильно запутывать
                numbersToExpressions: true, // Преобразует числа в выражения
                simplify: true, // Простейшие выражения упрощает
                stringArray: true, // Все строки помещает в массив и меняет индексы
                stringArrayEncoding: ['rc4'], // Шифрует строки (можно ['base64', 'rc4'])
                stringArrayThreshold: 0.75, // Процент строк для шифрования
                debugProtection: false, // Защита от devtools (можно включить)
                rotateStringArray: true, // Дополнительная защита строк
                selfDefending: true, // Затрудняет повторное форматирование кода
            },
        }),
    ],

    build: {
        terserOptions,
        minify: 'terser', // Минификация вместе с обфускацией
    },
    // server: {
    //     proxy: {
    //         '/api': {
    //             target: 'http://127.0.0.1:3000', // backend в dev
    //             changeOrigin: true,
    //             secure: false,
    //         },
    //     },
    // },
});
