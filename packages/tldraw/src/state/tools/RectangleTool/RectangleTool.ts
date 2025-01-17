import { TLBoundsCorner, TLPointerEventHandler, Utils } from '@tldraw/core'
import Vec from '@tldraw/vec'
import { Rectangle } from '~state/shapes'
import { BaseTool, Status } from '~state/tools/BaseTool'
import { SessionType, TDShapeType } from '~types'

export class RectangleTool extends BaseTool {
  type = TDShapeType.Rectangle as const

  /* ----------------- Event Handlers ----------------- */

  onPointerDown: TLPointerEventHandler = () => {
    if (this.app.readOnly) return
    if (this.status !== Status.Idle) return

    const {
      currentPoint,
      currentGrid,
      settings: { showGrid },
      appState: { currentPageId, currentShapeStyle },
    } = this.app

    const childIndex = this.getNextChildIndex()

    const id = Utils.uniqueId()

    const newShape = Rectangle.create({
      id,
      parentId: currentPageId,
      childIndex,
      point: showGrid ? Vec.snap(currentPoint, currentGrid) : currentPoint,
      style: { ...currentShapeStyle },
    })

    this.app.patchCreate([newShape])

    this.app.startSession(
      SessionType.TransformSingle,
      newShape.id,
      TLBoundsCorner.BottomRight,
      true
    )

    this.setStatus(Status.Creating)
  }
}
