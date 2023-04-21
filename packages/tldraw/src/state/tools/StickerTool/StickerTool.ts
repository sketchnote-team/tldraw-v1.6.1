import Vec from '@tldraw/vec'
import type { TLPointerEventHandler } from '@tldraw/core'
import { Utils } from '@tldraw/core'
import { Sticker } from '~state/shapes'
import { SessionType, TDShapeType } from '~types'
import { BaseTool, Status } from '../BaseTool'

export class StickerTool extends BaseTool {
  type = TDShapeType.Sticker as const

  shapeId?: string

  /* ----------------- Event Handlers ----------------- */

  onPointerDown: TLPointerEventHandler = () => {
    if (this.status === Status.Creating) {
      this.setStatus(Status.Idle)

      if (!this.app.appState.isToolLocked) {
        this.app.selectTool('select')
      }

      return
    }

    if (this.status === Status.Idle) {
      const {
        currentPoint,
        currentGrid,
        settings: { showGrid },
        appState: { currentPageId, currentStickyStyle },
      } = this.app

      const childIndex = this.getNextChildIndex()

      const id = Utils.uniqueId()

      this.shapeId = id

      const newShape = Sticker.create({
        id,
        parentId: currentPageId,
        childIndex,
        point: showGrid ? Vec.snap(currentPoint, currentGrid) : currentPoint,
        style: { ...currentStickyStyle },
        svg: this.app.appState.selectedSticker
      })

      console.log(this.app.appState)
      const bounds = Sticker.getBounds(newShape)

      newShape.point = Vec.sub(newShape.point, [bounds.width / 2, bounds.height / 2])

      this.app.createShapes(newShape)

      this.app.startSession(SessionType.Translate)

      this.setStatus(Status.Creating)
    }
  }

  onPointerUp: TLPointerEventHandler = () => {
    if (this.status === Status.Creating) {
      this.setStatus(Status.Idle)
      this.app.completeSession()
      this.app.selectTool('select')
    }
  }
}