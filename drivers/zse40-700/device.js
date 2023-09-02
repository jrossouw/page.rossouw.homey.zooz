'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

class Zse40 extends ZwaveDevice {

  onNodeInit({ node }) {
    // enable debugging
    this.enableDebug();

    this.log('Print the node info to the console');
    this.printNode();

    this.log('Log node');
    this.log(node);

    this.registerCapability('measure_battery', 'BATTERY', {
      get: 'BATTERY_GET',
      getOpts: {
        getOnOnline: true,
      },
      report: 'BATTERY_REPORT',
      reportParser: (report) => {
        this.log('Battery report');
        this.log(report);
      },
    });

    this.registerCapability('alarm_motion');
    this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL', {
      get: 'SENSOR_MULTILEVEL_GET',
      getOpts: {
        getOnOnline: true,
      },
    });

    this.registerCapability('measure_humidity', 'SENSOR_MULTILEVEL', {
      get: 'SENSOR_MULTILEVEL_GET',
      getOpts: {
        getOnOnline: true,
      },
    });

    this.registerCapability('measure_luminance', 'SENSOR_MULTILEVEL', {
      get: 'SENSOR_MULTILEVEL_GET',
      getOpts: {
        getOnOnline: true,
      },
    });

    this.registerReportListener('NOTIFICATION', 'NOTIFICATION_REPORT', (report) => {
      if (report) {
        switch (report['Notification Type']) {
          case 'Home Security':
            this.setCapabilityValue('alarm_motion', report['Event'] !== 0);
            break;
          default:
            this.log('Unhandled report:');
            this.log(report);
        }
      }
    });
  }

}

module.exports = Zse40;
