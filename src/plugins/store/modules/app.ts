interface Notification {
  message: string;
  onClick: () => void;
}

interface State {
  notifications: Notification[];
  isAlive: boolean;
}

const state: State = {
  notifications: [],
  isAlive: true,
};

export default {
  state,
  namespaced: true,
  mutations: {
    notify: (state: State, notification: Notification) => {
      state.notifications.push(notification);
    },
    resurrectConnection: (state: State) => {
      state.isAlive = true;
    },
    killConnection: (state: State) => {
      state.isAlive = false;
    },
  },
};
