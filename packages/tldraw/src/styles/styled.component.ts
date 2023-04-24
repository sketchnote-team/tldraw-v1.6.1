import { styled } from '@stitches/react'

export const StyledToolsPanelContainer = styled('div', {
  margin: 'auto',
  width: '100%',
  minWidth: 0,
  maxWidth: '100%',
  display: 'grid',
  gridTemplateColumns: 'auto auto auto',
  gridTemplateRows: 'auto auto',
  justifyContent: 'space-between',
  padding: '0',
  gap: '$4',
  zIndex: 200,
  pointerEvents: 'none',
  '& > div > *': {
    pointerEvents: 'all',
  },
})

export const StyledCenterWrap = styled('div', {
  position: 'absolute',
  width: 'fit-content',
  bottom: 0,
  left: '50%',
  gap: '$4',
})

export const StyledStatusWrap = styled('div', {
  gridRow: 2,
  gridColumn: '1 / span 3',
})

export const StyledPrimaryTools = styled('div', {
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',
  paddingLeft: '18px',
})

export const Panel = styled('div', {
  backgroundColor: '$panel',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '$panel',
  padding: '$2',
  border: '1px solid $panelContrast',
  gap: 0,
  variants: {
    side: {
      center: {
        borderRadius: '4px',
      },
      left: {
        padding: 0,
        borderTop: 0,
        borderLeft: 0,
        borderTopRightRadius: '$1',
        borderBottomRightRadius: '$3',
        borderBottomLeftRadius: '$1',
      },
      right: {
        padding: 0,
        borderTop: 0,
        borderRight: 0,
        borderTopLeftRadius: '$1',
        borderBottomLeftRadius: '$3',
        borderBottomRightRadius: '$1',
      },
    },
  },
})
