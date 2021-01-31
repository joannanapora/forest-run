import { NavigationTwoTone } from '@material-ui/icons';
import { createSelector } from 'reselect';
import { DEFAULT_MAX_VERSION } from 'tls';

const selectNav = state => state.nav;

export const selectNavTabs = createSelector(
    [selectNav],
    nav => nav.navTabs
)