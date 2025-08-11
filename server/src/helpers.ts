import os from "os";

export function getLocalIPAddress() {
    const interfaces = os.networkInterfaces();
    if(!Object.keys(interfaces).length) {
        return '127.0.0.1'; // fallback
    }

    for (const name of Object.keys(interfaces)) {
        // @ts-ignore
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
}

export function logInfo(message: string, info?: any) {
    const baseMessage = `[${new Date().toISOString()}] ${message}`;
    const dataMessage = info ? `${JSON.stringify(info)}` : null;
    console.log(`${baseMessage}${dataMessage ? ': ' + dataMessage : ""}`);
    console.log("--------------------");
}


export function extractDriveFileId(url: string): string | null {
    if (!url) return null;

    // Пошук ID у різних форматах посилань Google Drive
    let match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) return match[1];

    match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match) return match[1];

    return null;
}