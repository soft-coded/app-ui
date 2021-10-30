/**
 * The only way I could get this working was to copy over a few
 * files from the source code repository itself, otherwise *everything*
 * was giving errors. These files are in the "helpers" folder.
 */
import createEngine, {
  DiagramModel,
  DefaultNodeModel
} from "@projectstorm/react-diagrams";
import { DemoButton, DemoWorkspaceWidget } from "./helpers/DemoWorkspaceWidget";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { DemoCanvasWidget } from "./helpers/DemoCanvasWidget";

interface DragToggleProps {
  engine: any; // technically of type DiagramEngine, but was throwing errors
}

function CanvasDragToggle({ engine }: DragToggleProps) {
  function enableDrag() {
    const state = engine.getStateMachine().getCurrentState();
    state.dragCanvas.config.allowDrag = true;
  }

  function disableDrag() {
    const state = engine.getStateMachine().getCurrentState();
    state.dragCanvas.config.allowDrag = false;
  }

  return (
    <DemoWorkspaceWidget
      buttons={[
        <DemoButton key={1} onClick={enableDrag}>
          Enable canvas drag
        </DemoButton>,
        <DemoButton key={2} onClick={disableDrag}>
          Disable canvas drag
        </DemoButton>
      ]}
    >
      <DemoCanvasWidget>
        <CanvasWidget engine={engine} />
      </DemoCanvasWidget>
    </DemoWorkspaceWidget>
  );
}

export default function BasicConnection() {
  const engine = createEngine();
  const model = new DiagramModel();

  const node1 = new DefaultNodeModel("Source", "rgb(0,192,255)");
  const port1 = node1.addOutPort("Out");
  node1.setPosition(100, 100);

  const node2 = new DefaultNodeModel("Destination", "rgb(192,255,0)");
  const port2 = node2.addInPort("In");
  node2.setPosition(400, 100);

  const link1 = port1.link(port2);
  model.addAll(node1, node2, link1);
  engine.setModel(model);

  return <CanvasDragToggle engine={engine} />;
}
