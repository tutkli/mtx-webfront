import { breakpointsTailwind, observeBreakpoints } from 'ngx-breakpoint-observer';

export const breakpointObserver = observeBreakpoints(breakpointsTailwind);

export const xsBreakpoint = breakpointObserver.smallerOrEqual('sm');
