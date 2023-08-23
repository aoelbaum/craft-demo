import axios from 'axios';
// Note: The posts array below was created for visual purposes
// and normally would have been integrated into the database, mapped to their respective comments and receive via request.
// For the purpose of this demo, the comments that are fetched are always mapped to the first post.
export default {
  state() {
    return {
      posts: [
        {
          id: 1,
          title: 'Mondays Am I Right?',
          author: 'theCatLady',
          created: '8h',
          avatar: { img: 'avatar.jpg', alt: 'avatar of theCatLady' },
          media: { img: 'mondays.jpg', alt: 'cat in hammock' },
          description:
            'Anyone ready for the weekend? I know Whiskey is! This is my adorable cat Whiskey, who loves to lounge in his hammock.',
          commentsEnabled: true,
        },
        {
          id: 2,
          title: 'My Dogs',
          author: 'dogsAreGreat',
          created: '1d',
          media: { img: 'dogs.jpg', alt: 'two dogs sleeping on bed' },
          avatar: { img: 'avatar-2.jpeg', alt: 'avatar of dogsAreGreat' },
          description: `Check out my dogs! Aren't they aDOGable!?`,
          commentsEnabled: false,
        },
        {
          id: 3,
          title: 'The Newest Addition',
          author: 'theCatLady',
          created: '5d',
          avatar: { img: 'avatar.jpg', alt: 'avatar of theCatLady' },
          media: { img: 'new-addition.jpeg', alt: 'grey kitten' },
          description:
            'Ginny is the newest addition to our cat family! She is only 12 weeks old!',
          commentsEnabled: false,
        },
      ],
      comments: [],
      notifications: [],
      showBadge: false,
    };
  },
  getters: {
    getPost: (state) => (id) => {
      return state.posts.filter((post) => post.id === parseInt(id), 10)[0];
    },
    getSortedNotifications(state) {
      const notifications = [...state.notifications];
      return notifications.sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );
    },
  },
  mutations: {
    setComments(state, comments) {
      state.comments = comments;
    },
    addComment(state, comment) {
      state.comments = [...state.comments, comment];
    },
    addNotification(state, comment) {
      state.notifications = [
        ...state.notifications,
        {
          message: `${comment.name} commented on a post`,
          created: comment.created,
        },
      ];
    },
    setNotifications(state, comments) {
      state.notifications = comments.map((comment) => ({
        message: `${comment.name} commented on a post`,
        created: comment.created,
      }));
    },
    setNotificationStatus(state, status) {
      state.showBadge = status;
    },
  },
  actions: {
    fetchComments({ commit }) {
      axios
        .get('http://localhost:3001/getComments')
        .then((response) => {
          if (response.data) {
            commit('setComments', response.data);
            commit('setNotifications', response.data);
          }
        })
        .catch((error) => console.log(error));
    },
    postComment({ dispatch }, { name, message }) {
      axios
        .post('http://localhost:3001/createComment', { name, message })
        .then((response) => {
          if (response.data.id) {
            dispatch('fetchComment', response.data.id);
          }
        })
        .catch((error) => console.log(error));
    },
    fetchComment({ commit }, commentId) {
      axios
        .get(`http://localhost:3001/getComment?id=${commentId}`)
        .then((response) => {
          if (response.data) {
            commit('addComment', response.data);
            commit('addNotification', response.data);
            commit('setNotificationStatus', true);
          }
        })
        .catch((error) => console.log(error));
    },
  },
  modules: {},
};
