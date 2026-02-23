import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { chromium } from 'playwright';

const HOST = '127.0.0.1';
const PORT = Number(process.env.CATALOG_PDF_PORT ?? 4179);
const TARGET_URL = `http://${HOST}:${PORT}/catalogo-pdf-print`;
const OUTPUT_PATH = process.env.CATALOG_PDF_OUTPUT
    ? path.resolve(process.env.CATALOG_PDF_OUTPUT)
    : path.resolve(process.cwd(), 'public/downloads/facilco-catalogo-produtos.pdf');

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitForServer = async (url, timeoutMs = 90000) => {
    const start = Date.now();

    while (Date.now() - start < timeoutMs) {
        try {
            const response = await fetch(url, { method: 'GET' });
            if (response.ok) return;
        } catch {
            // Server not ready yet.
        }
        await wait(700);
    }

    throw new Error(`Servidor não respondeu em ${timeoutMs}ms: ${url}`);
};

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const devServer = spawn(
    npmCommand,
    ['run', 'dev', '--', '--host', HOST, '--port', String(PORT), '--strictPort'],
    {
        cwd: process.cwd(),
        stdio: ['ignore', 'pipe', 'pipe'],
        env: { ...process.env, BROWSER: 'none' }
    }
);

devServer.stdout.on('data', (chunk) => process.stdout.write(chunk));
devServer.stderr.on('data', (chunk) => process.stderr.write(chunk));

const shutdownServer = () =>
    new Promise((resolve) => {
        if (devServer.killed) {
            resolve(undefined);
            return;
        }
        devServer.once('exit', () => resolve(undefined));
        devServer.kill('SIGTERM');
    });

try {
    await waitForServer(TARGET_URL);

    const browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2
    });

    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 180000 });
    await page.waitForFunction(() => window.__CATALOG_PDF_READY__ === true, { timeout: 300000 });
    await page.emulateMedia({ media: 'print' });

    await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
    await page.pdf({
        path: OUTPUT_PATH,
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        margin: {
            top: '10mm',
            right: '8mm',
            bottom: '10mm',
            left: '8mm'
        }
    });

    await browser.close();
    console.log(`PDF gerado com sucesso em: ${OUTPUT_PATH}`);
} catch (error) {
    console.error('Falha ao gerar PDF do catálogo.');
    console.error(error);
    process.exitCode = 1;
} finally {
    await shutdownServer();
}
