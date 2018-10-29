import mongoose from 'mongoose';
import { HTTP_ERROR_400, createError } from '../../constants/errors';
import { serverConsoleError } from '../../utils/server-console-error';

mongoose.set('useCreateIndex', true);
const courseSchema = mongoose.Schema({ name: String, code: String, comment: String });
courseSchema.set('timestamps', true);
const Course = mongoose.model('Course', courseSchema);

// courses index
const registerCourses = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = async () => {
    try {
      const res = await Course.find();
      return res;
    } catch (e) {
      serverConsoleError('coursesPlugin', e);
      return HTTP_ERROR_400;
    }
  };

  server.route({ method, path, handler });
};
export const coursesPlugin = { name: 'coursesPlugin', register: registerCourses };

// create course
const registerCoursePost = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = async (request, h) => {
    try {
      const course = new Course(request.payload);
      const res = await course.save();
      return h.response(res).code(201);
    } catch (e) {
      serverConsoleError('coursePostPlugin', e);
      return HTTP_ERROR_400;
    }
  };

  server.route({ method, path, handler });
};
export const coursePostPlugin = { name: 'coursePostPlugin', register: registerCoursePost };

// read course
const registerCourse = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = async (request, h) => {
    const { params: { courseId } = {} } = request;
    try {
      const courses = await Course.find({ _id: courseId });
      if (courses.length === 1) {
        return h.response(courses[0]).code(200);
      }
      return h.response(createError('Document not found')).code(400);
    } catch (e) {
      serverConsoleError('coursePlugin', e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};
export const coursePlugin = { name: 'coursePlugin', register: registerCourse };

// update course
const registerCoursePatch = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = async (request, h) => {
    const { params: { courseId } = {}, payload } = request;
    try {
      const courses = await Course.find({ _id: courseId });
      if (courses.length === 1) {
        await courses[0].updateOne({ ...payload, $inc: { __v: 1 } });
        const res = await Course.find({ _id: courseId });
        return h.response(res[0]).code(200);
      }
      return h.response(createError('Document not found')).code(400);
    } catch (e) {
      serverConsoleError('coursePatchPlugin', e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};
export const coursePatchPlugin = { name: 'coursePatchPlugin', register: registerCoursePatch };

// delete course
const registerCourseDelete = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = async (request, h) => {
    const { params: { courseId } = {} } = request;
    try {
      const courses = await Course.find({ _id: courseId });
      if (courses.length > 0) {
        await Course.find({ _id: courseId }).deleteOne();
        return h.response().code(204);
      }
      return h.response(createError('Document not found')).code(400);
    } catch (e) {
      serverConsoleError('courseDeletePlugin', e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};

export const courseDeletePlugin = { name: 'courseDeletePlugin', register: registerCourseDelete };
