import BpmnModeler from "bpmn-js/lib/Modeler";
import customModdle from "./moddle/custom.json";
import CreateElementModule from "./plugins/create-element";
import { CreateAppendAnythingModule } from 'bpmn-js-create-append-anything';
import customTranslate from "@/i18n/bpmnJs/customTranslate";



let modeler = null;

export function createModeler(container) {

    modeler = new BpmnModeler({
        container,
        additionalModules: [
            CreateElementModule,                        // 左侧工具栏按钮自定义
            CreateAppendAnythingModule,                 // 左侧工具栏更多按钮
            { translate: ["value",customTranslate] }    // 汉化包
        ],
        createAppendAnything: {
            palette: true,
            contextPad: true
        },
        moddleExtensions: {
            custom: customModdle        // 理论上是节点的拓展，但实测后似乎可以无视
        },
    });

    return modeler;
}

export function getModeler() {
    return modeler;
}

export async function importXML(xml) {

    await modeler.importXML(xml);

    const canvas = modeler.get("canvas");

    canvas.zoom("fit-viewport");

}

export async function saveXML() {

    const { xml } = await modeler.saveXML({
        format: true
    });

    return xml;
}
