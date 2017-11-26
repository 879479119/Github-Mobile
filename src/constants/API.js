export default {
  repo: {
    get: '/api/repos/get',
    getForUser: '/api/repos/getForUser',
    getContent: '/api/repos/getContent',
    getLanguages: '/api/repos/getLanguages',
    getStatsParticipation: '/api/repos/getStatsParticipation',
    getReadme: '/api/modified/repos/readme',
    getBranches: '/api/repos/getBranches',
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
