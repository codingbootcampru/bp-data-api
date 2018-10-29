import {
  coursesPlugin,
  coursePostPlugin,
  coursePlugin,
  coursePatchPlugin,
  courseDeletePlugin
} from './plugins/api/courses-api';

const getPlugins = config => [
  {
    plugin: coursesPlugin,
    options: { apiConfig: config.services.courses }
  },
  {
    plugin: coursePostPlugin,
    options: { apiConfig: config.services.coursePost }
  },
  {
    plugin: coursePlugin,
    options: { apiConfig: config.services.course }
  },
  {
    plugin: coursePatchPlugin,
    options: { apiConfig: config.services.coursePatch }
  },
  {
    plugin: courseDeletePlugin,
    options: { apiConfig: config.services.courseDelete }
  }
];

export default getPlugins;
