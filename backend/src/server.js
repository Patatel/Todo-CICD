import express from 'express';
import FileSystemInfoRepository from './infrastructure/persistence/FileSystemInfoRepository.js';
import makeGetSystemInfo from './application/use_cases/GetSystemInfo.js';
import makeAddSystemInfo from './application/use_cases/AddSystemInfo.js';
import makeController from './interfaces/controllers/SystemInfoController.js';

const app = express();
app.use(express.json());      // body‑parser

// Wiring
const repository = new FileSystemInfoRepository();
const useCases = {
  getAll: makeGetSystemInfo({ repository }),
  add:    makeAddSystemInfo({ repository })
};
const controller = makeController(useCases);

// Routes
app.get('/system-info', controller.get);
app.post('/system-info', controller.post);

// 404 + Error handler (good practice)
app.use((req, res) => res.status(404).json({ message: 'Not Found' }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(400).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API prête sur http://localhost:${PORT}`));
