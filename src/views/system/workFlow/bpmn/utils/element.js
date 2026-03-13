export function getElement(modeler, elementId) {

    if (!modeler || !elementId) return null;

    const elementRegistry = modeler.get("elementRegistry");

    return elementRegistry.get(elementId);
}

export function getCustomExtension(element) {

    const bo = element.businessObject;

    const extensionElements = bo.extensionElements;

    if (!extensionElements) return null;

    return extensionElements.values.find(
        e => e.$type === "custom:UserTaskExtension"
    );
}

export function updateExtension(modeler, element, properties) {

    const moddle = modeler.get("moddle");
    const modeling = modeler.get("modeling");

    const bo = element.businessObject;

    let extensionElements = bo.extensionElements;

    if (!extensionElements) {

        extensionElements = moddle.create(
            "bpmn:ExtensionElements",
            { values: [] }
        );

    }

    let custom = extensionElements.values.find(
        e => e.$type === "custom:UserTaskExtension"
    );

    if (!custom) {

        custom = moddle.create("custom:UserTaskExtension");

        extensionElements.values.push(custom);

    }

    Object.keys(properties).forEach(key => {
        custom[key] = properties[key];
    });

    modeling.updateProperties(element, {
        extensionElements
    });

}
