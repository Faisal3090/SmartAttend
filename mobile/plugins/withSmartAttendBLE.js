const { withInfoPlist, withDangerousMod, withXcodeProject } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const sourceFiles = ['SmartAttendBLE.swift', 'SmartAttendBLE.m'];

function withSmartAttendBLE(config) {
  config = withInfoPlist(config, (mod) => {
    mod.modResults.NSBluetoothAlwaysUsageDescription =
      mod.modResults.NSBluetoothAlwaysUsageDescription ||
      'SmartAttend uses Bluetooth to discover and broadcast attendance sessions.';
    return mod;
  });

  config = withDangerousMod(config, ['ios', async (mod) => {
    const iosRoot = mod.modRequest.platformProjectRoot;
    const targetDir = path.join(iosRoot, 'SmartAttendBLE');
    fs.mkdirSync(targetDir, { recursive: true });
    for (const file of sourceFiles) {
      fs.copyFileSync(
        path.join(mod.modRequest.projectRoot, 'native', 'ios', 'SmartAttendBLE', file),
        path.join(targetDir, file)
      );
    }
    return mod;
  }]);

  return withXcodeProject(config, (mod) => {
    const project = mod.modResults;
    const target = project.getFirstTarget().uuid;
    for (const file of sourceFiles) {
      const relative = `SmartAttendBLE/${file}`;
      if (!project.hasFile(relative)) {
        project.addSourceFile(relative, { target });
      }
    }
    return mod;
  });
}

module.exports = withSmartAttendBLE;
