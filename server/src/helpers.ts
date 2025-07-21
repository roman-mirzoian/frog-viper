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