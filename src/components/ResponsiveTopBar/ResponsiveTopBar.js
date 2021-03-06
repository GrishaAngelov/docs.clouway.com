import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { getSidebarState, getAnchorState, getMenuState } from '../../store/selectors';
import { onSetAnchorOpen, onSetSidebarOpen } from '../../actions/layout'
import SidebarContents from '../SidebarContents';
import TableOfContents from '../TableOfContents';

class ResponsiveTopBar extends Component {
  onSetSidebarOpen = () => {
    this.props.onSetSidebarOpen(true)
  }

  onSetSidebarClose = () => {
    this.props.onSetSidebarOpen(false)
  }

  onSetAnchorOpen = () => {
    this.props.onSetAnchorOpen(true)
  }

  onSetAnchorClose = () => {
    this.props.onSetAnchorOpen(false)
  }

  render() {
    const {
      sidebarOpen,
      anchorOpen,
      root,
      menuOpen,
      language,
      nMenuItem,
      slug,
    } = this.props

    return (
      <div
        style={{
          height: 20,
        }}
      >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: 40,
          background: 'aliceblue',
          marginTop: '55px',
        }}
      >
        {!anchorOpen &&
          <div style={{
            position: "absolute",
            left: 8,
            top: 4
          }}>
            {sidebarOpen ?
              <Button icon="close" onClick={this.onSetSidebarClose} /> :
              <Button icon="bars" onClick={this.onSetSidebarOpen} />
            }
          </div>}
        {!sidebarOpen &&
          <div style={{
            position: "absolute",
            right: 8,
            top: 4
          }}>
            {anchorOpen ?
              <Button icon="close" onClick={this.onSetAnchorClose} /> :
              <Button icon="ellipsis" onClick={this.onSetAnchorOpen} />
            }
          </div>
        }
      </div>
      {sidebarOpen &&
        <div style={{
          position: "fixed",
          top: menuOpen ? nMenuItem*32 + 90 : 95,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          backgroundColor: 'white',
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            transition: "left .3s ease-out, right .3s ease-out",
            overscrollBehaviorY: 'contain',
          }}>
            <SidebarContents root={root} slug={slug} language={language}/>
          </div>
        </div>
      }
      {anchorOpen &&
        <div style={{
          position: "fixed",
          top: menuOpen ? nMenuItem*32 + 90 : 95,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          overflowY: "auto",
          backgroundColor: 'white',
          WebkitOverflowScrolling: "touch",
          transition: "left .3s ease-out, right .3s ease-out",
        }}>
          <TableOfContents offsetTop={0} affix={false}/>
        </div>
      }

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sidebarOpen: getSidebarState(state).open,
    anchorOpen: getAnchorState(state).open,
    menuOpen: getMenuState(state).open,
    nMenuItem: getMenuState(state).nItem,
  }
}

const mapDispatchToProps = {
  onSetSidebarOpen,
  onSetAnchorOpen
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveTopBar)
