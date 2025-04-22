import { promises as fs } from 'fs';
import path from 'path';
const DB_PATH = path.resolve('data', 'systemInfo.json');

export default class FileSystemInfoRepository {
  async _read() {
    try {
      const raw = await fs.readFile(DB_PATH, 'utf-8');
      return JSON.parse(raw);
    } catch (e) {
      if (e.code === 'ENOENT') return []; // fichier inexistant : premier run
      throw e;
    }
  }

  async _write(data) {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }

  async getAll() {
    return this._read();
  }

  async add(systemInfo) {
    const all = await this._read();
    all.push(systemInfo);
    await this._write(all);
    return systemInfo;
  }
}
