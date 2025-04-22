export default class SystemInfo {
    constructor({
      brand,
      graphicsCard,
      ram,
      cpu,
      network,
      bluetooth,
      os,
      battery,
      createdAt = new Date().toISOString()
    }) {
      this.brand = brand;
      this.graphicsCard = graphicsCard;
      this.ram = ram;
      this.cpu = cpu;
      this.network = network;
      this.bluetooth = bluetooth;
      this.os = os;
      this.battery = battery;
      this.createdAt = createdAt;
    }
  }
  