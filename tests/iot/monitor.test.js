const { getSystemInfo } = require('../../pc-monitor-iot/iot-Simulator');

describe('IoT Monitoring Tests', () => {
  describe('System Info Collection', () => {
    it('should collect CPU information', async () => {
      const info = await getSystemInfo();
      expect(info).toHaveProperty('cpu');
      expect(info.cpu).toHaveProperty('usage');
      expect(info.cpu).toHaveProperty('temperature');
    });

    it('should collect memory information', async () => {
      const info = await getSystemInfo();
      expect(info).toHaveProperty('memory');
      expect(info.memory).toHaveProperty('total');
      expect(info.memory).toHaveProperty('used');
      expect(info.memory).toHaveProperty('free');
    });

    it('should collect network information', async () => {
      const info = await getSystemInfo();
      expect(info).toHaveProperty('network');
      expect(info.network).toHaveProperty('bytesIn');
      expect(info.network).toHaveProperty('bytesOut');
    });
  });
}); 