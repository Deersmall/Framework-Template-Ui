
function randomStr() {
  return Math.random().toString(36).slice(-8)
}

export default function() {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <definitions
      xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
      xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
      xmlns:bioc="http://bpmn.io/schema/bpmn/biocolor/1.0"
      xmlns:xsd="http://www.w3.org/2001/XMLSchema"
      xmlns:flowable="http://flowable.org/bpmn"
      targetNamespace="http://www.flowable.org/processdef"
      >
      <process id="deerFlow_${randomStr()}" name="deerFlow_${randomStr()}">
        <startEvent id="start_event" name="开始" />
      </process>
      <bpmndi:BPMNDiagram id="BPMNDiagram_flow">
        <bpmndi:BPMNPlane id="BPMNPlane_flow" bpmnElement="T-2d89e7a3-ba79-4abd-9f64-ea59621c258c">
          <bpmndi:BPMNShape id="BPMNShape_start_event" bpmnElement="start_event" bioc:stroke="">
            <omgdc:Bounds x="220" y="280" width="40" height="40" />
            <bpmndi:BPMNLabel>
              <omgdc:Bounds x="226" y="325" width="23" height="14" />
            </bpmndi:BPMNLabel>
          </bpmndi:BPMNShape>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </definitions>`
}
