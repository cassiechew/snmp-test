var os = require('os');
var snmp = require('snmpjs-new');
var logger = require('bunyan');
var config = require('../../config/config.json');

let log = new logger({
    name: 'snmpd',
    level: 'info',
});

// Figure out how to make this work. Do I need to make a request dispatcher or something etc

let agent = snmp.createAgent({
    log: log,
});
log.info(os.hostname());

agent.request({
    oid: config.device.oid[0],
    handler: (prq) => {
        var nodename = os.hostname();
        
        var val = snmp.data.createData({ type: 'OctetString',
        value: nodename });

        snmp.provider.readOnlyScalar(prq, val);
    }
});

agent.bind({ family: 'udp4', port: 161 });
