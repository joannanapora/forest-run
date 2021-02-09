import { createSelector } from 'reselect';

const selectNav = state => state.nav;

export const selectNavTabs = createSelector(
    [selectNav],
    nav => nav.navTabs
)