import { render, screen } from '@testing-library/react';
import SystemMonitor from '../../frontend/system-info-dashboard/src/components/SystemMonitor';

describe('Frontend Component Tests', () => {
  describe('SystemMonitor Component', () => {
    it('should render system information', () => {
      const mockData = {
        cpu: { usage: 50, temperature: 45 },
        memory: { total: 16000, used: 8000, free: 8000 },
        network: { bytesIn: 1000, bytesOut: 500 }
      };

      render(<SystemMonitor data={mockData} />);
      
      expect(screen.getByText(/CPU Usage/i)).toBeInTheDocument();
      expect(screen.getByText(/Memory Usage/i)).toBeInTheDocument();
      expect(screen.getByText(/Network Traffic/i)).toBeInTheDocument();
    });

    it('should handle loading state', () => {
      render(<SystemMonitor data={null} />);
      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    it('should handle error state', () => {
      render(<SystemMonitor data={null} error="Failed to load data" />);
      expect(screen.getByText(/Failed to load data/i)).toBeInTheDocument();
    });
  });
}); 