'use strict';

var Events = {
  'INIT': 'init',
  'SHOWN': 'shown',
  'PAGE_SHOWN': 'page_shown',
  'SHOW_PAGE': 'show_page',
  'HIDDEN': 'hidden',
  'HIDE_PAGE': 'hide_page',
  'PAGE_HIDDEN': 'page_hidden',
  'PRE_HIDDEN': 'prehidden',
  'POST_HIDDEN': 'posthidden',
  'COMPLETE': 'complete',
  'DISPOSE': 'dispose',
  'NAVIGATE': 'navigate',
  'PAUSE': 'pause',
  'UNPAUSE': 'unpause',
  'PAGE_RENDERED' : 'rendered',
  'UI_RENDERED'   : 'rendered',

  // Loader
  'LOADER_SHOWN':'loader_shown',
  'LOADER_HIDDEN':'loader_hidden',
  'LOADER_COMPLETE':'loader_complete',
  'LOADER_COMPLETE_RESULT':'loader_complete_result',
  'LOADER_INIT':'loader_init',
  
  // DOM
  'ON_ORIENTATION_CHANGE': 'on_orientation_change',
  'ON_RESIZE': 'on_resize',
  'ON_MOUSE_OUT': 'on_mouse_out',
  'ON_MOUSE_MOVE': 'on_mouse_move',
  'ON_MOUSE_DOWN': 'on_mouse_down',
  'ON_MOUSE_LEAVE': 'on_mouse_leave',
  'ON_MOUSE_ENTER': 'on_mouse_enter',
  'ON_MOUSE_UP': 'on_mouse_up',
  'ON_TOUCH_START': 'on_touch_start',
  'ON_TOUCH_MOVE': 'on_touch_move',
  'ON_TOUCH_END': 'on_touch_end',
  'ON_RAF': 'on_raf',
  'ON_SCROLL': 'on_scroll',
  'ON_KEYDOWN': 'on_keydown',
  'ON_CLICK': 'on_click',
  'RELAYOUT': 'relayout',

  // CAROUSEL

  'CAROUSEL_ITEM_CLICKED' : 'carousel_item_clicked',
  'CAROUSEL_INDICATOR_CLICKED' : 'carousel_indicator_clicked',
  'CAROUSEL_ARROW_CLICKED' : 'carousel_arrow_clicked',
  'CAROUSEL_TIMER_CLICKED' : 'carousel_timer_clicked',
  'CAROUSEL_TIMER_ENDED' : 'carousel_timer_ended'

}

module.exports = Events;