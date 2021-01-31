const INITIAL_STATE = {
    navTabs : [
        {
            name: "Upcoming Events",
            id: 0,
            url: "/upcoming-events",
        },
        {
            name: "Create Event",
            id: 1,
            url: "/create-event",
        },
        {
            name: "Notice Board",
            id: 2,
            url: "/notice-board",
        },
        {
            name: "Donate",
            id: 3,
            url: "/donate"
        },
        {
            name: "Sign In",
            id: 4,
            url: "/sign-up"
        },
        {
            name: "Sign Out",
            id: 5,
            url: "/sign-up"
        },

    ]
};

const navReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


export default navReducer;