// @flow
let supportsOptions = false;
try {
    const opts = Object.defineProperty(
        {},
        'passive',
        ({
            get() {
                supportsOptions = true;
            },
        }: Object)
    );
    window.addEventListener('test', null, opts);
} catch (e) {
    /* noop */
}

function addEventListener(
    node: Node,
    eventName: string,
    eventHandler: Function,
    options: Object = {}
) {
    if (supportsOptions) {
        node.addEventListener(eventName, eventHandler, options);
    } else if (options.once) {
        node.addEventListener(
            eventName,
            function boundEventHandler(evt) {
                eventHandler.call(this, evt);
                node.removeEventListener(eventName, boundEventHandler);
            },
            options.capture
        );
    } else {
        node.addEventListener(eventName, eventHandler, options.capture);
    }
}

export default addEventListener;
