export default {
  repo: {
    getForUser: '/api/repos/getForUser',
  },
  user: {
    getForUser: '/api/users/getForUser',
    getFollowingForUser: '/api/users/getFollowingForUser',
    getFollowersForUser: '/api/users/getFollowersForUser',
  },
  org: {
    getForUser: '/api/orgs/getForUser',
  },
  activity: {
    getEventsForUser: '/api/activity/getEventsForUser',
    getStarredReposForUser: '/api/activity/getStarredReposForUser',
  },
}
