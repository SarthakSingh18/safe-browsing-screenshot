const amqp = require('amqplib/callback_api');
const clickScreenShot = require("./screenshot");
function pullFromQueue() {
    try {
        amqp.connect('amqp://localhost', function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
                var exchange = 'logs';
                channel.assertExchange(exchange, 'fanout', {
                    durable: false
                });
                var queue = 'rpc_queue3';
                channel.assertQueue(queue, {
                    durable: false
                });
                channel.bindQueue(queue, exchange, '');
                channel.prefetch(1);
                channel.consume(queue, async function reply(msg) {
                    try{
                        var r = await clickScreenShot.clickScreenshot(msg.content.toString())
                        channel.sendToQueue(msg.properties.replyTo, Buffer.from(r.toString()), {
                            headers:{"msgFrom":"click-screenShot"},
                            correlationId: msg.properties.correlationId
                        });
                    }
                    catch (e){
                        console.log(e);
                        channel.sendToQueue(msg.properties.replyTo, Buffer.from(e.toString()), {
                            headers:{"msgFrom":"click-screenShot"},
                            correlationId: msg.properties.correlationId
                        });
                    }

                    channel.ack(msg);
                });
            });
        });
    }
    catch(e){
        console.log(e);

    }
}

pullFromQueue();