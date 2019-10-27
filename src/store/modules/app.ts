interface Notification {
  message: string;
  onClick: () => void;
}

interface State {
  notifications: Notification[];
}

const state: State = {
  notifications: [],
};

export default {
  state,
  namespaced: true,
  mutations: {
    notify: (state: State, notification: Notification) => {
      state.notifications.push(notification);
    },
  },
};
