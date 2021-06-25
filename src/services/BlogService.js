import API from "../api/API";
import endPoints from "../api/endPoints.json";

class BlogService {
  static createBlog(blog) {
    return API.post(endPoints.api.blog.create, blog);
  }
  static updateBlog(blog, id) {
    return API.put(endPoints.api.blog.update + id, blog);
  }
  static deleteBlog(id) {
    return API.delete(endPoints.api.blog.delete + id);
  }
  static getBlog(id) {
    return API.get(endPoints.api.blog.getSingle + id);
  }
  static getAllBlogs() {
    return API.get(endPoints.api.blog.getAll);
  }
  static getBlogByUser(id) {
    return API.get(endPoints.api.blog.getBlogByUser + id);
  }
}

export default BlogService;
